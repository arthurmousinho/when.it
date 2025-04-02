/*
  Warnings:

  - The values [REJECTED] on the enum `invite_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "invite_status_new" AS ENUM ('PENDING', 'ACCEPTED');
ALTER TABLE "invites" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "invites" ALTER COLUMN "status" TYPE "invite_status_new" USING ("status"::text::"invite_status_new");
ALTER TYPE "invite_status" RENAME TO "invite_status_old";
ALTER TYPE "invite_status_new" RENAME TO "invite_status";
DROP TYPE "invite_status_old";
ALTER TABLE "invites" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
