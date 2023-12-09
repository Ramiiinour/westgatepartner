import React from 'react'
import ErrorField from './ErrorField'

export default function InputField({
    name,
    label,
    showLabel,
    showErrors = true,
    errors,
    horizontal,
    children,
    containerClassName,
}: any) {
    // let input;
    // if (type === "text" || type === "date" || type === "password") {
    //   input = (
    //     <input
    //       type={type}
    //       {...register(name, {
    //         required: {
    //           value: required,
    //           message: `${label} field is required.`,
    //         },
    //         pattern: {
    //           value: pattern,
    //           message: `Invalid ${label && label.toLowerCase()}.`,
    //         },
    //         minLength: {
    //           value: minLength,
    //           message: `Minimum number of characters is ${minLength}.`,
    //         },
    //         maxLength: {
    //           value: maxLength,
    //           message: `Maximum number of characters is ${maxLength}.`,
    //         },
    //         validate,
    //         valueAsDate: type === "date",
    //       })}
    //       placeholder={placeholder}
    //       className={`form-control ${className}`}
    //       onChange={onChange}
    //       disabled={disabled}
    //     />
    //   );
    // }

    return (
        <div
            className={`${
                horizontal ? 'd-flex align-items-center gap-5' : ''
            } ${containerClassName ? containerClassName : ''}`}
        >
            {showLabel && label && (
                <label
                    htmlFor={name}
                    className={`label-color form-label ${
                        horizontal ? 'mb-0' : ''
                    }`}
                >
                    {label}
                </label>
            )}
            {children}
            {showErrors && <ErrorField error={errors[name]} />}
        </div>
    )
}
