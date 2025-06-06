/*
  Warnings:

  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `desc_app` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hlw` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `machine_model` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `manufacturer` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oem_no` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ref_no` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP PRIMARY KEY,
    ADD COLUMN `desc_app` JSON NOT NULL,
    ADD COLUMN `hlw` VARCHAR(191) NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL,
    ADD COLUMN `machine_model` JSON NOT NULL,
    ADD COLUMN `manufacturer` JSON NOT NULL,
    ADD COLUMN `oem_no` JSON NOT NULL,
    ADD COLUMN `ref_no` JSON NOT NULL,
    ADD PRIMARY KEY (`id`);
