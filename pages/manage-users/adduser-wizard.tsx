import React, { useState } from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import WizardForm1 from '../../components/manageuser/adduserwizard/WizardForm1'
import WizardForm2 from '../../components/manageuser/adduserwizard/WizardForm2'
import WizardForm3 from '../../components/manageuser/adduserwizard/WizardForm3'
import WizardFormHeader from '../../components/manageuser/adduserwizard/WizardFormHeader'
import RedirectHomePage from '../../features/auth/components/RedirectHomePage'

const AddUserWizard = () => {
    const [steps, setSteps] = useState(1);
    const [data, setData] = useState({});
    return <RedirectHomePage />;

    return (
        <>
            <Breadcrumb title='Add User Wizard' titleText='Welcome To Admin Panel' parent='Manage users' />
            <Container fluid={true} className="property-wizard horizontal-wizard">
                <Row className="wizard-box">
                    <Col lg='12'>
                        <Card className="card">
                            <CardBody className="card-body admin-wizard">
                                <div className="wizard-step-container">
                                    <WizardFormHeader steps={steps} />
                                    <div className="wizard-form-details log-in">
                                        {steps === 1 && <WizardForm1 setSteps={setSteps} setData={setData} data={data} />}
                                        {steps === 2 && <WizardForm2 setSteps={setSteps} setData={setData} data={data} />}
                                        {steps === 3 && <WizardForm3 setSteps={setSteps} data={data} setData={setData} />}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AddUserWizard