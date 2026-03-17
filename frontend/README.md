# Shop App

A full-stack product management system built with Node.js, PostgreSQL, and vanilla HTML/CSS/JS. Supports full CRUD operations for products and an interactive shopping cart.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express |
| Database | PostgreSQL (via Docker) |
| Frontend | HTML, CSS, Vanilla JavaScript |
| DB GUI | pgAdmin 4 |

## Features

- View all products in a responsive grid layout
- Add, edit, and delete products
- Add individual products or all products to cart
- Adjust cart item quantities with real-time total calculation
- Stock status indicators (in stock / low stock / out of stock)
- Auto-generated emoji icons for products without images

## Project Structure

```
shop-app/
├── docker-compose.yml          # PostgreSQL container setup
├── backend/
│   ├── package.json
│   ├── .env                    # DB credentials (not committed)
│   ├── .env.example            # Template for environment variables
│   └── src/
│       ├── index.js            # Server entry point
│       ├── db/
│       │   └── index.js        # DB connection + table init
│       ├── routes/
│       │   └── products.js     # Route definitions
│       └── controllers/
│           └── productController.js  # Business logic
└── frontend/
    └── index.html              # Single-page frontend (no build step)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/shop-app.git
cd shop-app
```

### 2. Start the database

```bash
docker compose up -d
```

### 3. Configure the backend

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your database credentials:

```
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=shopdb
DB_USER=postgres
DB_PASSWORD=postgres123
```

### 4. Install dependencies and start the server

```bash
npm install
npm run dev
```

You should see:
```
✅ Database initialized
🚀 Server running on http://localhost:3001
```

### 5. Open the frontend

```bash
cd ../frontend
npx serve .
```

Visit the URL shown in the terminal (e.g. `http://localhost:3000`).

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get a single product |
| POST | `/api/products` | Create a product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

### Example request

```bash
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Wireless Headphones", "price": 49.99, "stock": 50}'
```

### Example response

```json
{
  "id": 1,
  "name": "Wireless Headphones",
  "price": "49.99",
  "stock": 50,
  "image_url": null,
  "created_at": "2026-03-17T02:00:00.000Z"
}
```

## Database

The `products` table is created automatically on first startup.

```sql
CREATE TABLE products (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  price      NUMERIC(10, 2) NOT NULL,
  stock      INTEGER NOT NULL DEFAULT 0,
  image_url  TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

To seed sample data, run the following SQL in pgAdmin or any PostgreSQL client:

```sql
INSERT INTO products (name, price, stock) VALUES
  ('Wireless Headphones', 49.99, 50),
  ('Mechanical Keyboard', 89.00, 30),
  ('USB-C Hub', 29.99, 100),
  ('Webcam 1080p', 59.99, 20);
```

## Useful Commands

```bash
# Start database
docker compose up -d

# Stop database
docker compose down

# View database logs
docker compose logs db

# Restart backend after code changes (nodemon handles this automatically)
npm run dev
```