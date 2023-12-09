import React from 'react'
import InputField from './InputField'
import ErrorField from './ErrorField'

export default function TextField({
    name,
    label,
    showLabel = true,
    placeholder,
    required = true,
    register,
    errors,
    validate,
    pattern,
    minLength,
    maxLength = 1000000,
    horizontal,
    disabled,
    className,
    onChange,
    containerClassName,
}: any) {
    const textProps = {
        label,
        name,
        showLabel,
        errors,
        horizontal,
        containerClassName,
    }

    return (
        <InputField {...textProps}>
            <input
                type="text"
                {...register(name, {
                    required: {
                        value: required,
                        message: `${label} field is required.`,
                    },
                    pattern: {
                        value: pattern,
                        message: `Invalid ${label && label.toLowerCase()}.`,
                    },
                    minLength: {
                        value: minLength,
                        message: `Minimum number of characters is ${minLength}.`,
                    },
                    maxLength: {
                        value: maxLength,
                        message: `Maximum number of characters is ${maxLength}.`,
                    },
                    onChange,
                    validate,
                })}
                placeholder={placeholder}
                className={`form-control ${className}`}
                disabled={disabled}
            />
        </InputField>
    )
}
