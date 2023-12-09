import React, { useEffect } from 'react'
// import { useRouter } from 'next/router'
import { useRouter } from 'next/router'
import { urls } from '../../../data/custom-data/urls'
import { useAuth } from '../contexts/AuthProvider'

export default function RequireGuest({ children }: any) {
    const router = useRouter()
    const { isLoaded, token, user } = useAuth()

    useEffect(() => {
        if (user !== null) {
            if (user.type === 'admin') router.push(urls.admin.pages.homepage)
            else router.push(urls.agent.pages.homepage)
        }
    }, [user])

    if (!isLoaded || token !== null) {
        return null
    }

    return <>{children}</>
}
