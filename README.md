<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
  <b>Personal Finance Management Application</b>
</p>

<div align="center">
  <img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="nestjs" />
  <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
  <img src="https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white" alt="postgresql" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="prisma" />
</div>

## 📝 Project Overview

Finance Planner is a personal finance management application that helps users track income, expenses, savings, and investments. The system is developed using NestJS combined with PostgreSQL and Prisma ORM, providing a powerful API for managing financial data.

## 🛠️ Technology Stack

- **Backend Framework**: NestJS
- **Programming Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Token)
- **API Documentation**: Swagger
- **Email Service**: Nodemailer
- **File Storage**: AWS S3
- **Containerization**: Docker

## ✨ Key Features

### 1. User Management & Authentication

- Account registration
- Email verification
- Login
- Forgot password
- Change password
- Profile management
- Role-based permissions

### 2. Income Management

- Track personal income
- Categorize income sources
- Monthly/yearly income statistics

### 3. Expense Management

- Record expenses
- Categorize expenses
- Monthly/yearly expense statistics

### 4. Savings Management

- Track savings
- Set savings goals
- Monitor savings progress

### 5. Investment Management

- Track investments
- Record return rates
- Manage investment portfolio

### 6. Budgeting

- Set budgets for expense categories
- Alerts when exceeding budget
- Monthly budget tracking

### 7. Financial Reports

- Monthly overview reports
- Yearly overview reports
- Visual statistics and charts

## 📁 Directory Structure

```
src/
├── configs/          # Application, Swagger, and service configurations
├── core/             # Core modules and utilities
├── decorator/        # Custom decorators
├── enums/            # Enums used in the application
├── guard/            # Authentication guards
├── helpers/          # Helper functions
├── lib/              # Libraries and utilities
├── modules/          # Main application modules
│   ├── auth/         # User authentication
│   ├── budgets/      # Budget management
│   ├── categories/   # Category management
│   ├── expenses/     # Expense management
│   ├── investments/  # Investment management
│   ├── monthlies/    # Monthly data management
│   ├── personal-incomes/ # Personal income management
│   ├── role/         # User role management
│   ├── savings/      # Savings management
│   ├── user/         # User management
│   └── yearlies/     # Yearly data management
├── templates/        # Templates for emails and documents
├── types/            # Type definitions
└── utils/            # Utility functions
```

## 📥 Installation

```bash
# Install dependencies
$ npm install
```

## ⚙️ Environment Variables Configuration

Create a `.env` file in the root directory and add the following environment variables:

```env
DATABASE_URL=          # PostgreSQL connection URL
ACCESS_TOKEN_KEY=      # Secret key for access token
REFRESH_TOKEN_KEY=     # Secret key for refresh token
MAIL_TRANSPORT=        # SMTP configuration for email
MAIL_FROM=             # Sender email
JWT_SECRET=            # Secret key for JWT
AWS_REGION=            # AWS S3 region
AWS_ACCESS_KEY_ID=     # AWS access key ID
AWS_SECRET_ACCESS_KEY= # AWS secret access key
AWS_S3_BUCKET_NAME=    # S3 bucket name
```

## 🚀 Running the Application

```bash
# Development mode
$ npm run start:dev

# Production mode
$ npm run start:prod
```

## 🧪 Testing

```bash
# Unit tests
$ npm run test

# E2E tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

## 📚 API Documentation

Access http://localhost:4040/api with your browser to view the API documentation (Swagger).

---

Developed by [ThanhDev](https://www.facebook.com/thanh.vophuoc.50) 💙
