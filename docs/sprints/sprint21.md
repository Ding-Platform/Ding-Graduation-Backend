# Sprint 21 - Marketplace Escrow Orders

## Summary
Sprint 21 introduced a full escrow-driven `Order` lifecycle for marketplace purchases while preserving `Transaction` as the payment ledger for backward compatibility.

## Delivered Scope
- Added `Order` model with escrow, shipment, delivery, dispute, and release scheduling fields.
- Added `OrderStatus` and `EscrowStatus` enums.
- Kept `Transaction` model and linked each transaction to an order via optional `orderId`.
- Added delayed release queue (`order-release`) with 3-day fixed hold.
- Added buyer/seller/admin order APIs.
- Kept legacy deal endpoint compatibility for one sprint.
- Added backfill migration for legacy `PENDING` transactions only.

## API Highlights
- Buyer:
  - `GET /marketplace/orders`
  - `GET /marketplace/orders/:id`
  - `POST /marketplace/orders/:id/confirm-delivery`
  - `POST /marketplace/orders/:id/cancel`
  - `POST /marketplace/orders/:id/dispute`
- Seller:
  - `GET /marketplace/seller/orders`
  - `GET /marketplace/seller/orders/:id`
  - `POST /marketplace/seller/orders/:id/confirm-shipment`
- Admin:
  - `GET /marketplace/admin/orders`
  - `GET /marketplace/admin/orders/:id`
  - `POST /marketplace/admin/orders/:id/resolve-dispute`
  - `POST /marketplace/admin/orders/:id/force-release`
  - `POST /marketplace/admin/orders/:id/force-refund`

## Compatibility Window
- Legacy route `POST /marketplace/admin/deals/:transactionId/cancel` is retained and mapped to escrow-aware behavior when the transaction is linked to an order.

## Migration Notes
- Backfills orders from legacy transactions where `status='PENDING'`.
- Backfilled rows are created as `PLACED` with `HELD` escrow.
- Deterministic IDs/order numbers are generated for backfilled rows.

## Related Docs
- `docs/plans/E2E-Order-Plan.md`
- `docs/sprints/sprint21-order-implementation-report.md`
