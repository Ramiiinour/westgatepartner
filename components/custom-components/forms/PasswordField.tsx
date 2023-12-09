import React from 'react'
import InputField from './InputField'
import ErrorField from './ErrorField'

export default function PasswordField({
    name,
    label,
    type = 'password',
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
    const passwordProps = {
        label,
        name,
        showLabel,
        errors,
        horizontal,
        containerClassName,
    }

    return (
        <InputField {...passwordProps}>
            <input
                type={type}
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
                className={`form-control ${className ?? ''}`}
                disabled={disabled}
            />
        </InputField>
    )
}
