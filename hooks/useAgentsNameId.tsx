import { useEffect, useState } from 'react'
import { getData } from '../utils/requests'
import { axiosClient } from '../services/axiosClient'
import { appRoutes } from '../data/custom-data/appRoutes'

export function useAgentsNameId() {
    const [agents, setAgents] = useState([])

    useEffect(() => {
        fetchAgents()
    }, [])

    async function fetchAgents() {
        const response = await getData(appRoutes.agents.getNameId, '')
        setAgents(response?.team)
    }

    return { agents }
}
