-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DEFAULT extract(epoch from now())::int,
ALTER COLUMN "updatedAt" SET DEFAULT extract(epoch from now())::int;
