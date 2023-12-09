import { useEffect, useState } from 'react'
import { axiosClient } from '../../../services/axiosClient'
import { urls } from '../../../data/custom-data/urls'
import { useAuth } from '../../auth/contexts/AuthProvider'
import { getData } from '../../../utils/requests'

export function usePropertiesTypes() {
    const [propertiesTypes, setPropertiesTypes] = useState(null)

    useEffect(() => {
        fetchPropertiesTypes()
    }, [])

    async function fetchPropertiesTypes() {
        const response = await getData(
            urls.common.routes.properties.propertiesTypes.all,
            ''
        )
        setPropertiesTypes(response.propertyTypes)
    }

    return { propertiesTypes }
}
