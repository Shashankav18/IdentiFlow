import express from 'express';
import { identifyContact } from '../utils/identifyLogic';

const router = express.Router();

router.post('/identify', async (req, res) => {
  const { email, phoneNumber } = req.body;

  if (!email && !phoneNumber) {
    return res.status(400).json({ error: 'email or phoneNumber is required' });
  }

  const contact = await identifyContact(email, phoneNumber);
  return res.status(200).json({ contact });
});

export default router;
