import React from 'react'

export default function ExampleCard({ children }: any) {
    return (
        <div
            className="card bg-white mb-2 custom-example-card"
            style={{ color: 'rgba(34, 54, 69, 0.7)' }}
        >
            <div className="card-body">
                <p className="card-text">{children}</p>
            </div>
        </div>
    )
}
