
# 📘 Lead Tracking Backend - MERN Stack API

This is the backend of a Lead Tracking Application built using the **MERN stack** (MongoDB, Express, React, Node.js). It provides a role-based system for **Employers** and **Managers** to manage leads effectively.

---

## 🚀 Getting Started

### Installation

```bash
git clone https://github.com/Ayman-Nadim/LeadTracker-Backend.git
cd lead-tracking-api
npm install
npm run dev
```

---

## 📦 Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT)
- Swagger (API Documentation)

---

## 🔐 Authentication Endpoints

### `POST /api/auth/login`

Login for both Employers and Managers.

- **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secret"
}
```

- **Response:**
```json
{
  "token": "JWT_TOKEN_HERE"
}
```

---

### `GET /api/me`

Get the current authenticated user's profile.

- **Headers:**
  `Authorization: Bearer <token>`

- **Response:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "role": "employer"
}
```

---

## 👤 Employer Endpoints (Role: employer)

### 📊 `GET /api/employer/dashboard-stats`

Returns statistics on leads by status (IN_PROGRESS, COMPLETED, CANCELED).

---

### 👨‍💼 Managers

- `GET /api/employer/managers` – List all managers
- `POST /api/employer/managers` – Create a manager

```json
{
  "name": "Jane Manager",
  "email": "jane@example.com",
  "password": "123456"
}
```

- `PUT /api/employer/managers/:managerId` – Update manager
- `DELETE /api/employer/managers/:managerId` – Delete manager

---

### 🧾 Leads

- `GET /api/employer/leads?managerId=&status=` – Get all leads (filterable)
- `POST /api/employer/leads` – Create a new lead

```json
{
  "contactName": "Client A",
  "contactEmail": "client@example.com",
  "companyName": "Company A",
  "status": "PENDING", // Optional
  "managerId": "managerObjectId"
}
```

- `PUT /api/employer/leads/:leadId` – Update lead
- `DELETE /api/employer/leads/:leadId` – Delete lead

---

## 🧑‍💼 Manager Endpoints (Role: manager)

### `GET /api/managers/leads`

Get all leads assigned to the current manager.

---

### `PATCH /api/managers/leads/:id`

Update the lead's status or add notes.

```json
{
  "status": "IN_PROGRESS",
  "notes": ["Called the client", "Meeting scheduled"]
}
```

---

## 📚 API Docs

- Swagger Documentation available at:
  **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

---

## ✅ Best Practices

- Role-based access control (RBAC)
- Secure JWT authentication
- MVC folder structure
- Centralized error handling
- Full API documentation with Swagger

---

## 📄 License

MIT License

---

> Built with ❤️ using MERN Stack By NADIM AYMAN
