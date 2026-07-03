# MERN Product CRUD Application

A full-stack web application for managing products with Create, Read, Update, and Delete (CRUD) operations built using the MERN stack.

## Tech Stack

- **Frontend:** React 18, Vite, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Additional:** CORS, dotenv

## Project Structure

```
mern-crud-project/
├── backend/
│   ├── server.js          # Express server and API routes
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── main.jsx       # React entry point
│   │   └── styles.css     # Styling
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Implementation Overview

### Backend (Express.js)

The backend is built with Express.js and provides RESTful API endpoints for product management:

- **Database Model:** Product schema with fields for name, price, category, description, and createdAt timestamp
- **CRUD Operations:**
  - `GET /api/products` - Fetch all products (sorted by newest first)
  - `POST /api/products` - Create a new product with validation
  - `PUT /api/products/:id` - Update an existing product
  - `DELETE /api/products/:id` - Delete a product

**Key Features:**
- Input validation for all required fields
- MongoDB integration with Mongoose for data persistence
- CORS enabled for frontend communication
- Error handling with appropriate HTTP status codes

### Frontend (React + Vite)

The frontend is a React application powered by Vite for fast development and optimized builds:

- Displays a list of all products
- Forms for creating and updating products
- Delete functionality with product management
- Real-time updates via Axios HTTP client
- Responsive UI with CSS styling

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/product-crud
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```
VITE_API_URL=http://localhost:5000
```

## Running the Application

### Start Backend Server
```bash
cd backend
npm run dev    # Development with nodemon
# or
npm start      # Production
```
The backend runs on `http://localhost:5000`

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend runs on `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create a new product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

### Example Request Body (POST/PUT)
```json
{
  "name": "Product Name",
  "price": 99.99,
  "category": "Electronics",
  "description": "Product description"
}
```

## Features

✅ Full CRUD operations on products
✅ Real-time data updates
✅ Input validation
✅ Error handling and user feedback
✅ Responsive design
✅ MongoDB persistence
✅ Development and production modes

## Future Enhancements

- User authentication and authorization
- Product images and file uploads
- Advanced filtering and search
- Pagination for product lists
- Testing suite (Jest, React Testing Library)
- Deployment to cloud platforms
