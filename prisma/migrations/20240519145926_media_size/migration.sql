-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "size" BIGINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "expiresAt" SET DEFAULT CURRENT_TIMESTAMP + '02:00:00'::interval;

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "expiresAt" SET DEFAULT CURRENT_TIMESTAMP + '30 days'::interval;

-- CreateTable
CREATE TABLE "View" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,

    CONSTRAINT "View_pkey" PRIMARY KEY ("userId","mediaId")
);

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
