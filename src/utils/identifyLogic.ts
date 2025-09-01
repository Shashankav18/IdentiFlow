import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const identifyContact = async (email?: string, phoneNumber?: string) => {
  const contacts = await prisma.contact.findMany({
    where: {
      OR: [
        { email: email ?? undefined },
        { phoneNumber: phoneNumber ?? undefined }
      ]
    }
  });

  if (contacts.length === 0) {
    const newContact = await prisma.contact.create({
      data: {
        email,
        phoneNumber,
        linkPrecedence: 'primary',
      },
    });

    return {
      primaryContactId: newContact.id,
      emails: [newContact.email].filter(Boolean),
      phoneNumbers: [newContact.phoneNumber].filter(Boolean),
      secondaryContactIds: [],
    };
  }

  let primary = contacts.find(c => c.linkPrecedence === 'primary') || contacts[0];
  for (const c of contacts) {
    if (c.createdAt < primary.createdAt) primary = c;
  }

  const allLinkedContacts = await prisma.contact.findMany({
    where: {
      OR: [
        { id: primary.id },
        { linkedId: primary.id },
        { linkedId: { in: contacts.map(c => c.id) } }
      ]
    }
  });

  const allEmails = new Set<string>();
  const allPhones = new Set<string>();
  const secondaryIds: number[] = [];

  for (const c of allLinkedContacts) {
    if (c.email) allEmails.add(c.email);
    if (c.phoneNumber) allPhones.add(c.phoneNumber);
    if (c.id !== primary.id) secondaryIds.push(c.id);
  }

  const alreadyExists = allLinkedContacts.some(c =>
    c.email === email && c.phoneNumber === phoneNumber
  );

  if (!alreadyExists) {
    const newSecondary = await prisma.contact.create({
      data: {
        email,
        phoneNumber,
        linkPrecedence: 'secondary',
        linkedId: primary.id
      }
    });
    secondaryIds.push(newSecondary.id);
    if (email) allEmails.add(email);
    if (phoneNumber) allPhones.add(phoneNumber);
  }

  return {
    primaryContactId: primary.id,
    emails: [primary.email, ...[...allEmails].filter(e => e !== primary.email)],
    phoneNumbers: [primary.phoneNumber, ...[...allPhones].filter(p => p !== primary.phoneNumber)],
    secondaryContactIds: secondaryIds
  };
};
