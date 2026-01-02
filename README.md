

# React Product Listing App

A modern, full-stack e-commerce product listing application built with **React** (frontend), **Node.js/Express** (backend), and **SQLite** (database). The app supports dynamic product management, user/admin roles, image uploads, cart and checkout flows, and order management.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Design](#system-design)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Testing](#testing)
- [Deployment](#deployment)
- [Conclusion](#conclusion)

---

## Project Overview

This app demonstrates a complete e-commerce workflow, including:

- Product listing with images, price, description, and category
- Dynamic category management
- Admin and user roles with protected features
- Cart, checkout, and order summary
- Responsive design for mobile and desktop

---

## Features

- **User Features:**
  - Browse and search products
  - Add products to cart
  - Checkout with shipment details
  - View order summary and confirmation

- **Admin Features:**
  - Login (credentials stored in database)
  - Add, edit, and delete products
  - Manage categories
  - View all orders

- **General:**
  - Image upload for products
  - Responsive UI (Tailwind CSS)
  - All data managed via backend API

---

## Tech Stack

- **Frontend:** React (Class & Function Components), React Router, Tailwind CSS
- **Backend:** Node.js, Express.js, Multer (for image upload)
- **Database:** SQLite (products.db)
- **Other:** SQLite Studio (for DB management)

---

## System Design

### Frontend Components

- `App.js`: Main logic, state, and routing
- `Layout.js`: Sidebar, header, and responsive layout
- `Sidebar.js`: Expandable/collapsible, colorful sidebar
- `ProductGrid.js`: Responsive, modern product cards
- `ProductDetail.js`: Full product info, add to cart, shipment form
- `Cart.js`: Responsive cart, order summary, remove items
- `Checkout.js`: Read-only delivery info, order summary, confirm order
- `AdminLogin.js`: Admin login form

### Backend

- **Tables:** `products`, `categories`, `orders`, `order_items`, `admins`
- **API Endpoints:**
  - `/api/products`
  - `/api/categories`
  - `/api/orders`
  - `/api/admin-login`
  - `/api/upload`

---

## Installation & Setup

### Prerequisites

- Node.js (v14+)
- npm
- [SQLite Studio](https://sqlitestudio.pl/) (optional, for DB management)

### Backend Setup

```bash
cd backend
npm install
# Ensure products.db exists or is created on first run
node server.js
# Runs on http://localhost:5000
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

---

## Usage

- **User:** Browse products, add to cart, checkout, view orders.
- **Admin:** Login via `/admin-login`, manage products/categories, view orders.

---

## Screenshots

> Certainly! Here’s a professional and comprehensive `README.md` for your **React Product Listing App** project, based on your detailed SDLC outline:

---

# React Product Listing App

A modern, full-stack e-commerce product listing application built with **React** (frontend), **Node.js/Express** (backend), and **SQLite** (database). The app supports dynamic product management, user/admin roles, image uploads, cart and checkout flows, and order management.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Design](#system-design)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Testing](#testing)
- [Deployment](#deployment)
- [Conclusion](#conclusion)

---

## Project Overview

This app demonstrates a complete e-commerce workflow, including:

- Product listing with images, price, description, and category
- Dynamic category management
- Admin and user roles with protected features
- Cart, checkout, and order summary
- Responsive design for mobile and desktop

---

## Features

- **User Features:**
  - Browse and search products
  - Add products to cart
  - Checkout with shipment details
  - View order summary and confirmation

- **Admin Features:**
  - Login (credentials stored in database)
  - Add, edit, and delete products
  - Manage categories
  - View all orders

- **General:**
  - Image upload for products
  - Responsive UI (Tailwind CSS)
  - All data managed via backend API

---

## Tech Stack

- **Frontend:** React (Class & Function Components), React Router, Tailwind CSS
- **Backend:** Node.js, Express.js, Multer (for image upload)
- **Database:** SQLite (products.db)
- **Other:** SQLite Studio (for DB management)

---

## System Design

### Frontend Components

- `App.js`: Main logic, state, and routing
- `Layout.js`: Sidebar, header, and responsive layout
- `Sidebar.js`: Expandable/collapsible, colorful sidebar
- `ProductGrid.js`: Responsive, modern product cards
- `ProductDetail.js`: Full product info, add to cart, shipment form
- `Cart.js`: Responsive cart, order summary, remove items
- `Checkout.js`: Read-only delivery info, order summary, confirm order
- `AdminLogin.js`: Admin login form

### Backend

- **Tables:** `products`, `categories`, `orders`, `order_items`, `admins`
- **API Endpoints:**
  - `/api/products`
  - `/api/categories`
  - `/api/orders`
  - `/api/admin-login`
  - `/api/upload`

---

## Installation & Setup

### Prerequisites

- Node.js (v14+)
- npm
- [SQLite Studio](https://sqlitestudio.pl/) (optional, for DB management)

### Backend Setup

```bash
cd backend
npm install
# Ensure products.db exists or is created on first run
node server.js
# Runs on http://localhost:5000
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

---

## Usage

- **User:** Browse products, add to cart, checkout, view orders.
- **Admin:** Login via `/admin-login`, manage products/categories, view orders.

---

## Screenshots

>(image-1.png)
(image.png)
(image-2.png)
(image-3.png)
(image-4.png)
(image-5.png)
(image-6.png)
(image-7.png)
(image-8.png)
(image-9.png)
(image-10.png)
> sections:

- **Home/Product Grid**
- **Product Detail**
- **Add to Cart & Cart Page**
- **Checkout Page**
- **Admin Login**
- **Add/Edit Product (Admin)**
- **Database in SQLite Studio**

---

## Testing

- Manual testing for all user and admin flows:
  - Add/edit/delete products and categories (admin)
  - Add to cart, checkout, confirm order (user)
  - Responsive UI on mobile and desktop
  - Image upload and display
  - Admin login/logout
- Database integrity checked in SQLite Studio

---

## Deployment

- **Backend:** Node.js/Express server on port `5000`
- **Frontend:** React app on port `3000`
- **Database:** `products.db` in backend folder

---

## Conclusion

- Full-stack, database-driven, modern e-commerce solution
- All data managed in the backend and fetched via API
- Fully responsive and user-friendly UI
- Admin features protected by login
- Follows SDLC best practices from requirements to deployment

---

## License

MIT License

---

