import { VectorMap } from '@south-paw/react-vector-maps'
import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import SalaryChart from '../../components/dashboard/SalaryChart'
import IncomeChart from '../../components/Report/IncomeChart'
import Management from '../../components/Report/Management'
import PropertySale from '../../components/Report/PropertySale'
import RecentTransaction from '../../components/Report/RecentTransaction'
import Revenuechart from '../../components/Report/Revenuechart'
import { world } from '../../data/map/world'
import RedirectHomePage from '../../features/auth/components/RedirectHomePage'

const Report = () => {
    return <RedirectHomePage />
    return (
        <>
            <Breadcrumb
                title="Reports"
                titleText="Welcome to admin panel"
                parent="Reports"
            />
            <Container fluid={true}>
                <Row className="report-summary">
                    <SalaryChart />
                    <Management />
                    <Revenuechart />
                    <PropertySale />
                    <div className="col-xl-6">
                        <IncomeChart />
                    </div>
                    <div className="col-xl-6">
                        <div className="card">
                            <div className="card-header">
                                <h5>Visitors Location</h5>
                            </div>
                            <div className="card-body">
                                <VectorMap
                                    {...world}
                                    style={{ fill: '#000000' }}
                                    className="simplemap"
                                    id="world-map"
                                />
                            </div>
                        </div>
                    </div>
                    <RecentTransaction />
                </Row>
            </Container>
        </>
    )
}

export default Report
