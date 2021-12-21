import { Schema, model } from "mongoose";

interface UserInterface {
  _id?: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
  address: string;
  email: string;
  password: string;
  card: string;
  cardPassword: string;
  isBlocked: boolean;
  budget: number;
  personImage: string;
  ipAddress: string;
  browser: string;
  os: string;
  createdAt?: string;
  updatedAt?: string;
}

const userSchema = new Schema<UserInterface>(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 10,
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 10,
      lowercase: true,
      trim: true,
    },
    birthDate: {
      type: String,
      required: true,
      length: 10,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      maxlength: 20,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 16,
      maxlength: 100,
    },
    card: {
      type: String,
      required: true,
      length: 10,
    },
    cardPassword: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 16,
    },
    isBlocked: {
      type: Boolean,
      required: true,
      default: false,
    },
    budget: {
      type: Number,
      required: true,
      default: 100,
    },
    personImage: {
      type: String,
      required: true,
      default: "str",
    },
    ipAddress: {
      type: String,
      required: true,
    },
    browser: {
      type: String,
      required: true,
    },
    os: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model<UserInterface>("User", userSchema);
module.exports = { User };
