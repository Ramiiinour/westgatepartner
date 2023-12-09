import React, { useEffect } from 'react'
import { urls } from '../../../data/custom-data/urls'
import { useAuth } from '../contexts/AuthProvider'
import { useRouter } from 'next/router'

export default function RequireAdmin({ children }: any) {
    const { isAdmin }: any = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isAdmin) {
            router.push(urls.agent.pages.homepage)
        }
    }, [isAdmin])

    if (!isAdmin) {
        return null
    }

    return <>{children}</>
}
