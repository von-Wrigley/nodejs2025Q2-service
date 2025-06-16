/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DEFAULT extract(epoch from now())::int,
ALTER COLUMN "updatedAt" SET DEFAULT extract(epoch from now())::int;

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");
