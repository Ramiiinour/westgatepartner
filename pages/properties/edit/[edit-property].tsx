import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../../components/Common/Breadcrumb'
import { useRouter } from 'next/router'
import PropertyForm from '../../../features/properties/components/PropertyForm/PropertyForm'
import { useProperty } from '../../../features/properties/hooks/useProperty'
import { useAuth } from '../../../features/auth/contexts/AuthProvider'
import { deleteData, putData } from '../../../utils/requests'
import { urls } from '../../../data/custom-data/urls'
import { toast } from 'react-toastify'
import { useLoader } from '../../../contexts/LoaderProvider'

const EditProperty = () => {
    const { isAdmin, isAgent, token } = useAuth()
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()
    const router = useRouter()
    const propertyId = router.query['edit-property']
    const { property }: any = useProperty(propertyId)
    const routeTo = isAdmin
        ? urls.admin.pages.properties.all
        : urls.agent.pages.properties.all

    async function onEditPropertyFormSubmit(values: any) {
        incrementLoaderCount()
        const data = await putData(
            urls.common.routes.properties.edit(propertyId),
            values,
            token
        )

        if (!data) return
        await router.push(routeTo)
        toast.success('Property updated successfully.')
        decrementLoaderCount()
    }

    async function onDeletePropertySubmit() {
        incrementLoaderCount()
        const data = await deleteData(
            urls.common.routes.properties.delete(property.id),
            token
        )
        if (!data) return
        await router.push(routeTo)
        toast.success('Property has been archived successfully.')
        decrementLoaderCount()
    }

    return (
        <>
            <Breadcrumb
                title="Edit Property"
                // titleText="Welcome to admin panel"
                parent="Properties"
            />
            <Container fluid={true}>
                <Row>
                    <Col lg="12">
                        <Card className="card">
                            <CardHeader className="card-header pb-0">
                                <h5>Edit property details</h5>
                            </CardHeader>
                            <CardBody className="card-body admin-form">
                                {property && (
                                    <PropertyForm
                                        onSubmitHandler={
                                            onEditPropertyFormSubmit
                                        }
                                        onDeleteHandler={onDeletePropertySubmit}
                                        property={property}
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

export default EditProperty
