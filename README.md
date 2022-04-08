# GymLogger

A REST API for logging exercise progress and activity with Node.js, Express and MongoDB.

Also has a frontend website and PWA built with React.

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

## Dependencies
Server (Node.js):
- axios
- bcrypt
- cors
- dotenv
- express
- helmet
- jest
- joi
- jsonwebtoken
- lodash
- math-random
- mongodb
- node-2fa
- nodemon

Client (React):
- axios
- chart.js
- jsonwebtoken
- jwt-decode
- moment
- react
- react-bootstrap
- react-chartjs-2
- react-dom
- react-router-dom
- react-scripts
- sass
- web-vitals

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

CONFIG_OVERRIDE=false
CONFIG_OVERRIDE_FOLDER=../temp/config # relative to config.js

EXTERNAL_LOGGING=false
EXTERNAL_LOGGING_URL=https://logging.example.com/api/logs
```

Client:

```
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
 |--logger\         # File & database logging methods
 |--logs\           # Log files (Created by logger)
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

## Licence

[MIT](LICENSE)