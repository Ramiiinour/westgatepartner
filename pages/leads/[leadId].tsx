import React, { useContext, useRef, useState } from 'react'
import Breadcrumb from '../../components/Common/Breadcrumb'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { axiosClient } from '../../services/axiosClient'
import { appRoutes } from '../../data/custom-data/appRoutes'
import { useAuth } from '../../features/auth/contexts/AuthProvider'
import { Container, Modal, Row } from 'reactstrap'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { useTheme } from '../../contexts/ThemeProvider'

type Props = {}

const InnerLead = (props: Props) => {
    const { token, isAdmin } = useAuth()
    const router = useRouter()
    const { leadId } = router.query

    const {
        data: res,
        isLoading,
        refetch,
    } = useQuery(
        ['leadByAgentId', leadId],
        () =>
            axiosClient.get(
                appRoutes.leads.oneLeadForAgent({
                    leadId,
                }),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ),
        { refetchOnWindowFocus: false }
    )

    const data = res?.data?.data?.data
    console.log(data)

    const [addModalOpen, setAddModalOpen] = useState(false)
    const addCommentRef = useRef<HTMLTextAreaElement>(null!)

    const [isSubmitting, setIsSubmitting] = useState(false)
    const addComment = async () => {
        try {
            setIsSubmitting(true)
            const comment = addCommentRef?.current?.value ?? ''
            if (comment == '') {
                toast.error("Comment can't be empty!")
                return
            }
            const res = await axiosClient.post(
                `/leads/${leadId}/comment`,
                {
                    comment,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (res?.data?.success) {
                toast.success('Comment Added!')
                addCommentRef.current.value = ''
                setIsSubmitting(false)
            } else {
                toast.error('An error has occured!')
                addCommentRef.current.value = ''
                setIsSubmitting(false)
            }
        } catch (e) {
            toast.error('An error has occured!')
            addCommentRef.current.value = ''
            setIsSubmitting(false)
        }
    }

    const onModalClose = () => {
        refetch()
        setAddModalOpen(false)
    }

    const onDeleteComment = async (commentId: number) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure you want to delete this comment?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dd4b39',
                cancelButtonColor: 'var(--theme-default)',
                confirmButtonText: 'Delete Comment',
                reverseButtons: true,
            })

            if (result.isConfirmed) {
                const test = await axiosClient.delete(
                    `/leads/${leadId}/comments/${commentId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                if (test?.data?.success) {
                    toast.success('Comment deleted!')
                    refetch()
                } else {
                    toast.error('An error has occured!')
                }
            }
        } catch (e) {
            toast.error('An error has occured!')
        }
    }

    const { isLight } = useTheme()
    return (
        <>
            <Modal centered isOpen={addModalOpen} toggle={onModalClose}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px 20px 20px 20px',
                        gap: '20px',
                    }}
                >
                    <h2>Add Comment</h2>
                    <textarea rows={10} ref={addCommentRef} />
                    <button disabled={isSubmitting} onClick={addComment}>
                        Add Comment
                    </button>
                </div>
            </Modal>
            <Breadcrumb
                title="All Notes"
                // titleText="Welcome to admin panel"
                parent="Leads"
            />
            <Container fluid>
                <div className="col-xl-12">
                    <Row className="property-2 column-sm property-label property-grid">
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '20px',
                            }}
                        >
                            {data?.name && (
                                <div>
                                    <span>Name: </span>
                                    <span>{data?.name}</span>
                                </div>
                            )}

                            {data?.email && (
                                <div>
                                    <span>Email: </span>
                                    <span>{data?.email}</span>
                                </div>
                            )}

                            {data?.phoneNum && (
                                <div>
                                    <span>Phone: </span>
                                    <span>{data?.phoneNum}</span>
                                </div>
                            )}

                            {data?.createdAt && (
                                <div>
                                    <span>CreatedAt: </span>
                                    <span>
                                        {new Date(
                                            data?.createdAt
                                        )?.toLocaleString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true,
                                        })}
                                    </span>
                                </div>
                            )}

                            {data?.updatedAt && (
                                <div>
                                    <span>UpdatedAt: </span>
                                    <span>
                                        {new Date(
                                            data?.updatedAt
                                        )?.toLocaleString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true,
                                        })}
                                    </span>
                                </div>
                            )}

                            {data?.status && (
                                <div>
                                    <span>Status: </span>
                                    <span>{data?.status}</span>
                                </div>
                            )}
                        </div>
                        {data?.message && (
                            <div>
                                <h2>Message:</h2>
                                <p>{data?.message}</p>
                            </div>
                        )}
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                            }}
                        >
                            <h2>Comments:</h2>
                            {!isAdmin && (
                                <button
                                    onClick={() => setAddModalOpen(true)}
                                    style={{
                                        backgroundColor: 'black',
                                        width: '40px',
                                        height: '40px',
                                        color: 'white',
                                        borderRadius: '100px',
                                        border: 'none',
                                    }}
                                >
                                    +
                                </button>
                            )}
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                            }}
                        >
                            {data?.comments?.map((item: any, index: number) => {
                                return (
                                    <div
                                        key={item?.id + index}
                                        style={{
                                            backgroundColor: isLight
                                                ? 'white'
                                                : 'black',
                                            border: '1px solid black',
                                            padding: '8px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '10px',
                                            borderRadius: '4px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '10px',
                                            }}
                                        >
                                            <div>
                                                <span>CreatedAt:</span>
                                                <span>
                                                    {new Date(
                                                        item?.createdAt
                                                    )?.toLocaleString('en-GB', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: true,
                                                    })}
                                                </span>
                                            </div>

                                            <div>
                                                <span>UpdatedAt:</span>
                                                <span>
                                                    {new Date(
                                                        item?.createdAt
                                                    )?.toLocaleString('en-GB', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: true,
                                                    })}
                                                </span>
                                            </div>

                                            {!isAdmin && (
                                                <button
                                                    className="btn-danger btn"
                                                    style={{
                                                        padding:
                                                            '2px 8px 2px 8px',
                                                    }}
                                                    onClick={() =>
                                                        onDeleteComment(
                                                            item?.id
                                                        )
                                                    }
                                                >
                                                    Delete Comment
                                                </button>
                                            )}
                                        </div>
                                        <p style={{ lineHeight: '24px' }}>
                                            {item?.comment}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </Row>
                </div>
            </Container>
        </>
    )
}

export default InnerLead
