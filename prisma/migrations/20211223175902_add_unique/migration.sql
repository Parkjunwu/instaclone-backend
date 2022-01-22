/*
  Warnings:

  - A unique constraint covering the columns `[hashTag]` on the table `HashTag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "HashTag_hashTag_key" ON "HashTag"("hashTag");
