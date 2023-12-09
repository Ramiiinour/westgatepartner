import { useEffect, useState } from 'react'
import { urls } from '../../../data/custom-data/urls'
import { getData } from '../../../utils/requests'
import { useLoader } from '../../../contexts/LoaderProvider'

export function useProperty(propertyId: any, status = 1) {
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()
    const [property, setProperty] = useState(null)

    useEffect(() => {
        if (propertyId) {
            fetchProperty()
        }
    }, [propertyId])

    async function fetchProperty() {
        incrementLoaderCount()
        const data = await getData(
            status == 1
                ? urls.common.routes.properties.one(propertyId)
                : urls.common.routes.drafts.properties.one(propertyId),
            ''
        )
        setProperty(data?.property)
        decrementLoaderCount()
    }

    return { property }
}
