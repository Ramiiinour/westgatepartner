import { useEffect, useState } from 'react'
import { useLoader } from '../../../contexts/LoaderProvider'
import { useAuth } from '../../auth/contexts/AuthProvider'
import { getData } from '../../../utils/requests'
import { appRoutes } from '../../../data/custom-data/appRoutes'

export function useProjects(page = 1, status = 1) {
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()
    const [projects, setProjects] = useState(null)
    const { user, isAdmin } = useAuth()

    useEffect(() => {
        if (page <= 0) throw new Error('Page should be positive integer.')
        if (isAdmin !== undefined) {
            fetchProjects()
        }
    }, [page, isAdmin])

    async function fetchProjects() {
        incrementLoaderCount()
        const projectsUrl = isAdmin
            ? appRoutes.projects.all({ page, sortBy: 'desc' })
            : status == 1
            ? appRoutes.projects.allForAgent({
                  page,
                  agentId: user.id,
                  sortBy: 'desc',
              })
            : appRoutes.drafts.projects.allForAgent({
                  page,
                  agentId: user.id,
                  sortBy: 'desc',
              })
        const data = await getData(projectsUrl, '')
        setProjects(data?.projects)
        decrementLoaderCount()
    }

    return {
        projects,
    }
}
