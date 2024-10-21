import type { Metadata } from "next";
import { Roboto} from 'next/font/google'
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { ModeToggle } from "../components/toggle-btn";

<script src = "https://telegram.org/js/telegram-web-app.js" defer></script>


const roboto = Roboto({
  weight:["100","300","400",'500','900'],
  subsets:['latin']
})


export const metadata: Metadata = {
  title: "Teracoin",
  description: "Teracoin bot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
     
    <html lang="en" suppressHydrationWarning>
      <head>

  </head>
      <body
        className={`${roboto.className} antialiased`}
      >
            <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ModeToggle/>    
        {children}
        </ThemeProvider>
      </body>
    </html>
  
  );
}
