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

export class Order {}
