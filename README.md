# GymLogger
A web application for logging exercise progress and activity with Node.js, Express and MongoDB.

## Quick Start

Clone Repository:
```
git clone https://github.com/frankmarazita/GymLogger
cd GymLogger
```

Install Dependencies:
```
npm install
```

Set Environment Variables:
- Rename `.env.example` file to `.env`
- Modify the file contents as required

Running Application:
```
npm start
```

Running Tests:
```
npm test
```

## Tools and Dependencies
- Node.js
- Express
    - Express Session
- MongoDB
- Jest
- bcrypt
- dotenv
- helmet

## Environment Variables:
The environment variables can be found and modified in the .env file in the project root.
```
NODE_ENV=production/development
DOMAIN=example.com/localhost
PORT=3000

MONGODB_SECRET=mymongodbsecreturl
DB_NAME=mydbname

SESSION_SECRET=mysessionsecret
SESSION_KEY=mysessionkey
```

## Project Structure:
```
src\
 |--config\         # Configuration files
 |--constants\      # Variable constants
 |--controllers\    # Controller methods
 |--db\             # Database methods
 |--helpers\        # Helper methods
 |--middleware\     # Middleware
 |--models\         # Models
 |--public\         # Static files
 |--routes\         # Route controllers
 |--scripts\        # Management scripts
 |--tests\          # Test cases
 |--utils\          # Utilities
 |--views\          # Handlebars views
 |--.env            # Environment variables
 |--app.js          # Express app
 |--routes.js       # Route imports
 |--server.js       # App entry point
```

## Issues and Features
- Kanban project for issues and new features can be found [here](https://github.com/frankmarazita/GymLogger/projects/1).

## Licence
[MIT](LICENSE)