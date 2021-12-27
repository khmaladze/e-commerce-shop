import express, { Express, Request } from "express";

export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  country: string;
  user_address: string;
  email: string;
  user_password: string;
  user_card: string;
  card_password: string;
  is_blocked: string;
  budget: string;
  user_image: string | null;
  ip_address: string;
  browser_type: string;
  created_at: string;
  updated_at: string;
}

declare namespace Express {
  export interface Request {
    user?: object;
  }
}

export interface customUserRequest extends Request {
  user?: User;
}
