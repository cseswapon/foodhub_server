/*
  Warnings:

  - A unique constraint covering the columns `[restaurant_name]` on the table `providers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "providers_restaurant_name_key" ON "providers"("restaurant_name");
