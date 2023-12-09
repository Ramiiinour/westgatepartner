import React from 'react'
import { ChevronsLeft, Maximize, Search } from 'react-feather'
import { Col, FormGroup, Input, Row } from 'reactstrap'
import Rightbar from './rightbar'
import { useTheme } from '../../contexts/ThemeProvider'

const Header = ({ setToggle, toggle }: any) => {
    const { setIsLight } = useTheme()
    const goFull = () => {
        if (document.fullscreenElement && document.fullscreenElement !== null) {
            document.documentElement.requestFullscreen()
        } else {
            document.exitFullscreen()
        }
    }

    const changeThemeColor = (event: any) => {
        event
            ? document.body.classList.add('dark-layout')
            : document.body.classList.remove('dark-layout')
        setIsLight(!event)
    }

    return (
        <>
            <Row className={`page-main-header ${!toggle ? 'close_icon' : ''}`}>
                <Col id="sidebar-toggle" className="toggle-sidebar col-auto">
                    <ChevronsLeft
                        size={18}
                        onClick={() => setToggle(!toggle)}
                    />
                </Col>
                <Col className="nav-right p-0">
                    <ul className="header-menu gap-3">
                        {/* <li>
              <div className="d-md-none mobile-search">
                <Search />
              </div>
              <FormGroup className="form-group search-form">
                <Input type="text" className="form-control" placeholder="Search here..." />
              </FormGroup>
            </li> */}
                        <div className="layouts-settings">
                            <div className="option-setting custom-switch-option-setting">
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        name="chk1"
                                        defaultValue="option"
                                        className="setting-check"
                                        onClick={(e: any) => {
                                            changeThemeColor(e.target.checked)
                                        }}
                                    />
                                    <span className="switch-state" />
                                </label>
                            </div>
                        </div>

                        <li className="custom-maximize-btn">
                            <Maximize onClick={goFull} />
                        </li>
                        <Rightbar />
                    </ul>
                </Col>
            </Row>
        </>
    )
}

export default Header
