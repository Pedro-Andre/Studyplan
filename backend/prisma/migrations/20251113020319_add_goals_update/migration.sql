/*
  Warnings:

  - Added the required column `estimatedTime` to the `Goals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Goals" ADD COLUMN     "estimatedTime" TIMESTAMP(3) NOT NULL;
