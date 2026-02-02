-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_provider_id_fkey";

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
