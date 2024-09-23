'use client'
import localFont from "next/font/local";
import "./globals.css";
import Root from "./root";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] antialiased`}>
        <Provider store={store}>
          <AuthProvider>
            <Toaster />
          <Root children={children} />
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
