import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { urls } from '../../../data/custom-data/urls'
import { useAuth } from '../contexts/AuthProvider'

export default function RequireAuth({ children }: any) {
    const router = useRouter()
    const { isLoaded, token }: any = useAuth()

    useEffect(() => {
        if (isLoaded && token === null) {
            router.push(urls.auth.pages.login)
        }
    }, [isLoaded, token])

    if (!isLoaded || token === null) {
        return null
    }

    return <>{children}</>
}
