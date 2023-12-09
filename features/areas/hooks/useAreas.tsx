import { useEffect, useState } from 'react'
import { useLoader } from '../../../contexts/LoaderProvider'
import { getData } from '../../../utils/requests'
import { appRoutes } from '../../../data/custom-data/appRoutes'

export function useAreas(page = 1) {
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()
    const [areas, setAreas] = useState(null)

    useEffect(() => {
        if (page <= 0) throw new Error('Page should be positive integer.')
        fetchAreas()
    }, [page])

    async function fetchAreas() {
        incrementLoaderCount()
        const data = await getData(appRoutes.areas.all({ page }), 'Areas')
        setAreas(data?.data)
        decrementLoaderCount()
    }

    return {
        areas,
    }
}
