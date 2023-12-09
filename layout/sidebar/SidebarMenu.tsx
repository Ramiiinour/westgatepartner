import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ChevronsRight } from 'react-feather'
import {
    AdminSidebarMenuItem,
    AgentSidebarMenuItem,
} from '../../data/sidebarMenu'
import { useAuth } from '../../features/auth/contexts/AuthProvider'

const SidebarMenu = () => {
    const router = useRouter()
    const [activeMenu, setActiveMenu] = useState()
    const [chiledMenu, setChiledMenu] = useState()
    const { isAdmin, isAgent } = useAuth()
    let SidebarMenuItem =
        (isAdmin && AdminSidebarMenuItem) || (isAgent && AgentSidebarMenuItem)

    useEffect(() => {
        if (router.asPath) {
            SidebarMenuItem.forEach((item: any) => {
                if (item.children) {
                    item.children.forEach((child: any) => {
                        if (child.path === router.asPath) {
                            setChiledMenu(child.title)
                            setActiveMenu(item.title)
                            return true
                        } else return false
                    })
                } else {
                    if (item.path === router.asPath) {
                        setActiveMenu(item.title)
                        return true
                    } else return false
                }
            })
        }
    }, [router])

    return (
        <ul className="sidebar-menu custom-scrollbar">
            {SidebarMenuItem &&
                SidebarMenuItem.map((item: any, i: number) => {
                    return (
                        <li key={i} className="sidebar-item">
                            {item.type === 'link' && (
                                <Link
                                    href={`${item.path}`}
                                    className={`sidebar-link only-link d-flex align-items-center gap-1 ${
                                        activeMenu === item.title
                                            ? 'active'
                                            : ''
                                    }`}
                                    onClick={() => {
                                        setActiveMenu(
                                            (prev) =>
                                                prev !== item.title &&
                                                item.title
                                        )
                                    }}
                                >
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            )}
                            {item.type === 'sub' && (
                                <a
                                    href="#"
                                    className={`sidebar-link d-flex align-items-center gap-1 ${
                                        activeMenu === item.title
                                            ? 'active'
                                            : ''
                                    }`}
                                    onClick={() => {
                                        setActiveMenu(
                                            (prev) =>
                                                prev !== item.title &&
                                                item.title
                                        )
                                    }}
                                >
                                    {item.icon}
                                    <span>{item.title}</span>
                                    <div className="according-menu">
                                        <i className="fa fa-angle-right" />
                                    </div>
                                </a>
                            )}
                            {Array.isArray(item.children) && (
                                <ul
                                    className={`nav-submenu menu-content ${
                                        item.title === activeMenu
                                            ? 'd-block'
                                            : 'd-none'
                                    }`}
                                >
                                    {item.children.map(
                                        (child: any, i: number) => {
                                            return (
                                                <li key={i}>
                                                    <Link
                                                        href={`${child.path}`}
                                                        className={`${
                                                            child.title ===
                                                            chiledMenu
                                                                ? 'active'
                                                                : ''
                                                        }`}
                                                        onClick={() => {
                                                            setChiledMenu(
                                                                child.title
                                                            )
                                                        }}
                                                    >
                                                        <ChevronsRight />
                                                        {child.title}
                                                        {child.badge && (
                                                            <span className="label label-shadow ms-1">
                                                                New
                                                            </span>
                                                        )}
                                                    </Link>
                                                </li>
                                            )
                                        }
                                    )}
                                </ul>
                            )}
                        </li>
                    )
                })}
        </ul>
    )
}

export default SidebarMenu
