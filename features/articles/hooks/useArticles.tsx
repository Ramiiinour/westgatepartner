import { useEffect, useState } from 'react'
import { useLoader } from '../../../contexts/LoaderProvider'
import { getData } from '../../../utils/requests'
import { appRoutes } from '../../../data/custom-data/appRoutes'

export function useArticles(page = 1) {
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()
    const [articles, setArticles] = useState(null)

    useEffect(() => {
        if (page <= 0) throw new Error('Page should be positive integer.')
        fetchArticles()
    }, [page])

    async function fetchArticles() {
        incrementLoaderCount()
        const data = await getData(appRoutes.articles.all({ page }), 'test4')
        setArticles(data?.data)
        decrementLoaderCount()
    }

    return {
        articles,
    }
}
