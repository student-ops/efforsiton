/*
  Warnings:

  - You are about to drop the column `linked` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Webhookpushed` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Webhookpushed` table. All the data in the column will be lost.
  - Added the required column `owner` to the `Webhook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repo_name` to the `Webhook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `after_sha` to the `Webhookpushed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Webhookpushed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "linked";

-- AlterTable
ALTER TABLE "Webhook" ADD COLUMN     "owner" TEXT NOT NULL,
ADD COLUMN     "repo_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Webhookpushed" DROP COLUMN "createdAt",
DROP COLUMN "data",
ADD COLUMN     "after_sha" TEXT NOT NULL,
ADD COLUMN     "timestamp" TEXT NOT NULL;
