

# 🛒 React Product Listing App

A modern, full-stack e-commerce product listing application built with **React**, **Node.js/Express**, and **SQLite**.  
The app supports dynamic product management, user/admin roles, image uploads, cart and checkout flows, and order management with a responsive UI.

---

## 📌 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Design](#system-design)
- [Database Schema](#database-schema)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Testing](#testing)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [Conclusion](#conclusion)
- [License](#license)

---

## 📖 Project Overview

This project demonstrates a complete **e-commerce workflow**, including:

- Product listing with images, price, description, and category
- Dynamic category management
- User and admin roles with protected features
- Cart, checkout, and order summary
- Fully responsive UI for mobile and desktop
- Backend-driven data management via REST APIs

---

## ✨ Features

### 👤 User Features
- Browse products by category
- Search products
- View product details
- Add products to cart
- Update or remove cart items
- Checkout with shipment details
- View order summary and confirmation

### 🛠 Admin Features
- Secure admin login
- Add, edit, and delete products
- Upload product images
- Manage product categories
- View all customer orders

### ⚙️ General Features
- RESTful backend APIs
- Image upload using Multer
- SQLite database for persistent storage
- Responsive UI using Tailwind CSS
- Modular and reusable components

---

## 🧰 Tech Stack

### Frontend
- React (Class & Functional Components)
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- Multer
- CORS

### Database
- SQLite
- SQLite Studio (optional)

---

## 🏗 System Design

### Frontend Components

| Component | Description |
|---------|------------|
| `App.js` | Main routing and state management |
| `Layout.js` | Layout with header and sidebar |
| `Sidebar.js` | Collapsible navigation sidebar |
| `ProductGrid.js` | Responsive product listing |
| `ProductDetail.js` | Product details and add-to-cart |
| `Cart.js` | Cart management and summary |
| `Checkout.js` | Order confirmation |
| `AdminLogin.js` | Admin authentication |
| `AdminDashboard.js` | Product & category management |

---

### Backend

#### Database Tables
- `products`
- `categories`
- `orders`
- `order_items`
- `admins`

#### API Endpoints

| Method | Endpoint | Description |
|------|----------|-------------|
| GET | `/api/products` | Fetch all products |
| POST | `/api/products` | Add product (admin) |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| GET | `/api/categories` | Fetch categories |
| POST | `/api/orders` | Place order |
| GET | `/api/orders` | View all orders |
| POST | `/api/admin-login` | Admin login |
| POST | `/api/upload` | Upload product images |

---

## 🗄 Database Schema

### Products Table
```sql
id INTEGER PRIMARY KEY
name TEXT
price REAL
description TEXT
category_id INTEGER
image TEXT
````

### Orders Table

```sql
id INTEGER PRIMARY KEY
customer_name TEXT
address TEXT
total REAL
created_at TIMESTAMP
```

### Order Items Table

```sql
id INTEGER PRIMARY KEY
order_id INTEGER
product_id INTEGER
quantity INTEGER
price REAL
```

---

## ⚙️ Installation & Setup

### Prerequisites

* Node.js (v14+)
* npm
* SQLite Studio (optional)

---

### 🔧 Backend Setup

```bash
cd backend
npm install
node server.js
```

Backend runs at:
`http://localhost:5000`

---

### 🎨 Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at:
`http://localhost:3000`

---

## 🚀 Usage

### User

* Browse products
* Add items to cart
* Checkout and confirm order

### Admin

* Login via `/admin-login`
* Manage products and categories
* View customer orders

---

## 🖼 Screenshots
C:\Users\user\OneDrive\Desktop\FS P 2\image.png
C:\Users\user\OneDrive\Desktop\FS P 2\image-1.png
C:\Users\user\OneDrive\Desktop\FS P 2\image-2.png
C:\Users\user\OneDrive\Desktop\FS P 2\image-3.png
C:\Users\user\OneDrive\Desktop\FS P 2\image-4.png
C:\Users\user\OneDrive\Desktop\FS P 2\image-5.png
C:\Users\user\OneDrive\Desktop\FS P 2\image-6.png
C:\Users\user\OneDrive\Desktop\FS P 2\image-7.png
C:\Users\user\OneDrive\Desktop\FS P 2\image-8.png
C:\Users\user\OneDrive\Desktop\FS P 2\image-9.png
C:\Users\user\OneDrive\Desktop\FS P 2\image-10.png
* Home / Product Grid
* Product Detail Page
* Cart Page
* Checkout Page
* Admin Login
* Admin Dashboard
* SQLite Database View

---

## 🧪 Testing

Manual testing performed for:

* Product CRUD operations
* Category management
* Cart and checkout flows
* Image upload and display
* Admin login/logout
* Responsive UI testing
* Database integrity via SQLite Studio

---

## 🌍 Deployment

* Frontend: React app (port 3000)
* Backend: Node.js/Express (port 5000)
* Database: SQLite (`products.db`)

---

## 🔮 Future Enhancements

* User authentication and order history
* Payment gateway integration
* Pagination and advanced filtering
* JWT-based authentication
* Cloud image storage
* Order status tracking

---

## ✅ Conclusion

* Full-stack, database-driven e-commerce solution
* Clean separation of frontend and backend
* RESTful API architecture
* Responsive, user-friendly UI
* Secure admin features
* Follows SDLC best practices

---

## 📄 License

MIT License

```

---

