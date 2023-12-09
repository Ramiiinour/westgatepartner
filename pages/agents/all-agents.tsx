import React, { useEffect } from 'react'
import { Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import { usePagination } from '../../hooks/usePagination'
import { useAgents } from '../../features/agents/hooks/useAgents'
import AgentCard from '../../features/agents/components/AgentCard/AgentCard'
import RequireAdmin from '../../features/auth/components/RequireAdmin'
import { agentsData } from '../../features/agents/data/agentsData'
import { appRoutes } from '../../data/custom-data/appRoutes'
import { getListingText } from '../../utils/text'

const initalPage = 1

const AllAgents = () => {
    const { page, totalCount, paginationComponent } = usePagination(
        appRoutes.agents.all({ page: initalPage })
    )
    const { agents }: any = useAgents({ page, sortBy: 'desc' })

    return (
        <>
            <RequireAdmin>
                <Breadcrumb
                    title="Agents List"
                    // titleText="welcome to admin panel"
                    parent="Agents"
                />
                <Container fluid={true}>
                    <Row className="agent-section property-section agent-lists">
                        <Col lg="12">
                            <div className="ratio2_3">
                                <Row className="property-2 column-sm property-label property-grid">
                                    <Col sm="12">
                                        {agents && (
                                            <div className="filter-panel">
                                                <div className="listing-option">
                                                    <h5 className="mb-0">
                                                        {getListingText(
                                                            page,
                                                            agentsData
                                                                .pagination
                                                                .countPerPage,
                                                            totalCount
                                                        )}
                                                    </h5>
                                                </div>
                                            </div>
                                        )}
                                    </Col>
                                    {agents &&
                                        agents.map((agent: any, i: number) => {
                                            return (
                                                <Col
                                                    xl="4"
                                                    sm="6"
                                                    key={i}
                                                    className="wow fadeInUp"
                                                >
                                                    <AgentCard agent={agent} />
                                                </Col>
                                            )
                                        })}
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

export default AllAgents
