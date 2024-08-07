export interface MenuItem {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
}

export interface Order {
  id: string;
  items: MenuItem[];
  totalPrice: number;
  status: "pending" | "completed" | "cancelled";
}
