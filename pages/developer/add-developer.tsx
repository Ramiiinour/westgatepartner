import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import DeveloperForm from '../../features/developers/components/DeveloperForm/DeveloperForm'
import { urls } from '../../data/custom-data/urls'
import { toast } from 'react-toastify'
import { postData } from '../../utils/requests'
import { useRouter } from 'next/router'
import { useAuth } from '../../features/auth/contexts/AuthProvider'
import RequireAdmin from '../../features/auth/components/RequireAdmin'

const AddDeveloper = () => {
    const { token } = useAuth()
    const router = useRouter()

    async function onAddDeveloperFormSubmit(values: any) {
        await postData(urls.admin.routes.developer.add, values, token)
        await router.push(urls.admin.pages.developer.all)
        toast.success('Developer added successfully.')
    }

    return (
        <RequireAdmin>
            <Breadcrumb title="Add Developer" parent="Developer" />
            <Container fluid={true}>
                <Row>
                    <Col lg="12">
                        <Card className="card">
                            <CardBody className="card-body admin-form">
                                <DeveloperForm
                                    onSubmitHandler={onAddDeveloperFormSubmit}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </RequireAdmin>
    )
}
export default AddDeveloper
