/*
  Warnings:

  - Added the required column `meal_id` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "meal_id" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
