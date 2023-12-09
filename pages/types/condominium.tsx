import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import CondominiumList from '../../components/types/condominiumproperty/CondominiumList'
import RedirectHomePage from '../../features/auth/components/RedirectHomePage'

const Condominium = () => {
    return <RedirectHomePage />;

    return (
        <>
            <Breadcrumb title='Condominium' titleText='Welcome To Admin Panel' parent='Types' />
            <Container fluid={true}>
                <Row>
                    <Col lg='12'>
                        <div className="property-admin">
                            <div className="property-section section-sm">
                                <Row className="ratio_55 property-grid-2 property-map map-with-back">
                                    <CondominiumList />
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default Condominium
