-- CreateEnum
CREATE TYPE "public"."TaxonomicGroup" AS ENUM ('AVES', 'MAMIFEROS', 'REPTILES', 'ANFIBIOS', 'PECES', 'INSECTOS');

-- CreateEnum
CREATE TYPE "public"."ConservationStatus" AS ENUM ('LC', 'NT', 'VU', 'EN', 'CR');

-- CreateTable
CREATE TABLE "public"."species" (
    "id" TEXT NOT NULL,
    "commonName" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "group" "public"."TaxonomicGroup" NOT NULL,
    "habitat" TEXT NOT NULL,
    "diet" TEXT NOT NULL,
    "avgSizeCm" DOUBLE PRECISION,
    "avgWeightKg" DOUBLE PRECISION,
    "conservationStatus" "public"."ConservationStatus" NOT NULL,
    "speed" INTEGER NOT NULL,
    "camouflage" INTEGER NOT NULL,
    "resistance" INTEGER NOT NULL,
    "adaptability" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."questions" (
    "id" TEXT NOT NULL,
    "speciesId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "options" TEXT[],
    "correctOptionIndex" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_cards" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "speciesId" TEXT NOT NULL,
    "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "species_scientificName_key" ON "public"."species"("scientificName");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_cards_userId_speciesId_key" ON "public"."user_cards"("userId", "speciesId");

-- AddForeignKey
ALTER TABLE "public"."questions" ADD CONSTRAINT "questions_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "public"."species"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_cards" ADD CONSTRAINT "user_cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_cards" ADD CONSTRAINT "user_cards_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "public"."species"("id") ON DELETE CASCADE ON UPDATE CASCADE;
