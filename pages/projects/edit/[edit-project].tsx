import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../../components/Common/Breadcrumb'
import { useRouter } from 'next/router'
import { useAuth } from '../../../features/auth/contexts/AuthProvider'
import { deleteData, putData } from '../../../utils/requests'
import { urls } from '../../../data/custom-data/urls'
import { toast } from 'react-toastify'
import { useLoader } from '../../../contexts/LoaderProvider'
import ProjectForm from '../../../features/projects/components/ProjectForm/ProjectForm'
import { useProject } from '../../../features/projects/hooks/useProject'

const EditProject = () => {
    const { isAdmin, isAgent, token } = useAuth()
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()
    const router = useRouter()
    const projectId = router.query['edit-project']
    const { project } = useProject(projectId)
    const routeTo = urls.admin.pages.projects.all

    async function onEditProjectFormSubmit(values: any) {
        incrementLoaderCount()
        await putData(
            urls.common.routes.projects.edit(projectId),
            values,
            token
        )

        await router.push(routeTo)
        toast.success('Project updated successfully.')
        decrementLoaderCount()
    }

    async function onDeleteProjectSubmit() {
        incrementLoaderCount()
        await deleteData(urls.common.routes.projects.delete(projectId), token)
        await router.push(routeTo)
        toast.success('Project has been archived successfully.')
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
                                        onDeleteHandler={onDeleteProjectSubmit}
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
