import { projectsData } from '../data/projectsData'

export function getStatusOfProject(project: any) {
    if (project.handOverYear) {
        return `Handover ${project.handOverYear}/${project.handOverYearQuarter}`
    } else {
        return projectsData.status.readyToUse
    }
}
