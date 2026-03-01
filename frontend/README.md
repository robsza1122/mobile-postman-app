 Courier Shipments Tracker & Billing System (MOBILE POSTMAN)

A Fullstack (MERN) application designed as a dedicated tool for couriers to manage logistics processes – from real-time status tracking to automated email notifications for customers.

🚀 Key Features
Shipment Dashboard: A comprehensive list of packages with advanced filtering by status.
Status Management System: Every status update (e.g., "In Transit", "Delivered") is logged in the database with a precise timestamp.
Automated Notifications: The system triggers an automated email to the customer whenever a package status changes (integrated via Nodemailer or SendGrid).
Billing Module: Automated cost calculation based on package weight and dimensions.
NoSQL Database: Persistent storage of the full lifecycle and history for every shipment using MongoDB.

🛠️ Tech Stack
Frontend: React (Hooks, Context API), Axios
Backend: Node.js, Express.js
Database: MongoDB Atlas & Mongoose
Other: Nodemailer (Email service), JWT (Authentication - optional)

💻 Installation & Setup
Clone the repository:
bash
git clone https://github.com
Używaj kodu z rozwagą.

Configure Environment Variables (.env):
Create a .env file in the server directory and provide:
MONGO_URI (MongoDB connection string)
EMAIL_USER / EMAIL_PASS (Credentials for the email service)
Run Backend:
bash
cd backend
npm install
npm run dev
Używaj kodu z rozwagą.

Run Frontend:
bash
cd frontend
npm install
npm run dev
Używaj kodu z rozwagą.

📊 Data Schema (Sample Package Model)
javascript
{
  senderName: string;
  senderSurname: string;
  senderPostCode: string;
  senderCity: string;
  senderAdress: string;
  senderCountry: string;
  name: string;
  surname: string;
  city: string;
  country: string;
  adress: string;
  postCode: string;
  amount: number;
  cashOnDelivery: boolean;
  clientEmail?: string;
  phone?: string;
  numberOfParcel?: string;
  deliveryCode?: string;
  isMarked?: boolean;
  isMarkedVERIFICATION?: boolean;
  amountOfTrials?: number;
  isDeliveryCode?: boolean;
  noAddressee?: boolean;
  status?: {
    name: string;
    createdAt: String;
    subject?: string;
    details?: string;
    isSignature?: boolean;
    signature?: string;
    deliveryInput?: string | null;
    noAddressee?: boolean;
    reasonOfAdvice?: string;
    officeOfAdvice?: string;
    placeOfNotification?: string;
  }[];
  isDownloaded?: boolean;
  forUser?: string;
  isBooked?: boolean;
  numberOfBook?: string;
  _id?: string;
}
