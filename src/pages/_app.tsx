import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import AppNavBar from '../components/AppNavBar'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Router } from 'next/router'
import ProgressBar from '@badrap/bar-of-progress'
import { Provider } from 'next-auth/client'
import { Footer, Title } from '@/components'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

const progress = new ProgressBar({
  size: 2,
  color: 'rgb(79, 70, 229)',
  className: 'bar-of-progress',
  delay: 100,
})

// this fixes safari jumping to the bottom of the page
// when closing the search modal using the `esc` key
if (typeof window !== 'undefined') {
  progress.start()
  progress.finish()
}

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', () => {
  progress.finish()
})
Router.events.on('routeChangeError', progress.finish)

function MyApp({ Component, pageProps }: any) {
  const meta = Component.layoutProps?.meta || {}
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider session={pageProps.session}>
          <Title>{meta.metaTitle || meta.title}</Title>
          <div className="flex flex-col min-h-screen">
            <AppNavBar />
            <Toaster />
            <div className="flex-1">
              <Component {...pageProps} />
            </div>
            <Footer />
          </div>
          {process.env.NODE_ENV !== 'production' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </Provider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
