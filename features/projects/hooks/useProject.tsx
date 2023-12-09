import { useEffect, useState } from 'react'
import { urls } from '../../../data/custom-data/urls'
import { getData } from '../../../utils/requests'
import { useLoader } from '../../../contexts/LoaderProvider'
import { useAuth } from '../../auth/contexts/AuthProvider'

export function useProject(projectId: any, status = 1) {
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()
    const [project, setProject] = useState(null)
    const { token } = useAuth()

    useEffect(() => {
        if (projectId) {
            fetchProject()
        }
    }, [projectId])

    async function fetchProject() {
        incrementLoaderCount()
        const data = await getData(
            status == 1
                ? urls.common.routes.projects.one(projectId)
                : urls.common.routes.drafts.projects.one(projectId),
            token
        )
        setProject(data)
        decrementLoaderCount()
    }

    return { project }
}
