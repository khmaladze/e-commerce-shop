declare namespace Express {
  export interface Request extends Request {
    user: import("../../server/interfaces/custom").User;
  }
}
