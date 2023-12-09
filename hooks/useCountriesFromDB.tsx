import { useEffect, useState } from 'react'
import { urls } from '../data/custom-data/urls'
import { getData } from '../utils/requests'
import { axiosClient } from '../services/axiosClient'

export function useCountriesFromDB() {
    const [countriesDB, setCountriesDB] = useState([])

    useEffect(() => {
        fetchCountriesFromDB()
    }, [])

    async function fetchCountriesFromDB() {
        const response = await getData(urls.country.getAll, '')
        setCountriesDB(response?.data)
    }

    return { countriesDB }
}
