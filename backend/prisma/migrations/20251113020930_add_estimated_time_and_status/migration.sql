/*
  Warnings:

  - The `estimatedTime` column on the `Goals` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Goals" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Não Iniciado',
DROP COLUMN "estimatedTime",
ADD COLUMN     "estimatedTime" INTEGER DEFAULT 0;
