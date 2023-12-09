import { useEffect, useState } from 'react'
import { urls } from '../../../data/custom-data/urls'
import { getData } from '../../../utils/requests'
import { useLoader } from '../../../contexts/LoaderProvider'
import { useAuth } from '../../auth/contexts/AuthProvider'

export function useDeveloper(developerId: any) {
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()
    const [developer, setDeveloper] = useState(null)
    const { token } = useAuth()

    useEffect(() => {
        if (developerId) {
            fetchArticle()
        }
    }, [developerId])

    async function fetchArticle() {
        incrementLoaderCount()
        const data = await getData(
            urls.admin.routes.developer.one(developerId),
            ''
        )
        setDeveloper(data?.data)
        decrementLoaderCount()
    }

    return { developer }
}
