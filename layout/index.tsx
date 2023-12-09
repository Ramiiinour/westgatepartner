import React, { useEffect, useState } from 'react'
import Footer from '../components/Common/Footer'
import Customizer from './customizer/Customizer'
import Header from './header'
import Sidebar from './sidebar'
import TapToTop from './TapToTop'
import RequireAuth from '../features/auth/components/RequireAuth'

const Layout = ({ children }: any) => {
    const [toggle, setToggle] = useState<any>()

    const handleResize = () => {
        if (window.innerWidth > 991) {
            setToggle(true)
        } else {
            setToggle(false)
        }
    }
    useEffect(() => {
        setToggle(window.innerWidth > 991)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <>
            <RequireAuth>
                <div className="page-wrapper">
                    <Header setToggle={setToggle} toggle={toggle} />
                    <div className="page-body-wrapper">
                        <Sidebar toggle={toggle} setToggle={setToggle} />
                        <div className="page-body">{children}</div>
                        <Footer />
                    </div>
                    <TapToTop />
                    {/* <Customizer /> */}
                </div>
            </RequireAuth>
        </>
    )
}

export default Layout
