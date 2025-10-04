# MERN Agent App

This is a MERN stack application for managing agents and distributing lists. It includes a React frontend and an Express/MongoDB backend.

## Features

- User authentication with JWT
- Admin dashboard with tabs for managing agents, uploading CSV/XLSX files, and viewing distributed lists
- Add, list, and manage agents
- Upload and distribute contact lists equally among agents
- Responsive and user-friendly UI with error handling and loading states

## Technologies Used

- Frontend: React, React Router, Axios
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, Multer
- Styling: CSS with flexbox for layout

## Setup Instructions

### Backend

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the `backend` directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```
   npm start
   ```

### Frontend

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm start
   ```

4. Open your browser and go to `http://localhost:3000`

## Usage

- Register or login as an admin user.
- Access the dashboard to manage agents, upload contact lists, and view distributed lists.
- Use the refresh buttons to reload data.
- Logout when done.

## API Endpoints

- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register user
- `POST /api/auth/register-admin` - Register admin
- `GET /api/agents` - Get all agents (protected)
- `POST /api/agents` - Create new agent (protected)
- `POST /api/lists/upload` - Upload and distribute list file (protected)
- `GET /api/lists` - Get distributed lists (protected)

## Notes

- The app requires exactly 5 agents to distribute lists equally.
- Supported upload file types: CSV, XLS, XLSX.
- Passwords are hashed before saving.

## License

This project is licensed under the MIT License.
