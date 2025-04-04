/*
  Warnings:

  - A unique constraint covering the columns `[userId,organizationId]` on the table `members` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "message_author_type" AS ENUM ('MEMBER', 'AI');

-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "authorType" "message_author_type" NOT NULL DEFAULT 'MEMBER';

-- CreateIndex
CREATE UNIQUE INDEX "members_userId_organizationId_key" ON "members"("userId", "organizationId");
