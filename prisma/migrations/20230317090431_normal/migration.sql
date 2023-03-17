/*
  Warnings:

  - You are about to drop the column `repo_name` on the `Webhook` table. All the data in the column will be lost.
  - Added the required column `repoName` to the `Webhook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Webhook" DROP COLUMN "repo_name",
ADD COLUMN     "repoName" TEXT NOT NULL;
