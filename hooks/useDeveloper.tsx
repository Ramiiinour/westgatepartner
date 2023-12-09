import { useEffect, useState } from 'react'
import { urls } from '../data/custom-data/urls'
import { getData } from '../utils/requests'
import { axiosClient } from '../services/axiosClient'

export function useDeveloper() {
    const [developers, setDeveloper] = useState([])

    useEffect(() => {
        fetchDeveloperCountry()
    }, [])

    async function fetchDeveloperCountry() {
        const response = await getData(urls.developer.getNames, 'test100')
        setDeveloper(response?.data)
    }

    return { developers }
}
