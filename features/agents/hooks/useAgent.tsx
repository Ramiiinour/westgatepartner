import { useEffect, useState } from 'react'
import { urls } from '../../../data/custom-data/urls'
import { getData } from '../../../utils/requests'
import { useLoader } from '../../../contexts/LoaderProvider'

export function useAgent(agentId: any) {
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()
    const [agent, setAgent] = useState(null)

    useEffect(() => {
        if (!agent && agentId) {
            fetchAgent()
        }
    }, [agentId])

    async function fetchAgent() {
        incrementLoaderCount()
        const data = await getData(
            urls.admin.routes.agents.one(agentId),
            'agent3'
        )
        setAgent(data?.data)
        decrementLoaderCount()
    }

    return { agent }
}
