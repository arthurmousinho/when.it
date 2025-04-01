-- CreateEnum
CREATE TYPE "invite_status" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "invites" ADD COLUMN     "status" "invite_status" NOT NULL DEFAULT 'PENDING';
