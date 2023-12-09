import { useEffect, useState } from 'react'
import { urls } from '../../../data/custom-data/urls'
import { getData, postData } from '../../../utils/requests'
import { useLoader } from '../../../contexts/LoaderProvider'
import { useAuth } from '../../auth/contexts/AuthProvider'
import { toast } from 'react-toastify'

export function usePropertyOfTheDay() {
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()
    const { token } = useAuth()
    const [propertyOfTheDay, setPropertyOfTheDay] = useState(null)

    useEffect(() => {
        fetchPropertyOfTheDay()
    }, [])

    async function fetchPropertyOfTheDay() {
        incrementLoaderCount()
        const data = await getData(
            urls.common.routes.properties.propertyOfTheDay,
            ''
        )
        setPropertyOfTheDay(data?.property)
        decrementLoaderCount()
    }

    async function togglePropertyOfTheDay(property: any) {
        incrementLoaderCount()
        const data = await postData(
            urls.common.routes.properties.setIsPropertyOfTheDay(property.id),
            { isPropertyOfTheDay: !property.isPropertyOfTheDay },
            token
        )
        if (data.data) {
            if (property.isPropertyOfTheDay) {
                toast.success('Property removed as the property of the day.')
                setPropertyOfTheDay(null)
            } else {
                toast.success('Property is now the property of the day.')
                setPropertyOfTheDay(property)
            }
        }
        decrementLoaderCount()
    }

    return { propertyOfTheDay, togglePropertyOfTheDay }
}
