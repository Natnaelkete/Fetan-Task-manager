# Fetan Task Manager
Its task manager helps to create, delete, update tasks
## Features

- **Create tasks**
- **User Authentication**: Secure login and registration using JWT.
- **Scalable Backend**: Built with Express and MongoDB for robust performance.

## Tech Stack


- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Database**: MongoDB

 ## Routes

- /api/v1/signup
- /api/v1/signin
- /api/v1/logout
- /api/v1/profile
- /api/v1/tasks
- /api/v1/tasks/:id

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Natnaelkete/Fetan-Task-manager.git
2. Navigate to the project directory, install dependencies, and set up the frontend:

   ```bash
   cd Fetan-Task-manager
    npm install
3. Set up your environment variables:

   ```bash
   MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

4. Clone the repository:

   ```bash
   git clone https://github.com/Natnaelkete/Fetan-Task-manager.git
## Project Structure

  ```bash
  Fetan-Task-manager/
├── controllers/    # Express controllers
├── models/         # Mongoose models
├── routes/         # API routes
├── middleware/     # Custom middleware
├── utils/          # Utility functions
├── .env.example    # Example environment variables
└── README.md       # Project documentation
