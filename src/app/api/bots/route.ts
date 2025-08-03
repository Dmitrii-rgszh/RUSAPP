import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createBotSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  platform: z.enum(['telegram', 'whatsapp', 'vk', 'webchat']),
});

// GET /api/bots - Получить список ботов пользователя
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const bots = await prisma.bot.findMany({
      where: { userId: session.user.id },
      include: {
        _count: {
          select: {
            messages: true,
            contacts: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(bots);
  } catch (error) {
    console.error("Error fetching bots:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/bots - Создать нового бота
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    
    // Валидация данных
    const result = createBotSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    // Проверка лимитов плана пользователя
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        _count: {
          select: { bots: true }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Лимиты по планам
    const planLimits = {
      FREE: 1,
      STARTER: 3,
      BUSINESS: 10,
      SCALE: 50
    };

    const limit = planLimits[user.plan];
    if (user._count.bots >= limit) {
      return NextResponse.json(
        { error: `Достигнут лимит ботов для плана ${user.plan} (максимум ${limit})` },
        { status: 403 }
      );
    }

    // Создание бота
    const bot = await prisma.bot.create({
      data: {
        name: result.data.name,
        description: result.data.description,
        platform: result.data.platform.toUpperCase() as any,
        userId: session.user.id,
        // Создаем начальный flow
        flows: {
          create: {
            name: "Main Flow",
            nodes: [
              {
                id: '1',
                type: 'message',
                position: { x: 250, y: 50 },
                data: {
                  text: 'Привет! Я ваш новый бот. Настройте меня под свои задачи.',
                  messageType: 'text'
                }
              }
            ],
            edges: []
          }
        }
      },
      include: {
        flows: true
      }
    });

    return NextResponse.json(bot, { status: 201 });
  } catch (error) {
    console.error("Error creating bot:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}