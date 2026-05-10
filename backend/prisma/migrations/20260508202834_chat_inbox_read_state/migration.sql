-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "ChatReadState" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "roomName" TEXT NOT NULL,
    "lastReadChatId" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatReadState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatReadState_userName_roomName_key" ON "ChatReadState"("userName", "roomName");
