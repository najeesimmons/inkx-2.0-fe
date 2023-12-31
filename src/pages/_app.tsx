import { HeaderMenu } from "@/components/HeaderMenu";
import { AppShell, MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const links = [
    {
      link: "/",
      label: "Home",
    },
    {
      link: "/artists",
      label: "Artists",
    },
    {
      link: "/tattoos",
      label: "Tattoos",
    },
  ];

  return (
    <MantineProvider>
      <AppShell maw={1100} m="0 auto" header={<HeaderMenu links={links} />}>
        <Component {...pageProps} />
      </AppShell>
    </MantineProvider>
  );
}
