import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Проверяем, авторизован ли пользователь
  const session = await getServerSession(authOptions);

  // Если авторизован, перенаправляем на дашборд
  if (session) {
    redirect('/dashboard');
  }

  return <>{children}</>;
}