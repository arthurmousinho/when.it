/*
  Warnings:

  - You are about to drop the column `domain` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the column `manager_id` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the `employees` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "member_role" AS ENUM ('MANAGER', 'EMPLOYEE');

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_manager_id_fkey";

-- DropIndex
DROP INDEX "organizations_domain_key";

-- DropIndex
DROP INDEX "organizations_manager_id_key";

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "domain",
DROP COLUMN "manager_id";

-- DropTable
DROP TABLE "employees";

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "role" "member_role" NOT NULL DEFAULT 'EMPLOYEE',
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
