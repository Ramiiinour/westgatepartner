import React from 'react'
import InputField from './InputField'

export default function NumberField({
    name,
    label,
    showLabel = true,
    placeholder,
    required = true,
    register,
    errors,
    showErrors,
    validate,
    min = 0,
    max = 1000000,
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
        showErrors,
        errors,
        horizontal,
        containerClassName,
    }
    return (
        <InputField {...textProps}>
            <input
                type="number"
                {...register(name, {
                    required: {
                        value: required,
                        message: `${label} field is required.`,
                    },
                    min: {
                        value: min,
                        message: `Enter a number not less than ${min}`,
                    },
                    max: {
                        value: max,
                        message: `Enter a number not greater than ${max}`,
                    },
                    validate,
                    valueAsNumber: true,
                    onChange: (e: any) => {
                        if (onChange) {
                            onChange(e)
                        }
                        if (e.target.value > max) {
                            e.target.value = max
                        }
                    },
                    onBlur: (e: any) => {
                        if (e.target.value < min) {
                            e.target.value = min
                        }
                    },
                })}
                defaultValue={min}
                placeholder={placeholder}
                className={`form-control ${className ?? ''}`}
                disabled={disabled}
            />
        </InputField>
    )
}
