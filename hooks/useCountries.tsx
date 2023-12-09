import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { axiosClient } from '../services/axiosClient'

export function useCountries() {
    const [countries, setCountries] = useState(null)

    useEffect(() => {
        fetchCountries()
    }, [])

    async function fetchCountries() {
        try {
            const response = await axiosClient.get(
                `https://countriesnow.space/api/v0.1/countries`
            )
            const data = response.data.data
            const temp: any = []
            data.forEach((country: any) => {
                temp[country.country] = country
            })
            setCountries(temp)
        } catch (error) {
            toast.error('An error occured.')
        }
    }

    return { countries }
}
