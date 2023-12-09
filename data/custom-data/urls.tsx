import { agentsData } from '../../features/agents/data/agentsData'
import { projectsData } from '../../features/projects/data/projectsData'
import { propertiesData } from '../../features/properties/data/propertiesData'
import { ADMIN, AGENT } from './constants'

export const urls: any = {
    // baseUrl: 'https://remarkestate.com/api/v1/en',
    baseUrl: 'http://localhost:3001/api/v1/en',
    auth: {
        pages: {
            login: '/authentication/login',
        },
    },
    admin: {
        pages: {
            homepage: '/agents/all-agents',
            agents: {
                all: '/agents/all-agents',
                add: '/agents/add-agent',
                edit: (agentId: any) => `/agents/edit/${agentId}`,
                profile: (agentId: any) => `/agents/${agentId}`,
            },
            properties: {
                all: '/properties/all-properties',
            },
            projects: {
                all: '/projects/all-projects',
            },
            articles: {
                all: '/articles/all-articles',
                add: '/articles/add-article',
                edit: (articleId: any) => `/articles/edit/${articleId}`,
            },
            developer: {
                all: '/developer/all-developers',
                add: '/developer/add-developer',
                edit: (developerId: any) => `/developer/edit/${developerId}`,
            },
            area: {
                all: '/area/all-areas',
                add: '/area/add-area',
                edit: (areaId: any) => `/area/edit/${areaId}`,
            },
        },
        routes: {
            info: '/admin/jwt/my-profile',
            agents: {
                one: (agentId: any) => `/agency/team/${agentId}`,
                update: (agentId: any) => `/agency/team/${agentId}`,
            },
            articles: {
                all: (page = 1) =>
                    `/article/allArticle/${agentsData.pagination.countPerPage}/${page}`,
                one: (articleId: any) => `/article/getOneArticle/${articleId}`,
                add: `/article/createArticle`,
                edit: (articleId: any) => `/article/updateArticle/${articleId}`,
                delete: (articleId: any) =>
                    `/article/deleteArticle/${articleId}`,
            },
            developer: {
                add: '/developer/',
                one: (developerId: any) => `/developer/id/${developerId}`,
                edit: (developerId: any) => `/developer/${developerId}`,
                delete: (developerId: any) => `/developer/${developerId}`,
            },
            area: {
                add: '/area/',
                one: (areaId: any) => `/area/id/${areaId}`,

                edit: (areaId: any) => `/area/${areaId}`,
                delete: (areaId: any) => `/area/${areaId}`,
            },
        },
    },
    agent: {
        pages: {
            homepage: '/properties/all-properties',
            agents: {
                edit: '/agents/edit/profile',
            },
            properties: {
                all: '/properties/all-properties',
                add: '/properties/add-property',
            },
            projects: {
                all: '/projects/all-projects',
                add: '/projects/add-project',
            },
            drafts: {
                properties: {
                    all: '/drafts/properties/all-properties',
                },
                projects: {
                    all: '/drafts/projects/all-projects',
                },
            },
        },
        routes: {
            info: '/team/my-profile',
        },
    },
    common: {
        pages: {
            properties: {
                edit: (propertyId: any) => `/properties/edit/${propertyId}`,
            },
            projects: {
                edit: (projectId: any) => `/projects/edit/${projectId}`,
            },
            drafts: {
                properties: {
                    edit: (propertyId: any) =>
                        `/drafts/properties/edit/${propertyId}`,
                },
                projects: {
                    edit: (projectId: any) =>
                        `/drafts/projects/edit/${projectId}`,
                },
            },
            leads: {
                all: '/leads',
            },
        },
        routes: {
            agents: {
                add: `/agency/team`,
            },
            properties: {
                one: (propertyId: any) => `listing/property/id/${propertyId}`,
                add: '/listing/property',
                edit: (propertyId: any) => `/listing/property/${propertyId}`,
                uploadPhoto: `/listing/property/image`,
                amenities: {
                    all: `/listing/ameneties`,
                },
                delete: (propertyId: any) => `/listing/property/${propertyId}`,
                propertiesTypes: {
                    all: `/listing/property/preload`,
                },
                setIsFeatured: (propertyId: any) =>
                    `/listing/isFeature/${propertyId}`,
                propertyOfTheDay: `/listing/propertyOfDay`,
                setIsPropertyOfTheDay: (propertyId: any) =>
                    `/listing/isPropertyOfDat/${propertyId}`,
            },
            projects: {
                preload: `/listing/projects/preload`,
                one: (projectId: any) =>
                    `/projectPaymentFloorPlan/getOne/id/${projectId}`,

                floorPlans: {
                    all: `/projectPaymentFloorPlan/allFloorPlan`,
                },
                add: `/projectPaymentFloorPlan/create`,
                edit: (projectId: any) =>
                    `/projectPaymentFloorPlan/update/${projectId}`,
                delete: (projectId: any) => `/listing/project/${projectId}`,
            },
            drafts: {
                properties: {
                    one: (propertyId: any) =>
                        `listing/property-draft/id/${propertyId}`,
                    edit: (propertyId: any) =>
                        `/listing/property-draft/${propertyId}`,
                    add: (propertyId: any) =>
                        `/listing/property-draft-publish/${propertyId}`,
                },
                projects: {
                    one: (projectId: any) =>
                        `/projectPaymentFloorPlan/getOneDraft/id/${projectId}`,
                    edit: (projectId: any) =>
                        `/projectPaymentFloorPlan/update-draft/${projectId}`,
                    publish: (propertyId: any) =>
                        `/projectPaymentFloorPlan/publish-draft/${propertyId}`,
                },
            },
        },
    },
    developer: {
        getNames: '/developer/get/NameIdDevelopers',
    },
    city: {
        getAll: (countryId: any) => `/city?countryId=${countryId}`,
    },
    country: {
        getAll: '/country',
    },
    area: {
        getAll: (cityId: any) => `/area/get/NamesAreas?cityId=${cityId}`,
    },
}

export function getUserInfoUrl(type: any) {
    if (type === ADMIN) {
        return urls.admin.routes.info
    } else if (type === AGENT) {
        console.log('error600', type)
        return urls.agent.routes.info
    }
    throw new Error('Type should be either admin or agent.')
}
