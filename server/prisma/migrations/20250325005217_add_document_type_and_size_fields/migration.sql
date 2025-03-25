/*
  Warnings:

  - Added the required column `fileSize` to the `documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileType` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "document_type" AS ENUM ('PDF');

-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "fileSize" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fileType" "document_type" NOT NULL;
