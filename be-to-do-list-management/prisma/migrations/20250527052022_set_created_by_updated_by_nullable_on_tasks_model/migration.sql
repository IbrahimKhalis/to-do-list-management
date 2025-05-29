/*
  Warnings:

  - Made the column `created_at` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_deleted` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "deleted_at" DROP DEFAULT,
ALTER COLUMN "is_deleted" SET NOT NULL;
