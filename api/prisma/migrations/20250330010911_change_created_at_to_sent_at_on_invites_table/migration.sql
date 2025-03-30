/*
  Warnings:

  - You are about to drop the column `created_at` on the `invites` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invites" DROP COLUMN "created_at",
ADD COLUMN     "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
