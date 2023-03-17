-- AlterTable
ALTER TABLE "Projects" ALTER COLUMN "linked" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Sugestions" (
    "id" TEXT NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Sugestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Webhook" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "events" TEXT[],
    "belongsTo" TEXT NOT NULL,

    CONSTRAINT "Webhook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pushed" (
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Pushed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Webhook" ADD CONSTRAINT "Webhook_belongsTo_fkey" FOREIGN KEY ("belongsTo") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
