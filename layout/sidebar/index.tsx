import Link from 'next/link'
import React from 'react'
import { ChevronsLeft } from 'react-feather'
import { Media } from 'reactstrap'
import SidebarMenu from './SidebarMenu'
import logoBlue from '../../public/assets/custom-images/logos/logo-blue.svg'
import logoWhite from '../../public/assets/custom-images/logos/logo-white.svg'
// import remarkLogo from "../../public/assets/custom-images/RemarkLogo.svg";
import { useAuth } from '../../features/auth/contexts/AuthProvider'
import { useSitePages } from '../../hooks/useSitePages'

const Sidebar = ({ toggle, setToggle }: any) => {
    const { user } = useAuth()
    const { homePageUrl } = useSitePages()

    return (
        <div className={`page-sidebar ${!toggle ? 'close_icon' : ''}`}>
            <div className="logo-wrap logo-wrap-custom">
                <Link href={homePageUrl}>
                    <img
                        src="/assets/images/WestgateLogo.svg"
                        className="img-fluid for-light"
                        alt=""
                    />
                    <img
                        src="/assets/images/WestgateLogo.svg"
                        className="img-fluid for-dark fill-white"
                        alt=""
                    />
                </Link>
                <div className="back-btn d-lg-none d-inline-block">
                    <ChevronsLeft
                        onClick={() => {
                            setToggle(!toggle)
                        }}
                    />
                </div>
            </div>
            <div className="main-sidebar">
                <div className="user-profile">
                    <Media className="media">
                        <div className="change-pic">
                            <img
                                src={user.avatar}
                                className="img-fluid"
                                alt=""
                            />
                        </div>
                        <Media body className="media-body">
                            <Link href={homePageUrl}>
                                <h6>
                                    {user.firstName} {user.lastName}
                                </h6>
                            </Link>
                            <span className="font-roboto">{user.email}</span>
                        </Media>
                    </Media>
                </div>
                <div id="mainsidebar">
                    <SidebarMenu />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
