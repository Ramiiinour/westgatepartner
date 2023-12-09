import { useEffect, useState } from 'react'
import { useLoader } from '../../../contexts/LoaderProvider'
import { getData } from '../../../utils/requests'
import { appRoutes } from '../../../data/custom-data/appRoutes'

export function useAgents({ page = 1, sortBy = 'desc' }) {
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()
    const [agents, setAgents] = useState(null)

    useEffect(() => {
        if (page <= 0) throw new Error('Page should be positive integer.')
        fetchAgents()
    }, [page])

    async function fetchAgents() {
        incrementLoaderCount()
        let data = await getData(
            appRoutes.agents.all({ page, sortBy }),
            'agent3'
        )
        setAgents(data?.team)
        decrementLoaderCount()
    }

    return {
        agents,
    }
}
