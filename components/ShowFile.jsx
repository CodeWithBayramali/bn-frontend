import { getSession } from 'next-auth/react';
import React from 'react';
import { ImCancelCircle } from "react-icons/im";

export default function ShowFile({ fileUrl,setDocUrl }) {
  const [fileSrc, setFileSrc] = React.useState(null);
  console.log(fileUrl)
  React.useEffect(() => {
    const fetchFile = async () => {
      const session = await getSession(); // JWT Token'ı oturumdan al
      const token = session?.accessToken; // Eğer token mevcutsa
      
      try {
        // Proxy API üzerinden dosya URL'sini oluştur
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOCUMENT_URL}${fileUrl}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.ok) {
          const blob = await response.blob(); // Dosyayı blob olarak al
          const fileSrc = URL.createObjectURL(blob); // Tarayıcıda gösterilecek URL'yi oluştur
          setFileSrc(fileSrc); // Dosya kaynağını ayarla
        } else {
          console.error("Dosya yüklenemedi");
        }
      } catch (error) {
        console.error("Dosya yüklenemedi:", error);
      }
    };

    fetchFile();
  }, [fileUrl]);
  if (!fileSrc && open) return (
    <div className={`${open ? 'fixed z-50 inset-0 flex flex-col items-center justify-center backdrop-blur-sm bg-black bg-opacity-75':'hidden'}`}>
      <ImCancelCircle className='absolute right-4 top-4 text-red-600 cursor-pointer' onClick={()=> setDocUrl(null)} size={24} />
    <div>
      <p>Dosya Yükleniyor</p>
    </div>
    </div>
  )

  // PDF, image, ya da başka bir dosyayı iframe içinde gösterebiliriz
  return (
    <div className={`${open ? 'fixed z-50 inset-0 w-full flex flex-col items-center justify-center backdrop-blur-sm bg-black bg-opacity-75':'hidden'}`}>
      <ImCancelCircle className='absolute right-12 top-16 text-red-600 cursor-pointer' onClick={()=> setDocUrl(null)} size={24} />
    <div>
      <iframe src={fileSrc} className='w-screen h-screen'></iframe>
    </div>
    </div>
  );
}