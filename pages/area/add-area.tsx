import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import AreaForm from '../../features/areas/components/AreaForm/AreaForm'
import { urls } from '../../data/custom-data/urls'
import { toast } from 'react-toastify'
import { postData } from '../../utils/requests'
import { useRouter } from 'next/router'
import { useAuth } from '../../features/auth/contexts/AuthProvider'
import RequireAdmin from '../../features/auth/components/RequireAdmin'

const AddArea = () => {
    const { token } = useAuth()
    const router = useRouter()

    async function onAddAreaFormSubmit(values: any) {
        const data = await postData(urls.admin.routes.area.add, values, token)
        if (!data) return
        await router.push(urls.admin.pages.area.all)
        toast.success('Area added successfully.')
    }

    return (
        <RequireAdmin>
            <Breadcrumb title="Add Area" parent="Area" />
            <Container fluid={true}>
                <Row>
                    <Col lg="12">
                        <Card className="card">
                            <CardBody className="card-body admin-form">
                                <AreaForm
                                    onSubmitHandler={onAddAreaFormSubmit}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </RequireAdmin>
    )
}
export default AddArea
