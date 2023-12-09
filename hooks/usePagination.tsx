import { useEffect, useState } from 'react'
import { getData } from '../utils/requests'
import { useAuth } from '../features/auth/contexts/AuthProvider'

export function usePagination(url: any, initalPage = 1) {
    const { token } = useAuth()
    const [page, setPage] = useState(initalPage)
    const [totalPages, setTotalPages] = useState()
    const [totalCount, setTotalCount] = useState<any>()

    useEffect(() => {
        fetchTotalPages()
    }, [])

    async function fetchTotalPages() {
        const data = await getData(url, token)
        setTotalPages(data?.totalPages)
        setTotalCount(data?.count)
    }

    function fetchPage(page: any) {
        setPage(() => page)
    }

    function fetchNextPage() {
        if (page === totalPages) {
            throw new Error('No further pages to show.')
        }
        setPage((prevPage) => prevPage + 1)
    }
    function fetchPreviousPage() {
        if (page === 1) {
            throw new Error('No previous pages to show.')
        }
        setPage((prevPage) => prevPage - 1)
    }

    return {
        page,
        totalPages,
        totalCount,
        paginationComponent: (
            <>
                {totalCount > 0 && totalPages && (
                    <nav className="theme-pagination d-flex justify-content-center">
                        <ul className="pagination d-flex justify-content-center flex-wrap gap-2">
                            <li className="page-item">
                                <button
                                    className="page-link btn-pagination custom-page-link"
                                    aria-label="Previous"
                                    onClick={() => {
                                        page > 1 ? fetchPreviousPage() : ''
                                    }}
                                    disabled={page === 1}
                                >
                                    <span aria-hidden="true">«</span>
                                    <span className="sr-only">Previous</span>
                                </button>
                            </li>
                            {Array(totalPages)
                                .fill(undefined)
                                .map((_, ind) => (
                                    <li
                                        className={`page-item${
                                            ind + 1 === page ? ' active' : ''
                                        }`}
                                        key={ind}
                                        onClick={() => fetchPage(ind + 1)}
                                    >
                                        <button className="page-link btn-pagination custom-page-link">
                                            {ind + 1}
                                        </button>
                                    </li>
                                ))}
                            <li className="page-item">
                                <button
                                    role="button"
                                    className="page-link btn-pagination custom-page-link"
                                    aria-label="Next"
                                    onClick={() => {
                                        page < totalPages ? fetchNextPage() : ''
                                    }}
                                    disabled={page === totalPages}
                                >
                                    <span aria-hidden="true">»</span>
                                    <span className="sr-only">Next</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            </>
        ),
    }
}
