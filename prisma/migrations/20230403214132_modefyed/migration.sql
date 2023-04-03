/*
  Warnings:

  - A unique constraint covering the columns `[belongs]` on the table `Playground` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Playground_belongs_key" ON "Playground"("belongs");
