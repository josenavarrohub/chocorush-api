import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

// Load environment variables from .env file
import "./env";

// Types
import { Order, MenuItem } from "./types";

// Data: Menu
import { menu } from "./data";

// Express app
const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;
const app = express();
app.use(cors());
app.use(express.json());

// Data: Order
let orders: Order[] = [];

// API Routes

// Serve static files (including images)
app.use("/images", express.static(path.join(__dirname, "images")));

// Retrieve the menu
app.get("/api/menu", (req: Request, res: Response) => {
  res.json({ data: menu });
});

// Retrieve a specific order
app.get("/api/order/:id", (req: Request, res: Response) => {
  const orderId = req.params.id;
  const order = orders.find(o => o.id === orderId);
  
  if (order) {
    res.json({ data: order });
  } else {
    res.status(404).json({ error: "Order not found" });
  }
});

// Create a new order
app.post("/api/order", (req: Request, res: Response) => {
  const { items } = req.body;
  
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Invalid order items" });
  }

  const orderItems: MenuItem[] = [];
  let totalPrice = 0;

  for (const itemId of items) {
    const menuItem = menu.find(m => m.id === itemId);
    if (menuItem && !menuItem.soldOut) {
      orderItems.push(menuItem);
      totalPrice += menuItem.unitPrice;
    }
  }

  if (orderItems.length === 0) {
    return res.status(400).json({ error: "No valid items in the order" });
  }

  const newOrder: Order = {
    id: uuidv4(),
    items: orderItems,
    totalPrice,
    status: "pending"
  };

  orders.push(newOrder);
  res.status(201).json({ data: newOrder });
});

// Update an existing order
app.patch("/api/order/:id", (req: Request, res: Response) => {
  const orderId = req.params.id;
  const { status } = req.body;

  const orderIndex = orders.findIndex(o => o.id === orderId);
  
  if (orderIndex === -1) {
    return res.status(404).json({ error: "Order not found" });
  }

  if (status && ["pending", "completed", "cancelled"].includes(status)) {
    orders[orderIndex].status = status;
    res.json({ data: orders[orderIndex] });
  } else {
    res.status(400).json({ error: "Invalid status update" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at ${BASE_URL}:${PORT}`);
});
