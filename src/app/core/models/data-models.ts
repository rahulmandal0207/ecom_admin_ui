export interface LoginRequest {
  Email: string;
  Password: string;
}

export class User {
  UserId: number = 0;
  Email: string | null = null;
  Password: string | null = null;
  Role: number | null = null;
  RoleName: string | null = null;
  Orders: Array<Order> | null = null;
}

export class Product {
  ProductId: number = 0;
  ProductName: string | null = null;
  CurrentPrice: number | null = null;
  StockQuantity: number | null = 1;
  ProductImageUrl?: string | null = null;
}

export class Order {
  OrderId: number = 0;
  UserId: number | null = null;
  OrderDate: Date = new Date();
  TotalAmount: number | null = null;
  OrderStatus: number | null = null;
  OrderStatusName: string | null = null;
  OrderDetails: OrderDetail[] = [];
}

export class OrderDetail {
  OrderDetailId: number = 0;
  OrderId: number | null = null;
  ProductId: number | null = null;
  Quantity: number = 1;
  Price: number = 0.0;
  ProductName: string | null = null;
}
