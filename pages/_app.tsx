import Layout from '../layout'
import '../public/assets/scss/admin.scss'
import { ToastContainer } from 'react-toastify'
import { SessionProvider } from 'next-auth/react'
import LoaderProvider from '../contexts/LoaderProvider'
import AuthProvider from '../features/auth/contexts/AuthProvider'
import { APP_TITLE } from '../data/custom-data/appData'
import Head from 'next/head'
import ThemeProvider from '../contexts/ThemeProvider'
import { Provider } from 'react-redux'
import { persistor, store } from '../store'
import { PersistGate } from 'redux-persist/integration/react'
import { QueryClient, QueryClientProvider } from 'react-query'

const appTitle = `${APP_TITLE} - Control Panel`

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
    const getLayout =
        Component.getLayout || ((page: any) => <Layout>{page}</Layout>)
    const client = new QueryClient()
    return (
        <>
            <Head>
                <title>{appTitle}</title>
            </Head>
            <Provider store={store}>
                <QueryClientProvider client={client}>
                    <PersistGate persistor={persistor}>
                        <SessionProvider session={session}>
                            <LoaderProvider>
                                <AuthProvider>
                                    <ThemeProvider>
                                        {getLayout(
                                            <Component {...pageProps} />
                                        )}
                                    </ThemeProvider>
                                </AuthProvider>
                            </LoaderProvider>
                        </SessionProvider>
                    </PersistGate>
                </QueryClientProvider>
            </Provider>

            <ToastContainer theme="light" />
        </>
    )
}

export default MyApp
