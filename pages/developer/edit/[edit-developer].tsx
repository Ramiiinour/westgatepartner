import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../../components/Common/Breadcrumb'
import { useRouter } from 'next/router'
import { urls } from '../../../data/custom-data/urls'
import { useAuth } from '../../../features/auth/contexts/AuthProvider'
import { deleteData, putData } from '../../../utils/requests'
import { toast } from 'react-toastify'
import { useLoader } from '../../../contexts/LoaderProvider'
import RequireAdmin from '../../../features/auth/components/RequireAdmin'
import DeveloperForm from './../../../features/developers/components/DeveloperForm/DeveloperForm'
import { useDeveloper } from './../../../features/developers/hooks/useDeveloper'

const EditDeveloper = () => {
    const router = useRouter()
    const { token, isAdmin, user, setUser } = useAuth()
    const developerId: any = router.query['edit-developer']
    const { developer }: any = useDeveloper(parseInt(developerId))
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()

    async function onEditDeveloperFormSubmit(values: any) {
        await putData(
            urls.admin.routes.developer.edit(developerId),
            values,
            token
        )
        router.push(urls.admin.pages.developer.all)
        toast.success('Developer has been updated successfully.')
    }

    async function onDeleteDeveloperSubmit() {
        incrementLoaderCount()
        await deleteData(
            urls.admin.routes.developer.delete(developer.id),
            token
        )
        await router.push(urls.admin.pages.developer.all)
        toast.success('Developer has been deleted successfully.')
        decrementLoaderCount()
    }

    return (
        <>
            <RequireAdmin>
                <Breadcrumb
                    title="Edit Developer"
                    // titleText="Welcome To Admin Panel"
                    parent="Developer"
                />
                <Container fluid={true}>
                    <Row>
                        <Col lg="12">
                            <Card className="card">
                                <CardHeader className="card-header pb-0">
                                    <h5>Edit Developer details</h5>
                                </CardHeader>
                                <CardBody className="card-body admin-form">
                                    {developer && (
                                        <DeveloperForm
                                            developer={developer}
                                            onSubmitHandler={
                                                onEditDeveloperFormSubmit
                                            }
                                            onDeleteHandler={
                                                onDeleteDeveloperSubmit
                                            }
                                        />
                                    )}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </RequireAdmin>
        </>
    )
}

export default EditDeveloper
