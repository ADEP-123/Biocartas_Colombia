-- CreateIndex
CREATE INDEX "questions_speciesId_idx" ON "public"."questions"("speciesId");

-- CreateIndex
CREATE INDEX "species_group_idx" ON "public"."species"("group");
