import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import ArticleCard from '../../features/articles/components/ArticleCard/ArticleCard'
import { useArticles } from '../../features/articles/hooks/useArticles'
import RequireAdmin from '../../features/auth/components/RequireAdmin'
import { usePagination } from '../../hooks/usePagination'
import { appRoutes } from '../../data/custom-data/appRoutes'

const initalPage = 1

const AllArticles = () => {
    const { page, paginationComponent } = usePagination(
        appRoutes.articles.all({ page: initalPage })
    )
    const { articles }: any = useArticles(page)
    return (
        <>
            <RequireAdmin>
                <Breadcrumb
                    title="Articles List"
                    // titleText="welcome to admin panel"
                    parent="Articles"
                />
                <Container fluid={true}>
                    <Row className="agent-section property-section agent-lists">
                        <Col lg="12">
                            <div className="ratio2_3">
                                <Row className="property-2 column-sm property-label property-grid">
                                    {articles &&
                                        articles.map(
                                            (article: any, i: number) => {
                                                return (
                                                    <Col
                                                        sm="6"
                                                        key={i}
                                                        className="wow fadeInUp"
                                                    >
                                                        <ArticleCard
                                                            article={article}
                                                        />
                                                    </Col>
                                                )
                                            }
                                        )}
                                </Row>
                                {paginationComponent}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </RequireAdmin>
        </>
    )
}

export default AllArticles
