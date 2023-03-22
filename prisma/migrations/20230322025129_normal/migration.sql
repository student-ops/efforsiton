/*
  Warnings:

  - You are about to drop the `Sugestions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Sugestions";

-- CreateTable
CREATE TABLE "Suggestions" (
    "id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "belongs" TEXT NOT NULL,

    CONSTRAINT "Suggestions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Suggestions_task_id_key" ON "Suggestions"("task_id");

-- AddForeignKey
ALTER TABLE "Suggestions" ADD CONSTRAINT "Suggestions_belongs_fkey" FOREIGN KEY ("belongs") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
