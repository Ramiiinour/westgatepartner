import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { APP_TITLE } from '../../data/custom-data/appData'

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <Container fluid={true} className='container-fluid'>
                    <Row>
                        <Col md='12' className="footer-copyright">
                            <p className="mb-0">Copyright 2023 © {APP_TITLE} All rights reserved.</p>
                        </Col>
                        {/* <Col md='6'>
                            <p className="float-end mb-0">Developed with  <i className="fa fa-heart font-danger" /></p>
                        </Col> */}
                    </Row>
                </Container>
            </footer>

        </>
    )
}

export default Footer