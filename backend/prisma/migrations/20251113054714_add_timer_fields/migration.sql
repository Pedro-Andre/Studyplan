/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Goals` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedTime` on the `Goals` table. All the data in the column will be lost.
  - Added the required column `remainingTime` to the `Goals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Goals" DROP COLUMN "createdAt",
DROP COLUMN "estimatedTime",
ADD COLUMN     "remainingTime" INTEGER NOT NULL,
ALTER COLUMN "finishBy" DROP NOT NULL;
