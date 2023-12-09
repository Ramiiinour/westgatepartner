import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../../components/Common/Breadcrumb'
import { useRouter } from 'next/router'
import { urls } from '../../../data/custom-data/urls'
import { useAuth } from '../../../features/auth/contexts/AuthProvider'
import { deleteData, putData } from '../../../utils/requests'
import { toast } from 'react-toastify'
import { useArticle } from '../../../features/articles/hooks/useArticle'
import ArticleForm from '../../../features/articles/components/ArticleForm/ArticleForm'
import { useLoader } from '../../../contexts/LoaderProvider'
import RequireAdmin from '../../../features/auth/components/RequireAdmin'

const EditArticle = () => {
    const router = useRouter()
    const { token, isAdmin, user, setUser } = useAuth()
    const articleId = router.query['edit-article']
    const { article }: any = useArticle(articleId)
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()

    async function onEditArticleFormSubmit(values: any) {
        await putData(urls.admin.routes.articles.edit(articleId), values, token)
        router.push(urls.admin.pages.articles.all)
        toast.success('Article has been updated successfully.')
    }

    async function onDeleteArticleSubmit() {
        incrementLoaderCount()
        await deleteData(urls.admin.routes.articles.delete(article.id), token)
        await router.push(urls.admin.pages.articles.all)
        toast.success('Article has been deleted successfully.')
        decrementLoaderCount()
    }

    return (
        <>
            <RequireAdmin>
                <Breadcrumb
                    title="Edit Article"
                    // titleText="Welcome To Admin Panel"
                    parent="Articles"
                />
                <Container fluid={true}>
                    <Row>
                        <Col lg="12">
                            <Card className="card">
                                <CardHeader className="card-header pb-0">
                                    <h5>Edit article details</h5>
                                </CardHeader>
                                <CardBody className="card-body admin-form">
                                    {article && (
                                        <ArticleForm
                                            article={article}
                                            onSubmitHandler={
                                                onEditArticleFormSubmit
                                            }
                                            onDeleteHandler={
                                                onDeleteArticleSubmit
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

export default EditArticle
