import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import { useAuth } from '../../features/auth/contexts/AuthProvider'
import PropertyForm from '../../features/properties/components/PropertyForm/PropertyForm'
import { urls } from '../../data/custom-data/urls'
import { useRouter } from 'next/router'
import { postData } from '../../utils/requests'
import { toast } from 'react-toastify'
import RequireAgent from '../../features/auth/components/RequireAgent'

const AddProperty = () => {
    const { isAdmin, isAgent, token } = useAuth()
    const router = useRouter()

    async function onAddPropertyFormSubmit(values: any) {
        const data = await postData(
            urls.common.routes.properties.add,
            values,
            token
        )
        if (!data) return
        const routeTo = isAdmin
            ? urls.admin.pages.properties.all
            : urls.agent.pages.properties.all
        await router.push(routeTo)
        toast.success('Property added successfully.')
    }

    return (
        <>
            <RequireAgent>
                <Breadcrumb
                    title="Add Property"
                    // titleText="Welcome to admin panel"
                    parent="Properties"
                />
                <Container fluid={true} className="container-fluid">
                    <Row>
                        <Col lg="12">
                            <Card className="card">
                                <CardHeader className="card-header pb-0">
                                    <h5>Add property details</h5>
                                </CardHeader>
                                <CardBody className="card-body admin-form">
                                    <PropertyForm
                                        onSubmitHandler={
                                            onAddPropertyFormSubmit
                                        }
                                        isAgent={isAgent}
                                        isAdmin={isAdmin}
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

export default AddProperty
