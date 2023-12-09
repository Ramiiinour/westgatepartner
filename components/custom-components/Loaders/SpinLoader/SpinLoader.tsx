import React from 'react'
import { BallTriangle , LineWave} from 'react-loader-spinner'

export default function SpinLoader() {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '999',
                padding: '0 50px',
            }}
        >
            <div
                className="custom-spin-loader"
                style={{
                    backgroundColor: '#fff',
                    maxWidth: '350px',
                    width: '100%',
                    height: '250px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '10px',
                    boxShadow: '5px 5px 15px rgba(0,0,0,0.7)',
                }}
            >
                <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color="var(--theme-default2)"
                    ariaLabel="ball-triangle-loading"
                    wrapperClass=""
                    wrapperStyle={{}}
                    visible={true}
                />
            </div>
        </div>
    )
}
