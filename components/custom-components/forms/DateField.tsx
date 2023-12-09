import React from 'react'
import InputField from './InputField'
import ErrorField from './ErrorField'

export default function DateField({
    name,
    label,
    showLabel = true,
    placeholder,
    required = true,
    register,
    errors,
    validate,
    horizontal,
    disabled,
    className,
    onChange,
    containerClassName,
}: any) {
    const dateProps = {
        label,
        name,
        showLabel,
        errors,
        horizontal,
        containerClassName,
    }

    return (
        <InputField {...dateProps}>
            <input
                type="date"
                {...register(name, {
                    required: {
                        value: required,
                        message: `${label} field is required.`,
                    },
                    onChange,
                    validate,
                    valueAsDate: true,
                })}
                placeholder={placeholder}
                className={`form-control ${className}`}
                disabled={disabled}
            />
        </InputField>
    )
}
