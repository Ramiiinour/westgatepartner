import { useEffect, useState } from 'react'
import { axiosClient } from '../services/axiosClient'
import { useLoader } from '../contexts/LoaderProvider'

export function useCurrentTime() {
    const [currentTime, setCurrentTime] = useState<any>()
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()

    useEffect(() => {
        incrementLoaderCount()
        fetchCurrentTime()
        decrementLoaderCount()
    }, [])

    async function fetchCurrentTime() {
        const response = await axiosClient('https://worldtimeapi.org/api/ip')
        setCurrentTime(response.data)
    }

    function getCurrentYear() {
        return parseInt(currentTime?.datetime.split('-')[0], 10)
    }

    function getCurrentMonth() {
        return parseInt(currentTime?.datetime.split('-')[1], 10)
    }

    return { currentYear: getCurrentYear(), currentMonth: getCurrentMonth() }
}
