import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import { useAuth } from '../../features/auth/contexts/AuthProvider'
import { usePagination } from '../../hooks/usePagination'
import { useProjects } from '../../features/projects/hooks/useProjects'
import { projectsData } from '../../features/projects/data/projectsData'
import ProjectCard from '../../features/projects/components/ProjectCard/ProjectCard'
import { appRoutes } from '../../data/custom-data/appRoutes'
import { getListingText } from '../../utils/text'

const initalPage = 1

const ProjectsList = () => {
    const { user, isAdmin } = useAuth()
    const projectsUrl = isAdmin
        ? appRoutes.projects.all({ page: initalPage, sortBy: 'desc' })
        : appRoutes.projects.allForAgent({
              page: initalPage,
              agentId: user.id,
              sortBy: 'desc',
          })

    const { page, totalCount, paginationComponent } = usePagination(projectsUrl)
    const { projects }: any = useProjects(page)

    return (
        <>
            <Breadcrumb
                title="Projects list"
                // titleText="Welcome to admin panel"
                parent="Projects"
            />
            {projects && (
                <Container fluid={true}>
                    <Row className="mb-5">
                        <Col lg="12">
                            <div className="property-admin">
                                <div className="property-section section-sm">
                                    <Row className="ratio_55 property-grid-2 property-map map-with-back">
                                        <Col className="col-12">
                                            <div className="filter-panel">
                                                <div className="listing-option">
                                                    <h5 className="mb-0">
                                                        {getListingText(
                                                            page,
                                                            projectsData
                                                                .pagination
                                                                .countPerPage,
                                                            totalCount
                                                        )}
                                                    </h5>
                                                    {/* <div>
                          <div className="d-flex">
                            <span className="m-r-10">Map view</span>
                            <Label className="switch">
                              <Input
                                type="checkbox"
                                className="option-list"
                                name="step_1"
                                defaultValue="ani1"
                                defaultChecked
                              />
                              <span className="switch-state" />
                            </Label>
                            <span className="m-l-10">List view</span>
                          </div>
                        </div> */}
                                                </div>
                                            </div>
                                        </Col>
                                        <div className="col-xl-12">
                                            <Row className="property-2 column-sm property-label property-grid">
                                                {projects &&
                                                    projects.map(
                                                        (
                                                            project: any,
                                                            i: number
                                                        ) => {
                                                            return (
                                                                <Col
                                                                    md="12"
                                                                    xl="6"
                                                                    xxl="4"
                                                                    key={i}
                                                                >
                                                                    <ProjectCard
                                                                        project={
                                                                            project
                                                                        }
                                                                    />
                                                                </Col>
                                                            )
                                                        }
                                                    )}
                                            </Row>
                                        </div>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col sm="12">{paginationComponent}</Col>
                    </Row>
                </Container>
            )}
        </>
    )
}

export default ProjectsList
