import React from 'react'
import { useAuth } from '../../../../features/auth/contexts/AuthProvider'
import { useLoader } from '../../../../contexts/LoaderProvider'
import { useRouter } from 'next/router'
import { useProperty } from '../../../../features/properties/hooks/useProperty'
import { urls } from '../../../../data/custom-data/urls'
import { deleteData, putData } from '../../../../utils/requests'
import { toast } from 'react-toastify'
import Breadcrumb from '../../../../components/Common/Breadcrumb'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import PropertyForm from '../../../../features/properties/components/PropertyForm/PropertyForm'

type Props = {}

const EditPropertyDraft = (props: Props) => {
    const { isAdmin, isAgent, token } = useAuth()
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()
    const router = useRouter()
    const propertyId = router.query['edit-property']
    const { property }: any = useProperty(propertyId, 0)
    const routeTo = urls.agent.pages.drafts.properties.all

    async function onEditPropertyFormSubmit(values: any) {
        incrementLoaderCount()
        const data = await putData(
            urls.common.routes.drafts.properties.edit(propertyId),
            values,
            token
        )
        if (!data) return
        await router.push(routeTo)
        toast.success('Property updated successfully.')
        decrementLoaderCount()
    }

    async function onAddHandler() {
        incrementLoaderCount()
        const data = await putData(
            urls.common.routes.drafts.properties.add(property.id),
            {},
            token
        )
        if (!data) return
        await router.push(routeTo)
        toast.success('Property has been added successfully.')
        decrementLoaderCount()
    }

    return (
        <>
            <Breadcrumb
                title="Edit Property Draft"
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
                                        onAddHandler={onAddHandler}
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

export default EditPropertyDraft
