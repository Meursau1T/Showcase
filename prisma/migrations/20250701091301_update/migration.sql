/*
  Warnings:

  - Added the required column `desc_en` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desc_zh` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `desc_en` VARCHAR(191) NOT NULL,
    ADD COLUMN `desc_zh` VARCHAR(191) NOT NULL;
