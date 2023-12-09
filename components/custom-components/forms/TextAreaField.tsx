import React from 'react'
import ErrorField from './ErrorField'

export default function TextAreaField({
    name,
    label,
    rows = 6,
    placeholder,
    required = true,
    register,
    errors,
    className,
    disabled,
}: any) {
    return (
        <>
            {label && (
                <label htmlFor={name} className="label-color form-label">
                    {label}
                </label>
            )}
            <textarea
                rows={rows}
                placeholder={placeholder}
                {...register(name, {
                    required: {
                        value: required,
                        message: `${label} field is required.`,
                    },
                })}
                className={`form-control ${className}`}
                disabled={disabled}
            ></textarea>
            <ErrorField error={errors[name]} />
        </>
    )
}
