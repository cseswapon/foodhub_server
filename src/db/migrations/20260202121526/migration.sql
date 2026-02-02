/*
  Warnings:

  - You are about to drop the column `provider_id` on the `meals` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_provider_id_fkey";

-- AlterTable
ALTER TABLE "meals" DROP COLUMN "provider_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
