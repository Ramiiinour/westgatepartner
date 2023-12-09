import React from 'react'
import ErrorField from './ErrorField'

export default function SelectField({
    name,
    label,
    required = true,
    register,
    errors,
    horizontal,
    className,
    children,
    onChange,
    disabled,
    validate,
    defaultValue,
}: any) {
    return (
        <div
            className={`${horizontal ? 'd-flex align-items-center gap-5' : ''}`}
        >
            {label && (
                <label
                    htmlFor={name}
                    className={`label-color form-label ${
                        horizontal ? 'mb-0' : ''
                    }`}
                >
                    {label}
                </label>
            )}
            <select
                {...register(name, {
                    required: {
                        value: required,
                        message: `Please select the ${label.toLowerCase()}.`,
                    },
                    onChange,
                    validate,
                })}
                defaultValue={defaultValue}
                className={`form-control form-select ${className}`}
                disabled={disabled}
            >
                {children}
            </select>
            <ErrorField error={errors[name]} />
        </div>
    )
}
