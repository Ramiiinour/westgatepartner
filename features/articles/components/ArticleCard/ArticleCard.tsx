import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import Img from '../../../../components/utils/Img'
import { urls } from '../../../../data/custom-data/urls'

const ArticleCard = ({ article }: any) => {
    if (article === undefined || article === null) return null
    const parser = new DOMParser()
    const contentRef = useRef<any>()
    useEffect(() => {
        contentRef.current.appendChild(
            parser.parseFromString(article.description, 'text/html').body
        )
    }, [])
    return (
        <>
            <div className="property-box h-100">
                <div className="agent-image">
                    <div style={{ maxHeight: '300px' }}>
                        <Img src={article.image} className="bg-img" alt="" />
                        {/* {agent.properties > 0 ? (
              <span className="label label-shadow">
                {agent.properties} Properties
              </span>
            ) : (
              <span className="label label-shadow">New User</span>
            )} */}
                    </div>
                </div>
                <div className="agent-content">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3>
                            <Link
                                href={urls.admin.pages.articles.edit(
                                    article.id
                                )}
                            >
                                {article.title}
                            </Link>
                        </h3>
                        <h6 className="text-warning">
                            {article?.articleCategory?.name}
                        </h6>
                    </div>
                    <div
                        className="font-roboto custom-article-content mb-3"
                        ref={contentRef}
                    ></div>
                    <div className="d-flex justify-content-end align-items-center">
                        <Link href={urls.admin.pages.articles.edit(article.id)}>
                            Edit Article <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ArticleCard
