import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

interface MenuItem {
  id: string;
  name: string;
  price: number;
}

interface Order {
  id: string;
  items: MenuItem[];
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
}

let menu: MenuItem[] = [
  { id: '1', name: 'Chocolate Bar', price: 2.5 },
  { id: '2', name: 'Chocolate Truffle', price: 1.5 },
];

let orders: Order[] = [];

app.get('/api/menu', (req: Request, res: Response) => {
  res.json({ data: menu });
});

app.get('/api/order/:id', (req: Request, res: Response) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: `Couldn't find order #${req.params.id}` });
  }
  res.json({ data: order });
});

app.post('/api/order', (req: Request, res: Response) => {
  const { items } = req.body;
  const totalPrice = items.reduce((sum: number, item: MenuItem) => sum + item.price, 0);
  const newOrder: Order = {
    id: Date.now().toString(),
    items,
    totalPrice,
    status: 'pending'
  };
  orders.push(newOrder);
  res.status(201).json({ data: newOrder });
});

app.patch('/api/order/:id', (req: Request, res: Response) => {
  const orderIndex = orders.findIndex(o => o.id === req.params.id);
  if (orderIndex === -1) {
    return res.status(404).json({ error: `Couldn't find order #${req.params.id}` });
  }
  orders[orderIndex] = { ...orders[orderIndex], ...req.body };
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
