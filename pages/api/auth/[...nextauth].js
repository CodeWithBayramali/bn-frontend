import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { cookies } from 'next/headers';

export const authOptions = {
  logger:false,
  debug:false,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          // Axios ile POST isteği, giriş bilgilerini backend'e gönderiyoruz
          const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/authenticate`, {
            email: credentials.username,
            hashedPassword: credentials.password
          });

          // Backend'den TokenResponse yapısına uygun şekilde accessToken alıyoruz
          const tokenResponse = res.data; // Beklenen response: { accessToken: "..." }
          
          // Eğer istek başarılıysa ve accessToken varsa kullanıcıyı döndür
          if (res.status === 200 && tokenResponse.accessToken) {
            // NextAuth, kullanıcı objesi olarak herhangi bir veri alabilir. accessToken döndürüyoruz.
            return { accessToken: tokenResponse.accessToken };
          }

          // Eğer token yoksa, giriş başarısız
          return null;
        } catch (error) {
          // Hata durumunda null döndür
          console.error("Login error:", error.response?.data || error.message);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Eğer kullanıcı oturumu açıldıysa (JWT oluşturulduysa)
      if (user) {
        // Spring Boot'tan dönen accessToken'ı JWT token'ına ekliyoruz
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      // Session'da accessToken'ı kullanabilir hale getiriyoruz
      session.accessToken = token.accessToken;
      return session;
    }
  },
  pages: {
    signin: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    jwt: true,
  },
  jwt: {
    encryption: false,
    async encode({ token }) {
      return token.accessToken; // Sadece accessToken'ı döndür
    },
    async decode({ token }) {
      return { accessToken: token }; // Sadece accessToken'ı çözümle
    },
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: false, // HTTP-Only özelliğini devre dışı bırak
        secure: process.env.NODE_ENV === 'production', // Sadece üretim ortamında güvenli çerez
        sameSite: 'lax', // CSRF koruma için
        path: '/', // Çerezin kullanılacağı yol
      },
    },
  },
}

export default NextAuth(authOptions);