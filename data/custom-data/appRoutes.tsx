import { agentsData } from '../../features/agents/data/agentsData'
import { projectsData } from '../../features/projects/data/projectsData'
import { propertiesData } from '../../features/properties/data/propertiesData'
import { articlesData } from '../../features/articles/data/articlesData'
import { developersData } from './../../features/developers/data/developerData'
import { areasData } from '../../features/areas/data/areaData'

export const appRoutes = {
    agents: {
        all: ({
            page = 1,
            count = agentsData.pagination.countPerPage,
            sortBy = 'desc',
        }) => `/agency/team/${count}/${page}/${sortBy}`,
        edit: ({ agentId }: any) => `/agency/team/${agentId}`,
        delete: ({ agentId }: any) => `/agency/team/${agentId}`,
        uploadPhoto: `/agency/team/upload-image`,
        getNameId: `/agency/getNameId`,
    },
    properties: {
        all: ({
            page = 1,
            count = propertiesData.pagination.countPerPage,
            sortBy = 'desc',
        }) => `/listing/property/${count}/${page}?sorting=${sortBy}`,
        allForAgent: ({
            agentId,
            page = 1,
            count = propertiesData.pagination.countPerPage,
            sortBy = 'desc',
        }: any) =>
            `/listing/propertybyagent/${count}/${page}?agentId=${agentId}&sorting=${sortBy}`,
    },
    drafts: {
        properties: {
            allForAgent: ({
                agentId,
                page = 1,
                count = propertiesData.pagination.countPerPage,
                sortBy = 'desc',
            }: any) =>
                `/listing/propertybyagent-draft/${count}/${page}?agentId=${agentId}&sorting=${sortBy}`,
        },
        projects: {
            allForAgent: ({
                agentId,
                page = 1,
                count = projectsData.pagination.countPerPage,
                sortBy = 'desc',
            }: any) =>
                `/projectPaymentFloorPlan/getOneByAgentIdDraft/${count}/${page}/${sortBy}?agentId=${agentId}`,
        },
    },
    projects: {
        all: ({
            page = 1,
            count = projectsData.pagination.countPerPage,
            sortBy = 'desc',
        }) => `/projectPaymentFloorPlan/getAll/${count}/${page}/${sortBy}`,
        allForAgent: ({
            agentId,
            page = 1,
            count = projectsData.pagination.countPerPage,
            sortBy = 'desc',
        }: any) =>
            `/projectPaymentFloorPlan/getOneByAgentId/${count}/${page}/${sortBy}?agentId=${agentId}`,
    },
    leads: {
        all: {},
        allForAgent: ({ page = 1, count = 9, sortBy = 'desc' }: any) =>
            `/leads/${count}/${page}/${sortBy}`,
        oneLeadForAgent: ({ leadId }: any) => `/leads/id/${leadId}`,
    },
    articles: {
        all: ({
            count = articlesData.pagination.countPerPage,
            page = 1,
            sortBy = 'desc',
        }) => `/article/allArticle/${count}/${page}/${sortBy}`,
    },
    developers: {
        all: ({
            count = developersData.pagination.countPerPage,
            page = 1,
            sortBy = 'desc',
        }) => `/developer/${count}/${page}/${sortBy}`,
    },
    areas: {
        all: ({
            count = areasData.pagination.countPerPage,
            page = 1,
            sortBy = 'desc',
        }) => `/area/${count}/${page}/${sortBy}`,
    },
}
