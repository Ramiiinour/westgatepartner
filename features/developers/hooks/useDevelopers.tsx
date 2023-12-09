import { useEffect, useState } from 'react'
import { useLoader } from '../../../contexts/LoaderProvider'
import { getData } from '../../../utils/requests'
import { appRoutes } from '../../../data/custom-data/appRoutes'

export function useDevelopers(page = 1) {
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()
    const [developers, setDevelopers] = useState(null)

    useEffect(() => {
        if (page <= 0) throw new Error('Page should be positive integer.')
        fetchArticles()
    }, [page])

    async function fetchArticles() {
        incrementLoaderCount()
        const data = await getData(appRoutes.developers.all({ page }), '')
        setDevelopers(data?.data)
        decrementLoaderCount()
    }

    return {
        developers,
    }
}
