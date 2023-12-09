import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'

import { useRouter } from 'next/router'

import { toast } from 'react-toastify'
import { useAuth } from '../../../../features/auth/contexts/AuthProvider'
import { useLoader } from '../../../../contexts/LoaderProvider'
import { useProject } from '../../../../features/projects/hooks/useProject'
import { urls } from '../../../../data/custom-data/urls'
import { putData } from '../../../../utils/requests'
import Breadcrumb from '../../../../components/Common/Breadcrumb'
import ProjectForm from '../../../../features/projects/components/ProjectForm/ProjectForm'

const EditProject = () => {
    const { isAdmin, isAgent, token } = useAuth()
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()
    const router = useRouter()
    const projectId = router.query['edit-project']
    const { project } = useProject(projectId, 0)
    const routeTo = urls.agent.pages.drafts.projects.all

    async function onEditProjectFormSubmit(values: any) {
        incrementLoaderCount()
        const data = await putData(
            urls.common.routes.drafts.projects.edit(projectId),
            values,
            token
        )
        if (!data) return
        await router.push(routeTo)
        toast.success('Project updated successfully.')
        decrementLoaderCount()
    }

    async function onAddHandler() {
        incrementLoaderCount()
        const data = await putData(
            urls.common.routes.drafts.projects.publish(projectId),
            {},
            token
        )
        if (!data) return
        await router.push(routeTo)
        toast.success('Project updated successfully.')
        decrementLoaderCount()
    }

    return (
        <>
            <Breadcrumb
                title="Edit Project"
                // titleText="Welcome to admin panel"
                parent="Projects"
            />
            <Container fluid={true}>
                <Row>
                    <Col lg="12">
                        <Card className="card">
                            <CardHeader className="card-header pb-0">
                                <h5>Edit project details</h5>
                            </CardHeader>
                            <CardBody className="card-body admin-form">
                                {project && (
                                    <ProjectForm
                                        onSubmitHandler={
                                            onEditProjectFormSubmit
                                        }
                                        onAddHandler={onAddHandler}
                                        project={project}
                                        isAgent={isAgent}
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

export default EditProject
