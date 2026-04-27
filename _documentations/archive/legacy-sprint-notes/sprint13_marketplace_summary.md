# Sprint 13: Marketplace Foundation

## Overview

Implemented the backend foundation for Ding Marketplace.

## Features

### 1. Database Schema

- **Category**: Supports hierarchical product organization (Name, Slug, Icon).
- **Product**: Tracks item details, price, status (ACTIVE/SOLD), and seller.
- **Transaction**: Records purchases between Buyer and Seller.

### 2. Marketplace Module (`src/modules/marketplace`)

- **ProductController**:
  - `POST /marketplace/products`: Create a product listing.
  - `GET /marketplace/products`: List products (supports filtering by category/search).
  - `GET /marketplace/products/:id`: Get product details.
  - `POST /marketplace/products/:id/buy`: Initiate purchase transaction.
- **ProductService**:
  - Handles CRUD operations.
  - Implements atomic purchase transaction (Create Transaction + Mark Product SOLD).

## Verification

- `_test/verify-marketplace.js`: Script to create a product, list it, and simulate a purchase.

## Next Steps

- **Sprint 14**: Payments Integration (Stripe/PayPal) - currently purchases are mock.
