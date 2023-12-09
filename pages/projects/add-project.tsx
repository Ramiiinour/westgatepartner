import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import ProjectForm from '../../features/projects/components/ProjectForm/ProjectForm'
import { urls } from '../../data/custom-data/urls'
import { useAuth } from '../../features/auth/contexts/AuthProvider'
import { postData } from '../../utils/requests'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import RequireAgent from '../../features/auth/components/RequireAgent'

const AddProject = () => {
    const { token, isAgent } = useAuth()
    const router = useRouter()

    async function onAddProjectFormSubmit(values: any) {
        values = { ...values, status: '1' }
        await postData(urls.common.routes.projects.add, values, token)
        const routeTo = isAgent ? urls.agent.pages.projects.all : ''
        await router.push(routeTo)
        toast.success('Project has been added successfully.')
    }

    return (
        <>
            <RequireAgent>
                <Breadcrumb title="Add Project" parent="Projects" />
                <Container fluid={true} className="container-fluid">
                    <Row>
                        <Col lg="12">
                            <Card className="card">
                                <CardHeader className="card-header pb-0">
                                    <h5>Add project details</h5>
                                </CardHeader>
                                <CardBody className="card-body admin-form">
                                    <ProjectForm
                                        onSubmitHandler={onAddProjectFormSubmit}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </RequireAgent>
        </>
    )
}
export default AddProject
