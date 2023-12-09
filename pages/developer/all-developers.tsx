import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import DeveloperCard from '../../features/developers/components/DeveloperCard/DeveloperCard'
import { useDevelopers } from '../../features/developers/hooks/useDevelopers'
import RequireAdmin from '../../features/auth/components/RequireAdmin'
import { usePagination } from '../../hooks/usePagination'
import { appRoutes } from '../../data/custom-data/appRoutes'

const initalPage = 1

const AllArticles = () => {
    const { page, paginationComponent } = usePagination(
        appRoutes.developers.all({ page: initalPage })
    )
    const { developers }: any = useDevelopers(page)
    return (
        <>
            <RequireAdmin>
                <Breadcrumb
                    title="Developers List"
                    // titleText="welcome to admin panel"
                    parent="Developers"
                />
                <Container fluid={true}>
                    <Row className="agent-section property-section agent-lists">
                        <Col lg="12">
                            <div className="ratio2_3">
                                <Row className="property-2 column-sm property-label property-grid">
                                    {developers &&
                                        developers.map(
                                            (developer: any, i: number) => {
                                                return (
                                                    <Col
                                                        sm="4"
                                                        key={i}
                                                        className="wow fadeInUp"
                                                    >
                                                        <DeveloperCard
                                                            developer={
                                                                developer
                                                            }
                                                        />
                                                    </Col>
                                                )
                                            }
                                        )}
                                </Row>
                                {paginationComponent}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </RequireAdmin>
        </>
    )
}

export default AllArticles
