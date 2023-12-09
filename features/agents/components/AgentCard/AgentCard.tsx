import Link from 'next/link'
import React, { useState } from 'react'
import Img from '../../../../components/utils/Img'
import SocialAccounts from '../../../../components/Common/SocialAccounts'
import { urls } from '../../../../data/custom-data/urls'

const AgentCard = ({ agent }: any) => {
    if (agent === undefined || agent === null) return null
    const [isShown, setIsShown] = useState(false)
    return (
        <>
            <div className="property-box h-100">
                <div className="agent-image">
                    <div>
                        <Img src={agent.avatar} className="bg-img" alt="" />

                        {agent.properties.length > 0 ? (
                            <span className="label label-shadow">
                                {agent.properties.length} Properties
                            </span>
                        ) : (
                            <span className="label label-shadow">New User</span>
                        )}

                        {(agent.facebookUrl ||
                            agent.twitterUrl ||
                            agent.googleUrl) && (
                            <>
                                <div className="agent-overlay"></div>
                                <div className="overlay-content custom-overlay-content">
                                    <SocialAccounts
                                        facebookUrl={agent.facebookUrl}
                                        twitterUrl={agent.twitterUrl}
                                        googleUrl={agent.googleUrl}
                                    />
                                    <span>Connect</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="agent-content">
                    <h3>
                        <Link href={urls.admin.pages.agents.edit(agent.id)}>
                            {agent.firstName} {agent.lastName}
                        </Link>
                    </h3>
                    <p className="font-roboto">Real estate Agent</p>
                    <ul className="agent-contact">
                        <li
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <i
                                className="fab fa-whatsapp"
                                style={{
                                    fontSize: '12px',
                                }}
                            ></i>
                            <a
                                target="_blank"
                                href={`http://wa.me/${agent?.cellNumber}?text=Hello%20`}
                            >
                                <span className="character">
                                    {isShown
                                        ? agent.cellNumber
                                        : agent.cellNumber.slice(
                                              0,
                                              Math.max(
                                                  agent.cellNumber.length - 5,
                                                  0
                                              )
                                          ) + '*****'}
                                </span>
                            </a>
                            <span
                                className="label label-light-danger user-select-none"
                                onClick={() => {
                                    setIsShown(!isShown)
                                }}
                            >
                                {isShown ? 'hide' : 'show'}
                            </span>
                        </li>
                        <li>
                            <i className="fas fa-envelope"></i> {agent.email}
                        </li>
                    </ul>
                    <Link href={urls.admin.pages.agents.edit(agent.id)}>
                        Edit Agent <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default AgentCard
