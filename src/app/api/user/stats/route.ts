import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Получаем статистику пользователя
    const [botsCount, activeBotsCount, totalMessages, totalContacts] = await Promise.all([
      // Всего ботов
      prisma.bot.count({
        where: { userId: session.user.id }
      }),
      // Активных ботов
      prisma.bot.count({
        where: { 
          userId: session.user.id,
          isActive: true
        }
      }),
      // Всего сообщений
      prisma.message.count({
        where: {
          bot: {
            userId: session.user.id
          }
        }
      }),
      // Всего контактов
      prisma.contact.count({
        where: {
          bot: {
            userId: session.user.id
          }
        }
      })
    ]);

    // Получаем план пользователя
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true }
    });

    return NextResponse.json({
      bots: {
        total: botsCount,
        active: activeBotsCount
      },
      messages: totalMessages,
      contacts: totalContacts,
      plan: user?.plan || 'FREE'
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}