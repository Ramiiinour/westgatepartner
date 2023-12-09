import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../../components/Common/Breadcrumb'
import { useRouter } from 'next/router'
import { useAgent } from '../../../features/agents/hooks/useAgent'
import AgentForm from '../../../features/agents/components/AgentForm/AgentForm'
import { urls } from '../../../data/custom-data/urls'
import { useAuth } from '../../../features/auth/contexts/AuthProvider'
import { putData } from '../../../utils/requests'
import { toast } from 'react-toastify'
import { useLoader } from '../../../contexts/LoaderProvider'
import { appRoutes } from '../../../data/custom-data/appRoutes'

const EditAgent = () => {
    const router = useRouter()
    const { token, isAdmin, user, setUser } = useAuth()
    const agentId = isAdmin ? router.query['edit-agent'] : user.id
    const { agent }: any = useAgent(agentId)
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()

    async function onEditAgentFormSubmit(values: any) {
        incrementLoaderCount()
        const data = await putData(
            appRoutes.agents.edit({ agentId: agent.id }),
            values,
            token
        )
        toast.success('Agent has been updated successfully.')
        if (isAdmin) await router.push(urls.admin.pages.agents.all)
        else {
            setUser({ ...user, ...data.team })
            await router.push(urls.agent.pages.homepage)
        }
        decrementLoaderCount()
    }

    return (
        <>
            <Breadcrumb
                title="Edit Agent"
                // titleText="Welcome To Admin Panel"
                parent="Agents"
            />
            <Container fluid={true}>
                <Row>
                    <Col lg="12">
                        <Card className="card">
                            <CardHeader className="card-header pb-0">
                                <h5>Edit agent details</h5>
                            </CardHeader>
                            <CardBody className="card-body admin-form">
                                {agent && (
                                    <AgentForm
                                        agent={agent}
                                        onSubmitHandler={onEditAgentFormSubmit}
                                        isAdmin={isAdmin}
                                    />
                                )}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default EditAgent
