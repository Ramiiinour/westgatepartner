import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import ArticleForm from '../../features/articles/components/ArticleForm/ArticleForm'
import { urls } from '../../data/custom-data/urls'
import { toast } from 'react-toastify'
import { postData } from '../../utils/requests'
import { useRouter } from 'next/router'
import { useAuth } from '../../features/auth/contexts/AuthProvider'
import RequireAdmin from '../../features/auth/components/RequireAdmin'

const AddArticle = () => {
    const { token } = useAuth()
    const router = useRouter()

    async function onAddArticleFormSubmit(values: any) {
        await postData(urls.admin.routes.articles.add, values, token)
        await router.push(urls.admin.pages.articles.all)
        toast.success('Article added successfully.')
    }

    return (
        <RequireAdmin>
            <Breadcrumb title="Add Article" parent="Articles" />
            <Container fluid={true}>
                <Row>
                    <Col lg="12">
                        <Card className="card">
                            <CardBody className="card-body admin-form">
                                <ArticleForm
                                    onSubmitHandler={onAddArticleFormSubmit}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </RequireAdmin>
    )
}
export default AddArticle
