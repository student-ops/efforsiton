/*
  Warnings:

  - A unique constraint covering the columns `[task_id]` on the table `Sugestions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `task_id` to the `Sugestions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sugestions" ADD COLUMN     "task_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Sugestions_task_id_key" ON "Sugestions"("task_id");
