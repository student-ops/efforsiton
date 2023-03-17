/*
  Warnings:

  - You are about to drop the column `events` on the `Webhook` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Webhook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Webhook" DROP COLUMN "events",
DROP COLUMN "url";
