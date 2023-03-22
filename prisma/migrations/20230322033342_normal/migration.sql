/*
  Warnings:

  - You are about to drop the column `sugested` on the `Tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "sugested",
ADD COLUMN     "suggested" BOOLEAN NOT NULL DEFAULT false;
