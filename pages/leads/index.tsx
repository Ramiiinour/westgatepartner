import React, { useState } from 'react'
import Breadcrumb from '../../components/Common/Breadcrumb'
import { Col, Container, Row } from 'reactstrap'
import { getListingText } from '../../utils/text'
import { usePagination } from '../../hooks/usePagination'
import { appRoutes } from '../../data/custom-data/appRoutes'
import { useAuth } from '../../features/auth/contexts/AuthProvider'
import { useQuery } from 'react-query'
import axios from 'axios'
import { axiosClient } from '../../services/axiosClient'
import Link from 'next/link'
import { toast } from 'react-toastify'

type Props = {}

const initalPage = 1

const count = 9

const index = (props: Props) => {
    const { isAdmin, token } = useAuth()
    const leadsUrl = appRoutes.leads.allForAgent({
        page: initalPage,
        sortBy: 'desc',
        count,
    })

    const { page, totalCount, paginationComponent } = usePagination(leadsUrl)

    const { data, isLoading } = useQuery(
        ['allLeadsByAgentId', page],
        () =>
            axiosClient.get(
                appRoutes.leads.allForAgent({
                    page: page,
                    count,
                    sortBy: 'desc',
                }),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ),
        { refetchOnWindowFocus: false }
    )

    const leadsData = data?.data?.data?.data
    console.log(leadsData)

    const leadOptions = [
        {
            text: 'Qualified',
            value: 'Qualified',
        },
        {
            text: 'No answer',
            value: 'No_Answer',
        },
        {
            text: 'Switch off',
            value: 'Switch_off',
        },
        {
            text: 'Unqualified',
            value: 'Unqualified',
        },
        {
            text: 'Bad timing',
            value: 'Bad_timing',
        },
        {
            text: 'Deal',
            value: 'Deal',
        },
        {
            text: 'Lost',
            value: 'Lost',
        },
        {
            text: 'Pending',
            value: 'Pending',
        },
    ]

    const [isUpdatingStatus, setUpdatingStatus] = useState(false)

    const onStatusUpdate = async (
        e: React.ChangeEvent<HTMLSelectElement>,
        item: any
    ) => {
        try {
            const value = e.currentTarget.value
            const text = leadOptions.find((lead) => lead.text == item?.status)
            if (value == text?.value) return

            const data = await axiosClient.put(
                `/leads/id/${item?.id}`,
                { status: value },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (data?.data?.success) {
                toast.success('Lead Status Updated!')
            } else toast.error('An error has occured! Please try again later!')
        } catch (e) {
            toast.error('An error has occured! Please try again later!')
        }
    }

    return (
        <>
            <Breadcrumb
                title="All Leads"
                // titleText="Welcome to admin panel"
                parent="Leads"
            />

            <Container fluid={true}>
                <Row className="mb-5">
                    <Col lg="12">
                        <div className="property-admin">
                            <div className="property-section section-sm">
                                <Row className="ratio_55 property-grid-2 property-map map-with-back">
                                    <Col className="col-12">
                                        <div className="filter-panel">
                                            <div className="listing-option">
                                                <h5 className="mb-0">
                                                    {getListingText(
                                                        page,
                                                        count,
                                                        totalCount
                                                    )}
                                                </h5>
                                            </div>
                                        </div>
                                    </Col>
                                    <div className="col-xl-12">
                                        <Row className="property-2 column-sm property-label property-grid">
                                            <div>
                                                <table
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <thead>
                                                        <tr
                                                            style={{
                                                                backgroundColor:
                                                                    'black',
                                                                color: 'white',
                                                            }}
                                                        >
                                                            <th
                                                                style={{
                                                                    width: '10%',
                                                                    minWidth:
                                                                        '200px',
                                                                    borderTopLeftRadius:
                                                                        '4px',
                                                                    borderBottomLeftRadius:
                                                                        '4px',
                                                                    paddingLeft:
                                                                        '10px',
                                                                }}
                                                            >
                                                                Name
                                                            </th>
                                                            <th
                                                                style={{
                                                                    width: '10%',
                                                                    minWidth:
                                                                        '200px',
                                                                }}
                                                            >
                                                                Email
                                                            </th>
                                                            <th
                                                                style={{
                                                                    width: '10%',
                                                                    minWidth:
                                                                        '200px',
                                                                }}
                                                            >
                                                                Phone
                                                            </th>
                                                            <th
                                                                style={{
                                                                    width: '10%',
                                                                    minWidth:
                                                                        '200px',
                                                                }}
                                                            >
                                                                Created
                                                            </th>
                                                            <th
                                                                style={{
                                                                    width: '10%',
                                                                    minWidth:
                                                                        '200px',
                                                                }}
                                                            >
                                                                Updated
                                                            </th>
                                                            <th
                                                                style={{
                                                                    width: '10%',
                                                                    minWidth:
                                                                        '200px',
                                                                }}
                                                            >
                                                                Status
                                                            </th>
                                                            {isAdmin && (
                                                                <th
                                                                    style={{
                                                                        width: '10%',
                                                                        minWidth:
                                                                            '200px',
                                                                    }}
                                                                >
                                                                    Agent
                                                                </th>
                                                            )}
                                                            <th
                                                                style={{
                                                                    width: '30%',
                                                                    borderTopRightRadius:
                                                                        '4px',
                                                                    borderBottomRightRadius:
                                                                        '4px',
                                                                    minWidth:
                                                                        '300px',
                                                                }}
                                                            >
                                                                Message
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {leadsData?.map(
                                                            (
                                                                item: any,
                                                                index: number
                                                            ) => {
                                                                return (
                                                                    <tr
                                                                        key={
                                                                            item?.name +
                                                                            index
                                                                        }
                                                                        className="lead-row"
                                                                        style={{
                                                                            position:
                                                                                'relative',
                                                                        }}
                                                                    >
                                                                        <td
                                                                            style={{
                                                                                paddingTop:
                                                                                    '10px',
                                                                                paddingLeft:
                                                                                    '10px',
                                                                                borderTopLeftRadius:
                                                                                    '4px',
                                                                                borderBottomLeftRadius:
                                                                                    '4px',
                                                                            }}
                                                                        >
                                                                            <Link
                                                                                href={`/leads/${item?.id}`}
                                                                                style={{
                                                                                    textDecoration:
                                                                                        'underline',
                                                                                    color: 'green',
                                                                                }}
                                                                            >
                                                                                {
                                                                                    item?.name
                                                                                }
                                                                            </Link>
                                                                        </td>
                                                                        <td
                                                                            style={{
                                                                                overflow:
                                                                                    'hidden',
                                                                                textOverflow:
                                                                                    'ellipsis',
                                                                                whiteSpace:
                                                                                    'nowrap',
                                                                                maxWidth: 1,
                                                                                paddingTop:
                                                                                    '10px',
                                                                            }}
                                                                        >
                                                                            {
                                                                                item?.email
                                                                            }
                                                                        </td>
                                                                        <td
                                                                            style={{
                                                                                paddingTop:
                                                                                    '10px',
                                                                            }}
                                                                        >
                                                                            {
                                                                                item?.phoneNum
                                                                            }
                                                                        </td>
                                                                        <td
                                                                            style={{
                                                                                paddingTop:
                                                                                    '10px',
                                                                            }}
                                                                        >
                                                                            {new Date(
                                                                                item?.createdAt
                                                                            )?.toLocaleString(
                                                                                'en-GB',
                                                                                {
                                                                                    day: '2-digit',
                                                                                    month: '2-digit',
                                                                                    year: '2-digit',
                                                                                    hour: '2-digit',
                                                                                    minute: '2-digit',
                                                                                    hour12: true,
                                                                                }
                                                                            )}
                                                                        </td>
                                                                        <td
                                                                            style={{
                                                                                paddingTop:
                                                                                    '10px',
                                                                            }}
                                                                        >
                                                                            {new Date(
                                                                                item?.updatedAt
                                                                            )?.toLocaleString(
                                                                                'en-GB',
                                                                                {
                                                                                    day: '2-digit',
                                                                                    month: '2-digit',
                                                                                    year: '2-digit',
                                                                                    hour: '2-digit',
                                                                                    minute: '2-digit',
                                                                                    hour12: true,
                                                                                }
                                                                            )}
                                                                        </td>
                                                                        <td
                                                                            style={{
                                                                                paddingTop:
                                                                                    '10px',
                                                                                position:
                                                                                    'relative',
                                                                            }}
                                                                        >
                                                                            <select
                                                                                style={{
                                                                                    zIndex: 10,
                                                                                    position:
                                                                                        'absolute',
                                                                                    top: 0,
                                                                                    left: 0,
                                                                                    marginTop:
                                                                                        '10px',
                                                                                }}
                                                                                defaultValue={
                                                                                    item?.status
                                                                                }
                                                                                disabled={
                                                                                    isUpdatingStatus
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    onStatusUpdate(
                                                                                        e,
                                                                                        item
                                                                                    )
                                                                                }
                                                                            >
                                                                                {leadOptions.map(
                                                                                    (
                                                                                        option,
                                                                                        index: number
                                                                                    ) => {
                                                                                        return (
                                                                                            <option
                                                                                                value={
                                                                                                    option.value
                                                                                                }
                                                                                                key={
                                                                                                    option?.value +
                                                                                                    index
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    option.text
                                                                                                }
                                                                                            </option>
                                                                                        )
                                                                                    }
                                                                                )}
                                                                            </select>
                                                                        </td>

                                                                        {isAdmin && (
                                                                            <td
                                                                                style={{
                                                                                    overflow:
                                                                                        'hidden',
                                                                                    textOverflow:
                                                                                        'ellipsis',
                                                                                    whiteSpace:
                                                                                        'nowrap',
                                                                                    maxWidth: 1,
                                                                                    paddingTop:
                                                                                        '10px',
                                                                                }}
                                                                            >
                                                                                {`${item?.teamMember?.firstName} ${item?.teamMember?.lastName}`}
                                                                            </td>
                                                                        )}

                                                                        <td
                                                                            style={{
                                                                                overflow:
                                                                                    'hidden',
                                                                                textOverflow:
                                                                                    'ellipsis',
                                                                                whiteSpace:
                                                                                    'nowrap',
                                                                                maxWidth: 1,
                                                                                paddingTop:
                                                                                    '10px',
                                                                                borderTopRightRadius:
                                                                                    '4px',
                                                                                borderBottomRightRadius:
                                                                                    '4px',
                                                                            }}
                                                                        >
                                                                            {
                                                                                item?.message
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Row>
                                    </div>
                                    {paginationComponent}
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default index
