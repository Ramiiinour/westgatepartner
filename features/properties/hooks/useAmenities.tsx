import { useEffect, useState } from 'react'
import { axiosClient } from '../../../services/axiosClient'
import { urls } from '../../../data/custom-data/urls'
import { getData } from '../../../utils/requests'

export function useAmenities() {
    const [amenities, setAmenities] = useState(null)

    useEffect(() => {
        fetchAmenities()
    }, [])

    async function fetchAmenities() {
        const response = await getData(
            urls.common.routes.properties.amenities.all,
            'test100'
        )
        setAmenities(response.Amenities)
    }

    return { amenities }
}
