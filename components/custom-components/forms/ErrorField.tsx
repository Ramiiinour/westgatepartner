import React from 'react'

export default function ErrorField({ error }: any) {
    return (
        <p
            className={`invalid-feedback d-block ${
                error ? 'opacity-100' : 'opacity-0'
            }`}
        >
            {error?.message} &nbsp;
        </p>
    )
}
