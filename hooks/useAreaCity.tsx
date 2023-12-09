import { useEffect, useState } from 'react'
import { urls } from '../data/custom-data/urls'
import { getData } from '../utils/requests'
import { axiosClient } from '../services/axiosClient'

export function useAreaCity(cityId: any) {
    const [areas, setAreas] = useState([])

    useEffect(() => {
        fetchAres(cityId)
    }, [cityId])

    async function fetchAres(cityId: any) {
        const response = await getData(urls.area.getAll(cityId), '')
        setAreas(response?.data)
    }

    return { areas }
}
