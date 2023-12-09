import { useEffect, useState } from 'react'
import { useLoader } from '../../../contexts/LoaderProvider'
import { useAuth } from '../../auth/contexts/AuthProvider'
import { getData } from '../../../utils/requests'
import { appRoutes } from '../../../data/custom-data/appRoutes'

export function useProperties(page = 1, sortBy = 'desc', status = 1) {
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()
    const [properties, setProperties] = useState(null)
    const { user, isAdmin } = useAuth()

    useEffect(() => {}, [])

    useEffect(() => {
        if (page <= 0) throw new Error('Page should be positive integer.')
        if (isAdmin !== undefined) {
            fetchProperties()
        }
    }, [page, isAdmin])

    async function fetchProperties() {
        incrementLoaderCount()
        const propertiesUrl = isAdmin
            ? appRoutes.properties.all({ page })
            : status == 1
            ? appRoutes.properties.allForAgent({
                  agentId: user.id,
                  page,
                  sortBy,
              })
            : appRoutes.drafts.properties.allForAgent({
                  agentId: user.id,
                  page,
                  sortBy,
              })
        const data = await getData(propertiesUrl, 'test100')
        setProperties(data?.property)
        decrementLoaderCount()
    }

    return {
        properties,
    }
}
