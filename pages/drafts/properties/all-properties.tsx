import React from 'react'
import { useAuth } from '../../../features/auth/contexts/AuthProvider'
import { appRoutes } from '../../../data/custom-data/appRoutes'
import { usePagination } from '../../../hooks/usePagination'
import { useProperties } from '../../../features/properties/hooks/useProperties'
import { Col, Container, Row } from 'reactstrap'
import PropertyCard from '../../../features/properties/components/PropertyCard/PropertyCard'
import { getListingText } from '../../../utils/text'
import { propertiesData } from '../../../features/properties/data/propertiesData'
import Breadcrumb from '../../../components/Common/Breadcrumb'

type Props = {}

const initalPage = 1

const index = (props: Props) => {
    const { user } = useAuth()
    const propertiesUrl = appRoutes.drafts.properties.allForAgent({
        agentId: user.id,
        page: initalPage,
        sortBy: 'desc',
    })

    const { page, totalCount, paginationComponent } =
        usePagination(propertiesUrl)
    const { properties }: any = useProperties(page, 'desc', 0)
    return (
        <>
            <Breadcrumb
                title="Property Drafts"
                // titleText="Welcome to admin panel"
                parent="Properties"
            />
            {properties && (
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
                                                            propertiesData
                                                                .pagination
                                                                .countPerPage,
                                                            totalCount
                                                        )}
                                                    </h5>
                                                </div>
                                            </div>
                                        </Col>
                                        <div className="col-xl-12">
                                            <Row className="property-2 column-sm property-label property-grid">
                                                {properties &&
                                                    properties.map(
                                                        (
                                                            property: any,
                                                            i: number
                                                        ) => {
                                                            return (
                                                                <Col
                                                                    sm="6"
                                                                    xl="4"
                                                                    key={i}
                                                                >
                                                                    <PropertyCard
                                                                        property={
                                                                            property
                                                                        }
                                                                        status={
                                                                            0
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

export default index
