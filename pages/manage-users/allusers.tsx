import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import PropertyBoxFour from '../../components/Common/Propertybox/PropertyBoxOne'
import { getData } from '../../components/utils/getData'
import RedirectHomePage from '../../features/auth/components/RedirectHomePage'

const AllUsers = () => {
    return <RedirectHomePage />

    const [userlist, setUserlist] = useState<any>()
    useEffect(() => {
        getData(`${process.env.API_URL}/userdata`)
            .then((res: any) => {
                setUserlist(res.data)
                console.log('res', res)
            })
            .catch((error) => console.log('Error', error))
    }, [])

    return (
        <>
            <Breadcrumb
                title="All Users"
                titleText="Welcome To Admin panel"
                parent="Manage users"
            />
            <Container fluid={true}>
                <Row className="agent-section property-section user-lists">
                    <Col lg="12">
                        <div className="property-grid-3 agent-grids ratio2_3">
                            <Row className="property-2 column-sm property-label property-grid list-view">
                                {userlist &&
                                    userlist.map((item: any, i: number) => {
                                        return (
                                            <Col md="12" xl="6" key={i}>
                                                <PropertyBoxFour
                                                    data={item}
                                                    label={false}
                                                />
                                            </Col>
                                        )
                                    })}
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AllUsers
