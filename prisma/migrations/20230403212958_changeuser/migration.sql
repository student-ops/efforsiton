/*
  Warnings:

  - You are about to drop the column `gettingstartedid` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "gettingstartedid";

-- CreateTable
CREATE TABLE "Playground" (
    "id" TEXT NOT NULL,
    "projectid" TEXT,
    "belongs" TEXT NOT NULL,

    CONSTRAINT "Playground_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Playground" ADD CONSTRAINT "Playground_belongs_fkey" FOREIGN KEY ("belongs") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
