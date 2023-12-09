import React from 'react'

export default function FormLabel({
    name,
    horizontal = false,
    className,
    children,
}: any) {
    return (
        <label
            htmlFor={name}
            className={`label-color form-label ${horizontal ? 'mb-0' : ''} ${
                className ?? ''
            }`}
        >
            {children}
        </label>
    )
}
