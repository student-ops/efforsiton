/*
  Warnings:

  - You are about to drop the `Suggestions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Suggestions" DROP CONSTRAINT "Suggestions_belongs_fkey";

-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "sugested" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Suggestions";
