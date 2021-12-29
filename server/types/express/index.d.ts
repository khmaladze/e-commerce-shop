declare namespace Express {
  export interface Request extends Request {
    user: import("../../server/interfaces/custom").User;
    product: import("../../server/interfaces/custom").Product;
    shop: import("../../server/interfaces/custom").Shop;
  }
}
