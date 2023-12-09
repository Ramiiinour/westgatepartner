import { useEffect } from 'react'
import { urls } from '../../../data/custom-data/urls'
import { useAuth } from '../contexts/AuthProvider'
import { useRouter } from 'next/router'

export default function RedirectHomePage() {
    const { isAdmin }: any = useAuth()
    const router = useRouter()

    useEffect(() => {
        const routeTo = isAdmin
            ? urls.admin.pages.properties.all
            : urls.agent.pages.properties.all

        router.push(routeTo)
    }, [])

    return null
}
