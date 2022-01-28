# GymLogger
A REST API for logging exercise progress and activity with Node.js, Express, MongoDB and React.

## Quick Start

**Clone Repository:**
```
git clone https://github.com/frankmarazita/GymLogger
cd GymLogger
```

**Server:**

```
cd server
```

- Install Dependencies:
```
npm install
```

- Set Environment Variables:
    - Rename `.env.example` file to `.env`
    - Modify the file contents as required

- Running Application:
```
npm start
```

- Running Tests:
```
npm test
```

**Client:**

```
cd client
```

- Install Dependencies:
```
npm install
```

- Set Environment Variables:
    - Rename `.env.example` file to `.env`
    - Modify the file contents as required

- Running Application in Dev:
```
npm start
```

- Build Client Package:
```
npm build
```

## Tools and Dependencies
Server:
- Node.js
- Express
- MongoDB
- Jest
- Joi
- JWT
- bcrypt
- dotenv
- helmet

Client:
- Node.js
- Axios
- React
- React Bootstrap
- Chart.js
- SASS

## Environment Variables:

The environment variables can be found and modified in the .env file in the Server and Client project root directories.

Server:

```
NODE_ENV=production/development
DOMAIN=example.com/localhost
PORT=5000

MONGODB_URI=mymongodbsecreturl
DB_NAME=mydbname

JWT_PRIVATE_KEY=testKey
```

Client:

```
BROWSER=none
PORT=3000

REACT_APP_API_URL='http://localhost:5000'
```

## Project Structure:

```
client\
 |--public\         # Static files
 |--src\            # Client source code
   |--assets\       # Static component specific files
   |--components\   # React components
   |--config\       # Configuration files
   |--constants\    # Variable constants
   |--containers\   # React pages
   |--routes\       # React routes
   |--utils\        # Project utilities
   |--App.js        # Main React component
   |--index.js      # App entry point
 |--.env.example    # Environment variables example

server\
 |--config\         # Configuration files
 |--constants\      # Variable constants
 |--controllers\    # Controller methods
 |--db\             # Database methods
 |--middleware\     # Middleware
 |--models\         # Models
 |--routes\         # Route controllers
 |--schemas\        # Schema definitions
 |--tests\          # Test cases
 |--utils\          # Project utilities
 |--.env.example    # Environment variables example
 |--app.js          # Express app
 |--routes.js       # Route imports
 |--server.js       # App entry point
```

## Issues and Features

- Kanban project for issues and new features can be found [here](https://github.com/frankmarazita/GymLogger/projects/1).

## Licence
[MIT](LICENSE)