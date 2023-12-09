import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import RequireAdmin from '../../features/auth/components/RequireAdmin'
import { usePagination } from '../../hooks/usePagination'
import { appRoutes } from '../../data/custom-data/appRoutes'
import { useAreas } from '../../features/areas/hooks/useAreas'
import AreaCard from '../../features/areas/components/AreaCard/AreaCard'

const initalPage = 1

const AllAreas = () => {
    const { page, paginationComponent } = usePagination(
        appRoutes.areas.all({ page: initalPage })
    )
    const { areas }: any = useAreas(page)
    return (
        <>
            <RequireAdmin>
                <Breadcrumb
                    title="Areas List"
                    // titleText="welcome to admin panel"
                    parent="Areas"
                />
                <Container fluid={true}>
                    <Row className="agent-section property-section agent-lists">
                        <Col lg="12">
                            <div className="ratio2_3">
                                <Row className="property-2 column-sm property-label property-grid">
                                    {areas &&
                                        areas.map((area: any, i: number) => {
                                            return (
                                                <Col
                                                    sm="4"
                                                    key={i}
                                                    className="wow fadeInUp"
                                                >
                                                    <AreaCard area={area} />
                                                </Col>
                                            )
                                        })}
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

export default AllAreas
