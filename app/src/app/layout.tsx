import Main from "@/components/main/Main";
import Toast from "@/ui/Toast";
import WalletProvider from "@/components/wallet/WalletProvider";
import "@/styles/globals.css";
import { Work_Sans } from "@next/font/google";

const workSans = Work_Sans({
  weight: "variable",
  fallback: ["sans-serif"],
  subsets: ["latin", "latin-ext", "vietnamese"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={workSans.className}>
      <head />
      <body>
        <WalletProvider>
          <Main>{children}</Main>
        </WalletProvider>
        <Toast />
      </body>
    </html>
  );
}
