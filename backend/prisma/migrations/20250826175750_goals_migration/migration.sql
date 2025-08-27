/*
  Warnings:

  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Goals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "priority" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishBy" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Goals_pkey" PRIMARY KEY ("id")
);
