# CoachingOS — Future Backend Architecture & Service Blueprint

## Overview
This directory outlines the planned modular backend architecture for **CoachingOS**, engineered for multi-tenant SaaS deployment, enterprise role-based authorization, and high-concurrency educational operations.

> **Phase 1 Notice:** Backend APIs and database connections are planned and documented here. The active implementation in Phase 1 is frontend-only using reactive client-side demo state.

---

## Planned Technology Stack
- **Runtime**: Node.js v20+ / v22 LTS with TypeScript in strict mode
- **Web Framework**: Express.js with async routing and security middleware (`helmet`, `cors`, `express-rate-limit`)
- **Primary Database**: MongoDB Atlas (Replica Set)
- **Object Modeling**: Mongoose with strict schema definitions and schema-level validation
- **Data Validation**: Zod for request payloads, query parameters, and environment config
- **Authentication**: Stateless JWT tokens (Access + Refresh tokens) stored in HTTP-only Secure SameSite cookies
- **Password Hashing**: `argon2` or `bcryptjs`
- **File & Media Storage**: AWS S3 or Cloudflare R2 with pre-signed upload URLs
- **Payment Gateway**: Razorpay / Stripe Webhooks with signature verification
- **Notifications**: SendGrid / Resend (Email), Twilio / MSG91 (WhatsApp & SMS alerts)
- **Task Queue & Caching**: Redis + BullMQ for scheduled report generation, payment reminders, and bulk notifications

---

## Planned Directory Structure

```
backend/
├── src/
│   ├── config/              # Database connection, environment variables, Redis client
│   │   ├── database.ts
│   │   ├── env.ts
│   │   └── redis.ts
│   │
│   ├── middlewares/         # Global & route-level middlewares
│   │   ├── authenticate.ts  # JWT verification and user hydration
│   │   ├── authorize.ts     # Role-based access control (RBAC) & tenant guards
│   │   ├── tenantContext.ts # Multi-institute tenant context extractor
│   │   ├── validate.ts      # Generic Zod validation middleware
│   │   ├── rateLimiter.ts   # IP and user rate limiting
│   │   └── errorHandler.ts  # Centralized error handler
│   │
│   ├── modules/             # High-cohesion domain modules
│   │   ├── auth/            # Login, registration, token refresh, password resets
│   │   ├── institutes/      # Institute profile, custom domain, branding
│   │   ├── branches/        # Multi-branch management and branch-level filters
│   │   ├── users/           # User accounts across all roles (Admin, Teacher, Student)
│   │   ├── students/        # Student profiles, enrollments, guardian details
│   │   ├── admissions/      # Inquiries, follow-ups, and conversion pipeline
│   │   ├── teachers/        # Faculty assignments, teacher profiles, qualifications
│   │   ├── batches/         # Batch schedules, capacities, teacher linkages
│   │   ├── courses/         # Course catalogs, fee structures, syllabus
│   │   ├── subjects/        # Subject definitions and curriculum mapping
│   │   ├── attendance/      # Daily attendance logging, biometric integration hooks
│   │   ├── fees/            # Fee ledgers, installment schedules, transactions, receipts
│   │   ├── exams/           # Offline & online exam schedules, weightage
│   │   ├── question-banks/  # Tagged MCQ and subjective questions repository
│   │   ├── assignments/     # Student homework submissions and teacher grading
│   │   ├── learning-materials/ # PDF notes, video lecture links, documents
│   │   ├── live-classes/    # Zoom/Google Meet integration & session links
│   │   ├── results/         # Marksheet generation, percentiles, ranking
│   │   ├── certificates/    # Dynamic PDF certificate generation
│   │   ├── enquiries/       # Public admission inquiries & lead status tracker
│   │   ├── notifications/   # Push, email, and SMS triggers
│   │   ├── reports/         # Aggregated business intelligence & CSV exporters
│   │   └── payments/        # Razorpay/Stripe webhooks, payment reconciliation
│   │
│   ├── utils/               # Common utilities (encryption, logger, pagination helpers)
│   ├── types/               # Shared backend TypeScript types
│   ├── app.ts               # Express application initialization
│   └── server.ts            # HTTP server bootstrap & graceful shutdown hooks
│
├── package.json             # Planned dependencies list
├── tsconfig.json            # Node.js TypeScript configuration
└── README.md                # Backend architecture blueprint (this file)
```

