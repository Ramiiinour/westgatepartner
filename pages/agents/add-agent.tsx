import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import { urls } from '../../data/custom-data/urls'
import AgentForm from '../../features/agents/components/AgentForm/AgentForm'
import { useAuth } from '../../features/auth/contexts/AuthProvider'
import { postData } from '../../utils/requests'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import RequireAdmin from '../../features/auth/components/RequireAdmin'

const AddAgent = () => {
    const { token, isAdmin } = useAuth()
    const route = useRouter()

    async function onAddAgentFormSubmit(values: any) {
        try {
            await postData(urls.common.routes.agents.add, values, token)
            await route.push(urls.admin.pages.agents.all)
            toast.success('Agent has been added successfully.')
        } catch (e) {}
    }

    return (
        <>
            <RequireAdmin>
                <Breadcrumb
                    title="Add Agent"
                    // titleText="Welcome To Admin Panel"
                    parent="Agents"
                />
                <Container fluid={true}>
                    <Row>
                        <Col lg="12">
                            <Card className="card">
                                <CardHeader className="card-header pb-0">
                                    <h5>Add Agent details</h5>
                                </CardHeader>
                                <CardBody className="card-body admin-form">
                                    <AgentForm
                                        onSubmitHandler={onAddAgentFormSubmit}
                                        isAdmin={isAdmin}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </RequireAdmin>
        </>
    )
}
export default AddAgent
