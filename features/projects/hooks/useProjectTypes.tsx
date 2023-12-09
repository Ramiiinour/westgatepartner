import { useEffect, useState } from 'react'
import { urls } from '../../../data/custom-data/urls'
import { getData } from '../../../utils/requests'

export function useProjectsTypes() {
    const [projectsTypes, setProjectsTypes] = useState(null)

    useEffect(() => {
        fetchProjectsTypes()
    }, [])

    async function fetchProjectsTypes() {
        const response = await getData(
            urls.common.routes.projects.preload,
            'broblem'
        )
        setProjectsTypes(response?.projectTypes)
    }

    return { projectsTypes }
}
