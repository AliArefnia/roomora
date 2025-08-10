import { inter } from "@/ui/fonts";
import "../styles/globals.css";
import { ReactQueryProvider } from "@/lib/react-query/provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
