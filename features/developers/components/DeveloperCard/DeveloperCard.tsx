import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import Img from '../../../../components/utils/Img'
import { urls } from '../../../../data/custom-data/urls'

const DeveloperCard = ({ developer }: any) => {
    if (developer === undefined || developer === null) return null

    const contentRef = useRef<any>()

    return (
        <>
            <div className="property-box h-100">
                <div className="agent-image">
                    <div style={{ maxHeight: '300px' }}>
                        <Img src={developer?.logo} className="bg-img" alt="" />
                    </div>
                </div>
                <div className="agent-content">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3>
                            <Link
                                href={urls.admin.pages.developer.edit(
                                    developer?.id
                                )}
                            >
                                {developer?.name}
                            </Link>
                        </h3>
                        <h6 className="text-warning">
                            Founded In {developer?.foundIn}
                        </h6>
                    </div>
                    <div
                        className="font-roboto custom-article-content mb-3"
                        ref={contentRef}
                    ></div>
                    <div className="d-flex justify-content-end align-items-center">
                        <Link
                            href={urls.admin.pages.developer.edit(
                                developer?.id
                            )}
                        >
                            Edit Developer{' '}
                            <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeveloperCard
