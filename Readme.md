# GoPratle - Event Requirement Collection Platform

A full-stack multi-step event requirement submission platform built as part of the GoPratle Full-Stack Developer Intern assignment.

The application allows event hosts to submit structured requirements for **Event Planners**, **Performers**, and **Crew** through a 4-step wizard.

---

## 🌟 Features

* **4-Step Requirement Wizard**:

  * Event Basics
  * Category Details
  * Logistics & Budget
  * Review & Submit

* **Dynamic Category-Based Forms**:

  * **Event Planner** — Service type, expected guest count, and planning requirements.
  * **Performer** — Performance type, duration, and performer count.
  * **Crew** — Crew type, member count, and skill requirements.

* **Custom Branded Date Picker**:

  * Lightweight in-house calendar popover matching GoPratle brand tones (`#fa5d32`) without heavy external UI dependencies.

* **Step-by-Step Validation**:

  * Required field and schema validation powered by **Zod** to prevent invalid step progression.

* **RESTful API Architecture**:

  * Modular Express routes with request body validation middleware (`validateRequest`).
  * Persistent requirement storage in MongoDB using Mongoose ODM.

* **Responsive UI**:

  * Clean card-based interface built with Tailwind CSS and Lucide React icons.
  * Optimized for both desktop and mobile viewports.

---

## 🛠️ Tech Stack

### Frontend (`/client`)

* **Framework**: Next.js (App Router, React 19)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **Validation**: Zod
* **Icons**: Lucide React

### Backend (`/server`)

* **Language**: TypeScript
* **Runtime**: Node.js with tsx
* **Framework**: Express.js
* **Database**: MongoDB (Mongoose ODM)
* **Validation**: Zod
* **Utilities**: CORS, dotenv

---

## 📁 Project Structure

```text
gopratle-requirement-platform/
├── client/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── requirement/
│   │   │   │   ├── CategorySelector.tsx
│   │   │   │   ├── RequirementForm.tsx
│   │   │   │   ├── ReviewStep.tsx
│   │   │   │   ├── StepIndicator.tsx
│   │   │   │   ├── StepOne.tsx
│   │   │   │   ├── StepTwo.tsx
│   │   │   │   └── StepThree.tsx
│   │   │   └── ui/
│   │   │       ├── DatePicker.tsx
│   │   │       └── logo.tsx
│   │   ├── lib/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── requirement.ts
│   │   └── validations/
│   │       └── requirement.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   └── tailwind.config.ts
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── middlewares/
│   │   │   └── validateRequest.ts
│   │   ├── modules/
│   │   │   └── requirement/
│   │   │       ├── requirement.controller.ts
│   │   │       ├── requirement.interface.ts
│   │   │       ├── requirement.model.ts
│   │   │       ├── requirement.route.ts
│   │   │       └── requirement.validation.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB Atlas account or a local MongoDB instance

### 1. Clone the Repository

```bash
git clone https://github.com/itzSumma/gopratle-requirement-platform.git
cd gopratle-requirement-platform
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend development server:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd client
npm install
```

Create a `.env.local` file inside the `client` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:3000
```

---

## 🔌 API Endpoints

### Create Requirement

```http
POST /api/requirements
```

Creates a new event requirement and stores it in MongoDB.

### Get All Requirements

```http
GET /api/requirements
```

Retrieves all submitted requirements.

### Request Structure

The submitted requirement contains:

```text
eventDetails
├── eventName
├── eventType
├── startDate
├── endDate
├── location
└── venue

category

categoryDetails

logisticsDetails
```

The `category` identifies whether the requirement is for:

```text
EVENT_PLANNER
PERFORMER
CREW
```

---

## 🔄 Requirement Flow

```text
Step 1
Event Basics
    ↓
Select Category
    ↓
Step 2
Category Details
    ↓
Step 3
Logistics & Budget
    ↓
Step 4
Review & Submit
    ↓
POST /api/requirements
    ↓
Express + Zod Validation
    ↓
MongoDB
```

Steps 2 and 3 dynamically display fields based on the category selected in Step 1.

---

## 📝 Assignment Focus

This project focuses on the core requirements of the GoPratle technical assignment:

* Clean and modular code structure
* Working multi-step requirement flow
* Dynamic category-specific fields
* Client-side and server-side validation
* Working REST API
* MongoDB persistence
* Clear data categorization
* Responsive and usable interface

The implementation intentionally avoids unnecessary production-level complexity and focuses on **clear execution and maintainable code**.

---

## 🔗 Submission

* **Live Frontend**: Add your deployed Vercel URL here
* **GitHub Repository**: https://github.com/itzSumma/gopratle-requirement-platform
* **Screen Recording**: Add your 5–7 minute recording link here

The screen recording demonstrates:

1. Complete 4-step requirement submission flow
2. Dynamic category-based fields
3. Form validation
4. API request and response
5. MongoDB data storage
