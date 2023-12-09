import React, { createContext, useContext, useEffect, useState } from 'react'
import SpinLoader from '../components/custom-components/Loaders/SpinLoader/SpinLoader'
import { CSSTransition } from 'react-transition-group'

const LoaderContext = createContext<any>(null)

export default function LoaderProvider({ children }: any) {
    const [loaderCount, setLoaderCount] = useState(0)

    function incrementLoaderCount() {
        setLoaderCount((prevLoadingCount) => prevLoadingCount + 1)
    }

    function decrementLoaderCount() {
        setLoaderCount((prevLoadingCount) => {
            if (prevLoadingCount === 0) {
                throw new Error(
                    'Can not decrement loadings count, there are 0 loadings.'
                )
            }
            return prevLoadingCount - 1
        })
    }

    return (
        <LoaderContext.Provider
            value={{ incrementLoaderCount, decrementLoaderCount }}
        >
            <>
                <CSSTransition
                    in={loaderCount > 0}
                    timeout={250}
                    classNames={'fade'}
                    unmountOnExit
                >
                    <SpinLoader />
                </CSSTransition>
                {children}
            </>
        </LoaderContext.Provider>
    )
}

export function useLoader() {
    return useContext(LoaderContext)
}
