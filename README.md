# Subscriptions Management and Tracking API

A RESTful API built with Node.js and Express for tracking subscriptions. This application helps users manage their various subscriptions, send renewal reminders, and track payment status.

## Features

- 👤 User authentication (signup/signin)
- 📊 Subscription management (CRUD operations)
- 💰 Multiple currency support (USD, INR, EUR)
- 📅 Automatic renewal date calculation
- ⏰ Automated renewal reminders
- 🔒 JWT-based authentication
- 📧 Email notifications for subscription reminders
- 🔧 Global Error Handling

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- Docker
- Upstash QStash for workflows
- Nodemailer for emails

## Prerequisites

- Node.js (v20 or higher)
- pnpm
- MongoDB
- Docker (optional)
- Upstash account (for QStash)


## Installation

### Using pnpm (Local Development)

1. Clone the repository

```bash
git clone https://github.com/yourusername/SubSentinel.git
cd SubSentinel
```

2. Install dependencies

```bash
pnpm install
```

3. Create `.env` file in root directory

```bash
cp .env.example .env
```

4. Start the server

```bash
pnpm dev
```


### Using Docker

1. Build and run using Docker Compose

```bash
docker-compose up --build
```

2. Stop the containers

```bash
docker-compose down
``` 

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Author

Priyanshu - [GitHub Profile](https://github.com/priyanshuxdev)


## Acknowledgments

- Thanks to Upstash for QStash workflow management
- MongoDB Atlas for database hosting






