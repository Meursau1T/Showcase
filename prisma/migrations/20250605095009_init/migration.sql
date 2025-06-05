/*
  Warnings:

  - Added the required column `types_en` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `types_en` JSON NOT NULL;
