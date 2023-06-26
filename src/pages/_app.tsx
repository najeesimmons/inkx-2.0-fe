import { HeaderMenu } from '@/components/HeaderMenu'
import { AppShell, Header, MantineProvider, Text, Group} from '@mantine/core'
import type { AppProps } from 'next/app'

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
  ]

  return (


  <MantineProvider>
  <AppShell 
  header={<HeaderMenu links={links}/>}

      >
   <Component {...pageProps} />
   </AppShell>
  </MantineProvider>)
}
