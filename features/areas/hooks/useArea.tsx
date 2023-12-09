import { useEffect, useState } from 'react'
import { urls } from '../../../data/custom-data/urls'
import { getData } from '../../../utils/requests'
import { useLoader } from '../../../contexts/LoaderProvider'
import { useAuth } from '../../auth/contexts/AuthProvider'

export function useArea(areaId: any) {
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()
    const [area, setArea] = useState(null)
    const { token }: any = useAuth()

    useEffect(() => {
        if (areaId) {
            fetchArea()
        }
    }, [areaId])

    async function fetchArea() {
        incrementLoaderCount()
        const data = await getData(urls.admin.routes.area.one(areaId), token)
        setArea(data?.data)
        decrementLoaderCount()
    }

    return { area }
}
