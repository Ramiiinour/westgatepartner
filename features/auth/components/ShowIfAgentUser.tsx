import React from 'react'
import { useAuth } from '../contexts/AuthProvider'

export default function ShowIfAgentUser({ children }: any) {
    const { isAgent }: any = useAuth()

    if (!isAgent) {
        return null
    }

    return <>{children}</>
}
