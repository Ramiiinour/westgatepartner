import React, { useEffect } from 'react'
import { urls } from '../../../data/custom-data/urls'
import { useAuth } from '../contexts/AuthProvider'
import { useRouter } from 'next/router'

export default function RequireAgent({ children }: any) {
    const { isAgent }: any = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isAgent) {
            router.push(urls.admin.pages.homepage)
        }
    }, [isAgent])

    if (!isAgent) {
        return null
    }

    return <>{children}</>
}
