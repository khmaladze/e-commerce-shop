import express, { Express, Request } from "express";
enum Permision {
  Admin = "admin",
  User = "user",
}
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
  permision?: string;
}

export interface Product {
  product_id: string;
  title: string;
  product_description: string;
  product_image: string;
  category: number;
  price: number;
  product_count: number;
  posted_by_user?: number;
  posted_by_shop?: number;
  is_blocked: boolean;
}

export interface Shop {
  shop_id: string;
  shop_name: string;
  shop_owner: number;
  category: number;
  is_blocked: boolean;
  budget: string;
  shop_image: string;
}
