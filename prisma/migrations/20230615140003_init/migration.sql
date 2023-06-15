-- AlterTable
ALTER TABLE "User" ADD COLUMN     "assessSent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "waitlistSent" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "assessed" SET DEFAULT false;
