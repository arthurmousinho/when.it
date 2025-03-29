/*
  Warnings:

  - The values [EMPLOYEE] on the enum `member_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "member_role_new" AS ENUM ('MANAGER', 'MEMBER');
ALTER TABLE "invites" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "members" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "members" ALTER COLUMN "role" TYPE "member_role_new" USING ("role"::text::"member_role_new");
ALTER TABLE "invites" ALTER COLUMN "role" TYPE "member_role_new" USING ("role"::text::"member_role_new");
ALTER TYPE "member_role" RENAME TO "member_role_old";
ALTER TYPE "member_role_new" RENAME TO "member_role";
DROP TYPE "member_role_old";
ALTER TABLE "invites" ALTER COLUMN "role" SET DEFAULT 'MEMBER';
ALTER TABLE "members" ALTER COLUMN "role" SET DEFAULT 'MEMBER';
COMMIT;

-- AlterTable
ALTER TABLE "invites" ALTER COLUMN "role" SET DEFAULT 'MEMBER';

-- AlterTable
ALTER TABLE "members" ALTER COLUMN "role" SET DEFAULT 'MEMBER';
