# Service Order Tracking API

A backend service built with **Node.js, TypeScript, Express, and Prisma** for tracking customer service orders.  
The project provides APIs to manage and identify service requests, ensuring that duplicate or related orders can be linked to the same customer.

---

## 🚀 Features
- Track service orders with unique identifiers.
- Identify and merge duplicate or related customer records.
- RESTful API built using **Express.js**.
- Database management with **Prisma ORM**.
- Containerized using **Docker** and **docker-compose**.
- Environment-based configuration with `.env` file.

---

## 📂 Project Structure
├── docker-compose.yml # Docker setup
├── Dockerfile # Container build file
├── package.json # Node.js dependencies & scripts
├── tsconfig.json # TypeScript config
├── prisma/
│ └── schema.prisma # Database schema (Prisma ORM)
└── src/
├── index.ts # Main server entry point
├── routes/
│ └── identify.ts # API route for service order identification
└── utils/
└── identifyLogic.ts # Core business logic

yaml
Copy code

---

## 🛠️ Tech Stack
- **Node.js** + **Express**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL** (or any supported DB)
- **Docker & Docker Compose**

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/service-order-tracking.git
cd service-order-tracking
2. Install dependencies
bash
Copy code
npm install
3. Setup environment
Create a .env file in the root directory:

env
Copy code
DATABASE_URL="postgresql://user:password@localhost:5432/ordersdb"
PORT=3000
4. Run database migrations
bash
Copy code
npx prisma migrate dev
5. Start the development server
bash
Copy code
npm run dev
🐳 Run with Docker
bash
Copy code
docker-compose up --build
📡 API Endpoints
POST /identify
Identify and track a customer service order.

Input: Order/customer details

Output: Linked/merged identity with order tracking info

Example:

json
Copy code
{
  "customer": {
    "email": "john@example.com",
    "phone": "1234567890"
  },
  "order": {
    "service": "Internet Setup",
    "status": "Pending"
  }
}
Response:

json
Copy code
{
  "customerId": "cust_12345",
  "orderId": "order_98765",
  "status": "Tracked"
}
📌 Scripts
npm run dev → Start development server with nodemon

npm run build → Build TypeScript project

npm start → Run production build

📖 License
MIT License © 2025
