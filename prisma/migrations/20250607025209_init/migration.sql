/*
  Warnings:

  - Added the required column `cu_m3` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `cu_m3` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` VARCHAR(191) NOT NULL,
    MODIFY `desc_app` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;
