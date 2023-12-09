import { useEffect, useState } from 'react'
import { urls } from '../../../data/custom-data/urls'
import { getData } from '../../../utils/requests'

export function useFloorPlans() {
    const [floorPlans, setFloorPlans] = useState(null)

    useEffect(() => {
        fetchFloorPlans()
    }, [])

    async function fetchFloorPlans() {
        const response = await getData(
            urls.common.routes.projects.floorPlans.all,
            ''
        )
        setFloorPlans(response.data.floorPlans)
    }

    return { floorPlans }
}
