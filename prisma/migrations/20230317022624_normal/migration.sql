/*
  Warnings:

  - You are about to drop the column `belongsTo` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `belongsTo` on the `Webhook` table. All the data in the column will be lost.
  - You are about to drop the `Pushed` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `belongs` to the `Tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `belongs` to the `Webhook` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_belongsTo_fkey";

-- DropForeignKey
ALTER TABLE "Webhook" DROP CONSTRAINT "Webhook_belongsTo_fkey";

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "belongsTo",
ADD COLUMN     "belongs" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Webhook" DROP COLUMN "belongsTo",
ADD COLUMN     "belongs" TEXT NOT NULL;

-- DropTable
DROP TABLE "Pushed";

-- CreateTable
CREATE TABLE "Webhookpushed" (
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "belongs" TEXT NOT NULL,

    CONSTRAINT "Webhookpushed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_belongs_fkey" FOREIGN KEY ("belongs") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Webhook" ADD CONSTRAINT "Webhook_belongs_fkey" FOREIGN KEY ("belongs") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Webhookpushed" ADD CONSTRAINT "Webhookpushed_belongs_fkey" FOREIGN KEY ("belongs") REFERENCES "Webhook"("id") ON DELETE CASCADE ON UPDATE CASCADE;
