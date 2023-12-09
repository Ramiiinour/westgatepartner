import React from 'react'
import { Col, Container, Row } from 'reactstrap';
import Breadcrumb from '../../components/Common/Breadcrumb';
import CottageProperty from '../../components/types/cottageproperty/CottageProperty';
import RedirectHomePage from '../../features/auth/components/RedirectHomePage';

const Cottage = () => {
    return <RedirectHomePage />;
    return (
        <>
            <Breadcrumb title='Cottage' titleText='Welcome To Admin Panel' parent='Types' />
            <Container fluid={true}>
                <Row>
                    <Col lg='12'>
                        <div className="property-admin">
                            <div className="property-section section-sm">
                                <Row className="ratio_55 property-grid-2 property-map map-with-back">
                                    <CottageProperty />
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Cottage