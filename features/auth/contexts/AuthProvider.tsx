import { signOut, useSession } from 'next-auth/react'
import { createContext, useContext, useEffect, useState } from 'react'
import { getData } from '../../../utils/requests'
import { useLoader } from '../../../contexts/LoaderProvider'
import { getUserInfoUrl, urls } from '../../../data/custom-data/urls'
import { ADMIN, AGENT } from '../../../data/custom-data/constants'
import { useRouter } from 'next/router'

const AuthContext = createContext<any>(null)

export default function AuthProvider({ children }: any) {
    const router = useRouter()

    const { data: session, status }: any = useSession()
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isAgent, setIsAgent] = useState(false)
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()

    useEffect(() => {
        if (status === 'unauthenticated') {
            setIsLoaded(true)
            unauthenticateUser()
        } else if (status === 'authenticated') {
            setToken(session.authToken)
        }
    }, [status])

    useEffect(() => {
        if (token) {
            incrementLoaderCount()
            getData(getUserInfoUrl(session.user.type), token).then((res) => {
                if (session.user.type === ADMIN) {
                    setUser({ ...res?.user?.user, type: session.user.type })
                    setIsAdmin(true)
                } else if (session.user.type === AGENT) {
                    setUser({ ...res?.user.user, type: session.user.type })
                    setIsAgent(true)
                }
                setIsLoaded(true)
                decrementLoaderCount()
            })
        } else {
            unauthenticateUser()
        }
    }, [token])

    function unauthenticateUser() {
        setToken(null)
        setUser(null)
        setIsAdmin(false)
        setIsAgent(false)
    }

    async function logout() {
        incrementLoaderCount()
        await signOut({ redirect: false })
        unauthenticateUser()
        await router.replace(urls.auth.pages.login)
        decrementLoaderCount()
    }

    return (
        <AuthContext.Provider
            value={{
                isLoaded,
                token,
                setToken,
                user,
                setUser,
                isAdmin,
                isAgent,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
