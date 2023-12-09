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
import { useArea } from './../../../features/areas/hooks/useArea'
import AreaForm from '../../../features/areas/components/AreaForm/AreaForm'

const EditDeveloper = () => {
    const router = useRouter()
    const { token, isAdmin, user, setUser } = useAuth()
    const areaId = router.query['edit-area']
    const { area }: any = useArea(areaId)
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()

    async function onEditAreaFormSubmit(values: any) {
        await putData(urls.admin.routes.area.edit(areaId), values, token)
        router.push(urls.admin.pages.area.all)
        toast.success('Area has been updated successfully.')
    }
    async function onDeleteAreaSubmit() {
        incrementLoaderCount()
        await deleteData(urls.admin.routes.area.delete(area.id), token)
        await router.push(urls.admin.pages.area.all)
        toast.success('Area has been deleted successfully.')
        decrementLoaderCount()
    }

    return (
        <>
            <RequireAdmin>
                <Breadcrumb
                    title="Edit Area"
                    // titleText="Welcome To Admin Panel"
                    parent="Area"
                />
                <Container fluid={true}>
                    <Row>
                        <Col lg="12">
                            <Card className="card">
                                <CardHeader className="card-header pb-0">
                                    <h5>Edit Area details</h5>
                                </CardHeader>
                                <CardBody className="card-body admin-form">
                                    {area && (
                                        <AreaForm
                                            area={area}
                                            onSubmitHandler={
                                                onEditAreaFormSubmit
                                            }
                                            onDeleteHandler={onDeleteAreaSubmit}
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
