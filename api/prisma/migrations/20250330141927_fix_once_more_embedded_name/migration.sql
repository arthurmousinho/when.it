/*
  Warnings:

  - The values [EMBBEDED] on the enum `document_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "document_status_new" AS ENUM ('UPLOADED', 'EMBEDDED');
ALTER TABLE "documents" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "documents" ALTER COLUMN "status" TYPE "document_status_new" USING ("status"::text::"document_status_new");
ALTER TYPE "document_status" RENAME TO "document_status_old";
ALTER TYPE "document_status_new" RENAME TO "document_status";
DROP TYPE "document_status_old";
ALTER TABLE "documents" ALTER COLUMN "status" SET DEFAULT 'UPLOADED';
COMMIT;
