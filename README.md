# Event Forge 🛠️

**Event Forge** is a comprehensive, full-stack event and hackathon management platform built for modern competitive events. Whether you are hosting a 24-hour hackathon or a multi-day technical symposium, Event Forge provides the tools to manage participants, teams, judging, and scoring with ease.

---

## 🌟 Key Features

### 👥 Multimodal User Roles
- **Participants**: Register for events, form/join teams, and track their progress.
- **Team Leaders**: Manage team members, invitations, and project submissions.
- **Judges**: Access a dedicated scoring interface to evaluate projects based on specific criteria.
- **Administrators**: Complete system control including user management, event creation, team oversight, and financial tracking.

### 📊 Real-time Dashboard & Analytics
- Visual data representation using **Recharts**.
- Live tracking of registrations, team formations, and scoring status.

### 💳 Integrated Payments
- Secure registration fee processing via **Razorpay** integration.
- Automated payment verification and receipt generation.

### 📬 Smart Notifications
- Email notifications powered by **Nodemailer** for registration confirmations, team invites, and announcements.
- In-app notification system for real-time updates.

### 📄 Professional Reporting
- Export team lists, scoring summaries, and event results to PDF using **jsPDF** and **jsPDF-autotable**.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **PDF Generation**: [jsPDF](https://rawgit.com/MrRio/jsPDF/master/docs/index.html)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (ODM: [Mongoose](https://mongoosejs.com/))
- **Auth**: [JWT](https://jwt.io/) & [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
- **Email**: [Nodemailer](https://nodemailer.com/)
- **Payment Gateway**: [Razorpay SDK](https://razorpay.com/docs/payments/server-side-sdk/nodejs/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance
- Razorpay API Keys (for payments)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd event-forge-24-hour-hackathon
   ```

2. **Server Setup**:
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory and add the following:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:5173
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

3. **Client Setup**:
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the Backend**:
   ```bash
   cd server
   npm run dev
   ```

2. **Start the Frontend**:
   ```bash
   cd client
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

---

## 📂 Project Structure

```text
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Role-based pages (admin, judge, user, etc.)
│   │   ├── services/      # API communication logic
│   │   └── utils/         # Helper functions
├── server/                # Node.js Backend
│   ├── config/            # Database and external configs
│   ├── controllers/       # Business logic for routes
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   └── middleware/        # Auth and validation middleware
```

---

## 📝 License
Distributed under the **ISC License**. See `package.json` for more information.

---
Built with ❤️ for the Developer Community.
