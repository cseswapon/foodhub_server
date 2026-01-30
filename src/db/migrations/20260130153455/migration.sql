/*
  Warnings:

  - You are about to alter the column `rating` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(10,1)`.

*/
-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "rating" SET DATA TYPE DECIMAL(10,1);
