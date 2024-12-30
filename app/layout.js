import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import CreateEventDrawer from "@/components/create-event";

export const metadata = {
  title: {
    template: "%s | Calender",
    default: "Calender",
  },
  description: "Appointment Calender Application",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const currentYear = new Date().getFullYear();

  return (
    <ClerkProvider dynamic>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          {/* Animated Background */}
          <div className="animated-bg" />
          {/* Header */}
          <Header />
          <main className="min-h-screen">{children}</main>
          <footer className="bg-indigo-300 py-10 bg-opacity-10 gradient-background2 p-10">
            <div className="mx-auto px-4 text-center text-gray-200">
              <p> © {currentYear} CodeNow101. All Rights Reserved</p>
            </div>
          </footer>
          <CreateEventDrawer />
        </body>
      </html>
    </ClerkProvider>
  );
}
