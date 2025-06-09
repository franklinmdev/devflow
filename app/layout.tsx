import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

import { auth } from "@/auth";
import ThemeProvider from "@/context/theme";

import "./globals.css";
import "@/lib/dayjs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dev Overflow",
  description:
    "Dev Overflow is a community-driven platform to ask and answer real-world programming questions. Learn, grow, and connect with developers around the world.",

  generator: "Next.js",
  applicationName: "Dev Overflow",
  referrer: "origin-when-cross-origin",

  keywords: [
    "Dev Overflow",
    "programming questions",
    "developer Q&A",
    "web development",
    "JavaScript",
    "React",
    "Node.js",
    "algorithms",
    "data structures",
    "developer community",
  ],

  authors: [
    { name: "Franklin" },
    { name: "Dev Overflow Team", url: "https://devoverflow.dev/team" },
  ],
  creator: "Franklin",
  publisher: "Dev Overflow",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/images/site-logo.svg", // regular favicon
    shortcut: "/favicon.ico", // browser address bar icon
    apple: "/apple-touch-icon.png", // Apple devices
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },

  // Optional: Theme color for browser UI and mobile experience
  themeColor: "#18181b",
  // Optional: Color for Microsoft tiles and pinned sites
  other: {
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/mstile-150x150.png",
  },
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <SessionProvider session={session}>
        <body
          className={`${inter.className} ${spaceGrotesk.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster position="top-center" />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
