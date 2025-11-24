-- DropForeignKey
ALTER TABLE "public"."Goals" DROP CONSTRAINT "Goals_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Goals" ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Não Iniciado',
ADD COLUMN     "totalTime" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."time_sessions" (
    "id" TEXT NOT NULL,
    "goalId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "duration" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "time_sessions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Goals" ADD CONSTRAINT "Goals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."time_sessions" ADD CONSTRAINT "time_sessions_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "public"."Goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
