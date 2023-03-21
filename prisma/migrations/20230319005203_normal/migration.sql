/*
  Warnings:

  - You are about to drop the column `checked` on the `WebhookCommit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[belongs]` on the table `Webhook` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "WebhookCommit" DROP COLUMN "checked";

-- CreateIndex
CREATE UNIQUE INDEX "Webhook_belongs_key" ON "Webhook"("belongs");
