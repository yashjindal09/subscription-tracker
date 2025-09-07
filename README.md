# Subscription Tracker (Backend)

A Node.js backend for a subscription management system. This API allows users to sign up, log in, and manage their subscriptions securely. It also features automated email reminders for upcoming subscription expirations.

## Features

- **User Authentication**
  - Users can sign up with username, email, and password.
  - Users sign in using email and password.
  - JWT-based authentication with secure token handling.

- **Authorization**
  - Protected routes: Only authenticated users can view or create their own subscriptions.
  - Middleware checks for valid JWT tokens before allowing access to subscription-related endpoints.

- **Subscription Management**
  - Users can create, view, and manage their own subscriptions.
  - Each user’s subscriptions are private and accessible only when logged in.

- **Email Reminders**
  - Uses Upstash for workflow management and Nodemailer for sending emails.
  - Automated reminders are triggered if a subscription is about to expire in 7, 5, 2, or 1 day(s).

## Technologies Used

- Node.js
- Express.js
- JWT (JSON Web Token)
- Upstash (for workflows/scheduling)
- Nodemailer (for email notifications)

## Getting Started

### Prerequisites

- Node.js and npm installed
- Environment variables set for JWT secret, email credentials, and Upstash configuration

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yashjindal09/subscription-tracker.git
   cd subscription-tracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file with the required secrets (see `.env.example` if available).

### Running the Server

```bash
npm start
```

### API Overview

- **POST /signup**: Register a new user (username, email, password)
- **POST /signin**: Log in and receive a JWT token
- **GET /subscriptions**: Get user’s subscriptions (requires Authorization header)
- **POST /subscriptions**: Create a new subscription (requires Authorization header)

### Email Reminder Workflow

The backend automatically checks for upcoming subscription expirations and triggers email reminders at 7, 5, 2, and 1 day(s) before renewal.

## Contributing

Contributions, issues, and feature requests are welcome!
Please open an issue or submit a pull request.

## License

*No license specified. Please add a license if you intend to share or distribute this project.*

## Author

- [yashjindal09](https://github.com/yashjindal09)

---

_This README describes the backend API for a subscription tracker. Please update with deployment and environment details as needed._
