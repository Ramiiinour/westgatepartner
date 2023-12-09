import React from 'react'

export default function Switch({ onClick, onChange, checked }: any) {
    return (
        <div className="layouts-settings">
            <div className="option-setting custom-switch-option-setting custom-switch-in-form">
                <label className="switch">
                    <input
                        type="checkbox"
                        name="chk1"
                        className="setting-check"
                        onClick={onClick}
                        onChange={onChange}
                        checked={checked}
                    />
                    <span className="switch-state" />
                </label>
            </div>
        </div>
    )
}
