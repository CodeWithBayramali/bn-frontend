'use client';
import { useSession, signIn } from 'next-auth/react';

export default function Root({ children }) {
  const { data: session, status } = useSession();
  // Oturum durumunu kontrol et
  if (status === 'loading') {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-blue-600 text-xl'>Yükleniyor...</p> 
      </div>
    )// Yükleniyor durumu
  }

  if (!session) {
    // Oturum yoksa giriş sayfasına yönlendir
    signIn(); // Otomatik olarak giriş sayfasına yönlendir
    return null; // Render edilmeyecek
  }

  return (
    <>
      {children}
    </>
  );
}