---

## Planned Database Schema (MongoDB / Mongoose)

### 1. `Institute` (Multi-tenant Foundation)
- `_id`: ObjectId
- `name`: String
- `subdomain`: String (unique index)
- `logoUrl`: String
- `contact`: { phone: String, email: String, address: String }
- `status`: 'ACTIVE' | 'SUSPENDED' | 'TRIAL'
- `settings`: { currency: String, academicYear: String, timeZone: String }
- `createdAt`: Date, `updatedAt`: Date

### 2. `User` (Shared Authentication)
- `_id`: ObjectId
- `instituteId`: ObjectId (index, tenant separation)
- `branchId`: ObjectId (optional, for branch staff)
- `fullName`: String
- `email`: String (indexed)
- `phone`: String (indexed)
- `passwordHash`: String
- `role`: 'SUPER_ADMIN' | 'INSTITUTE_ADMIN' | 'BRANCH_MANAGER' | 'TEACHER' | 'STUDENT' | 'PARENT'
- `isActive`: Boolean

### 3. `Student`
- `_id`: ObjectId
- `instituteId`: ObjectId (index)
- `branchId`: ObjectId (index)
- `userId`: ObjectId (references User)
- `enrollmentNumber`: String (unique per institute)
- `courseId`: ObjectId (references Course)
- `batchIds`: [ObjectId] (references Batch)
- `guardian`: { name: String, phone: String, relation: String, email: String }
- `admissionDate`: Date
- `status`: 'ACTIVE' | 'ALUMNI' | 'SUSPENDED' | 'DROPOUT'

### 4. `FeeRecord` & `FeeTransaction`
- `_id`: ObjectId
- `instituteId`: ObjectId
- `studentId`: ObjectId (references Student)
- `totalAmount`: Number
- `discountAmount`: Number
- `netPayable`: Number
- `paidAmount`: Number
- `balanceDue`: Number
- `installments`: [{ dueDate: Date, amount: Number, status: 'PAID' | 'PENDING' | 'OVERDUE' }]
- `transactions`: [{ amount: Number, mode: 'CASH' | 'UPI' | 'CARD' | 'NET_BANKING', receiptNo: String, collectedBy: ObjectId, date: Date }]

### 5. `Attendance`
- `_id`: ObjectId
- `instituteId`: ObjectId
- `batchId`: ObjectId (references Batch)
- `date`: Date (YYYY-MM-DD)
- `records`: [{ studentId: ObjectId, status: 'PRESENT' | 'ABSENT' | 'LATE', remarks: String }]
- `markedBy`: ObjectId (references Teacher/Admin)

---

## REST API Endpoint Blueprint

| Method | Endpoint | Description | Role Required |
|---|---|---|---|
| `POST` | `/api/v1/auth/login` | Authenticate user & issue tokens | Public |
| `GET` | `/api/v1/auth/me` | Fetch authenticated session profile | Any logged-in |
| `GET` | `/api/v1/dashboard/metrics` | Institute KPI summaries and trends | Admin, Branch Manager |
| `GET` | `/api/v1/students` | Filterable, paginated student directory | Admin, Teacher |
| `POST` | `/api/v1/students` | Register new student profile | Admin |
| `GET` | `/api/v1/students/:id` | Detailed profile with fee & attendance tabs | Admin, Teacher, Student (Self) |
| `POST` | `/api/v1/admissions/enquiries` | Create new admission inquiry | Public / Admin |
| `PATCH` | `/api/v1/admissions/enquiries/:id/status`| Progress inquiry to Admitted / Contacted | Admin |
| `GET` | `/api/v1/batches` | List batches with capacity & schedules | Admin, Teacher, Student |
| `POST` | `/api/v1/attendance` | Log batch attendance for date | Admin, Teacher |
| `POST` | `/api/v1/fees/collect` | Record fee installment payment | Admin |
| `GET` | `/api/v1/exams` | Exam schedules, question papers | Admin, Teacher, Student |
| `GET` | `/api/v1/learning-materials` | Study materials with course/subject tags | All users |
