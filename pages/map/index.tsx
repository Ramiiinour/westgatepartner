import { VectorMap } from '@south-paw/react-vector-maps'
import React from 'react'
import { Container } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import { india } from '../../data/map/india'
import { usa } from '../../data/map/usa'
import { australia } from '../../data/map/australia'
import RedirectHomePage from '../../features/auth/components/RedirectHomePage'
import { world } from '../../data/map/world'

const Map = () => {
    return <RedirectHomePage />

    return (
        <>
            <Breadcrumb
                title="Map"
                titleText="Welcome to admin panel"
                parent="Map"
            />
            <Container fluid={true}>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-header pb-0">
                                <h5>Vector world map</h5>
                            </div>
                            <div className="card-body">
                                <VectorMap
                                    {...world}
                                    style={{ fill: '#000000' }}
                                    className="jvector-map-height simplemap"
                                    id="world-map"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-header pb-0">
                                <h5>Vector USA map</h5>
                            </div>
                            <div className="card-body">
                                <VectorMap
                                    {...usa}
                                    style={{ fill: '#F35D43' }}
                                    className="jvector-map-height simplemap"
                                    id="usa"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-header pb-0">
                                <h5>Vector Australia map</h5>
                            </div>
                            <div className="card-body">
                                <VectorMap
                                    {...australia}
                                    style={{ fill: '#89C826' }}
                                    className="jvector-map-height simplemap"
                                    id="australia"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-header pb-0">
                                <h5>Vector India map</h5>
                            </div>
                            <div className="card-body">
                                <VectorMap
                                    {...india}
                                    style={{ fill: '#FFCC33' }}
                                    className="jvector-map-height simplemap"
                                    id="india"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Map
