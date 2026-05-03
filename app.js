const express = require("express");
const app = express();
const mysql = require("mysql2");
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Berhasil Terhubung Bos!");
  })
  .catch((err) => {
    console.log("Database Gagal Terhubung Bos!", err.message);
  });

// Models
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(10),
      defaultValue: "user",
    },
    avatar: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descriptiom: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "categories",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descriptiom: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_path: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    venue: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    event_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    event_end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    max_attendess: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    available_ticket: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "events",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "paid", "canceled", "expired"),
      defaultValue: "pending",
    },
    xendit_invoice_id: {
      type: DataTypes.STRING(255),
    },
    xendit_payment_url: {
      type: DataTypes.TEXT,
    },
    xendit_expired_date: {
      type: DataTypes.DATE,
    },
    external_id: {
      type: DataTypes.STRING(255),
    },
  },
  {
    tableName: "orders",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

const Ticket = sequelize.define(
  "Ticket",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ticket_code: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    barcode_data: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    attended_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    attended_email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    attended_phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    is_attended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    attended_at: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "tickets",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

const Attachement = sequelize.define(
  "Attachement",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    file_path: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    file_type: {
      type: DataTypes.ENUM("image", "document"),
      defaultValue: "image",
    },
  },
  {
    tableName: "attachement",
    timestamps: true,
    createdAt: "created_at",
  },
);
