// app/(protected)/layout.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({  // ← Add 'async' here
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();  // ← Await it!
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/'); // Server-side redirect — unbreakable
  }

  return <>{children}</>;
}