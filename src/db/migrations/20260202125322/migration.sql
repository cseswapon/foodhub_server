/*
  Warnings:

  - You are about to drop the column `provider_id` on the `orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_provider_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "provider_id";
