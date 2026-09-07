export interface CreatedOrder {
  id: string;
  paymentId: string;
  paymentMethod: "esewa" | "khalti" | "cod";
  name: string;
  email: string;
  phone: string;
  address: string;
  status: "Pending" | "Paid" | "Processing";
  createdAt: string;
  totalAmount: number;
  products: {
    productId: string | number;
    title: string;
    image: string;
    quantity: number;
    price: number;
  }[];
}

export const getStoredOrders = (): CreatedOrder[] => {
  try {
    const raw = localStorage.getItem("app_orders");
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return [
    {
      id: "ORD-982143",
      paymentId: "ESW-84920491",
      paymentMethod: "esewa",
      name: "Aarav Sharma",
      email: "aarav.sharma@example.com",
      phone: "+977 9841234567",
      address: "House 42, New Baneshwor, Kathmandu, Nepal",
      status: "Paid",
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      totalAmount: 2600,
      products: [
        {
          productId: 1,
          title: "A-Line Kurti With Sharara & Dupatta Set",
          image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=150&auto=format&fit=crop&q=80",
          quantity: 2,
          price: 1300,
        },
      ],
    },
  ];
};
