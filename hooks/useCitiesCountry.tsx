import { useEffect, useState } from 'react'
import { urls } from '../data/custom-data/urls'
import { getData } from '../utils/requests'
import { axiosClient } from '../services/axiosClient'

export function useCitiesCountry(countryId: any) {
    const [cities, setCities] = useState([])

    useEffect(() => {
        fetchCitiesCountry(countryId)
    }, [countryId])

    async function fetchCitiesCountry(countryId: any) {
        const response = await getData(urls.city.getAll(countryId), '')
        setCities(response?.data)
    }

    return { cities }
}
