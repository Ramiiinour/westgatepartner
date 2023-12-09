import { useEffect, useState } from 'react'
import { urls } from '../../../data/custom-data/urls'
import { getData } from '../../../utils/requests'
import { useLoader } from '../../../contexts/LoaderProvider'
import { useAuth } from '../../auth/contexts/AuthProvider'

export function useArticle(articleId: any) {
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()
    const [article, setArticle] = useState(null)
    const { token }: any = useAuth()

    useEffect(() => {
        if (articleId) {
            fetchArticle()
        }
    }, [articleId])

    async function fetchArticle() {
        incrementLoaderCount()
        const data = await getData(
            urls.admin.routes.articles.one(articleId),
            'this is a test'
        )
        setArticle(data.data)
        decrementLoaderCount()
    }

    return { article }
}
