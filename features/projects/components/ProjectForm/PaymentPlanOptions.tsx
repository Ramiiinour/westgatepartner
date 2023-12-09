import React, { createElement, useEffect, useRef, useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import { toast } from 'react-toastify'
import PaymentPlan from './PaymentPlan'
import { convertArrayToMap } from '../../../../utils/arrays'
import ShowIfAgentUser from '../../../auth/components/ShowIfAgentUser'

const plansOptions = [
    {
        id: 1,
        name: 'Booking',
    },
    {
        id: 2,
        name: 'Construction',
    },
    {
        id: 3,
        name: 'Handover',
    },
    {
        id: 4,
        name: 'Down Payment',
    },
    {
        id: 5,
        name: 'Completion',
    },
    {
        id: 6,
        name: 'After Months From Handover',
    },
    {
        id: 7,
        name: 'Installment',
    },
]

const twoFieldsPlans = [
    'Completion',
    'After Months From Handover',
    'Installment',
]

export default function PaymentPlanOptions({
    readOnly,
    project,
    setPlanOptions,
}: any) {
    const [paymentPlansOptions, setPaymentPlansOptions] = useState<any>(null)
    const selectPaymentPlanRef = useRef<any>()
    const [plansValues, setPlansValues] = useState<any>({})
    const [plansComponents, setPlansComponents] = useState<any>({})

    const lastId = useRef(1)
    useEffect(() => {
        let options: any = convertArrayToMap(plansOptions, 'id')
        if (project) {
            console.log('lmao')

            project.projectPaymentPlans.forEach((plan: any) => {
                addPaymentPlan(
                    plan.paymentPlanId,
                    options[plan.paymentPlanId].name,
                    plan.key,
                    plan.value
                )
            })
        }
        setPaymentPlansOptions(options)
    }, [])

    function modifyPlanValues(id: any, fieldKey: any, value: any) {
        if (!(id in plansValues)) {
            throw new Error('Id in plan values does not exist')
        }
        // const newPlansValues: any = { ...plansValues }
        // console.log('new one', newPlansValues)

        // newPlansValues[id][fieldKey] = parseInt(value, 10)
        // console.log('value', value)
        // console.log('key', fieldKey), console.log('id', id)
        // console.log('mine', plansValues[id])

        setPlansValues((prev: any) => ({
            ...prev,
            [id]: { ...prev[id], [fieldKey]: parseInt(value, 10) },
        }))
    }

    function onAddPaymentPlanButtonClick() {
        if (paymentPlansOptions === null) return
        let planName =
            paymentPlansOptions[selectPaymentPlanRef.current.value]?.name
        if (!planName) {
            toast.error('Please select a plan.')
            return
        }
        const planId = parseInt(selectPaymentPlanRef.current.value, 10)
        if (
            !twoFieldsPlans.includes(planName) &&
            Object.keys(plansValues)
                .map((planId) => plansValues[planId])
                .find((plan) => plan.id == planId)
        ) {
            toast.error('Plan is already added.')
            return
        }
        addPaymentPlan(planId, planName)
    }

    function onDeletePaymentPlanClick(id: any) {
        const newPlansComponents = { ...plansComponents }
        delete newPlansComponents[id]
        setPlansComponents(newPlansComponents)

        const newPlansValues = { ...plansValues }
        delete newPlansValues[id]
        setPlansValues(newPlansValues)
    }

    function addPaymentPlan(
        planId: any,
        planName: any,
        value = null,
        key = null
    ) {
        let newComponent: any = null
        if (twoFieldsPlans.includes(planName)) {
            newComponent = (
                <PaymentPlan
                    id={lastId.current}
                    name={planName}
                    defaultKeyFieldValue={key}
                    defaultValueFieldValue={value}
                    twoFields={true}
                    readOnly={readOnly}
                    firstFieldSymbol={planName === 'Completion' ? '%' : null}
                />
            )
        } else {
            newComponent = (
                <PaymentPlan
                    id={lastId.current}
                    name={planName}
                    twoFields={false}
                    defaultKeyFieldValue={key}
                    defaultValueFieldValue={value}
                    readOnly={readOnly}
                />
            )
        }
        const currentLastId = lastId.current
        setPlansComponents((prevPlanComponents: any) => {
            return { ...prevPlanComponents, [currentLastId]: newComponent }
        })

        setPlansValues((prevPlanValues: any) => {
            return {
                ...prevPlanValues,
                [currentLastId]: { id: planId, key, value },
            }
        })

        ++lastId.current
    }

    return (
        <>
            {paymentPlansOptions && (
                <>
                    <ShowIfAgentUser>
                        <div className="d-flex align-items-center gap-3">
                            <select
                                className="form-control form-select"
                                ref={selectPaymentPlanRef}
                            >
                                <option hidden>Add Payment Plan</option>
                                {plansOptions.map((plan) => (
                                    <option value={plan.id} key={plan.id}>
                                        {plan.name}
                                    </option>
                                ))}
                            </select>
                            <Button
                                className="btn btn-secondary"
                                onClick={onAddPaymentPlanButtonClick}
                            >
                                Add
                            </Button>
                        </div>
                    </ShowIfAgentUser>
                    {Object.keys(plansComponents).map((componentKey, ind) => (
                        <Row className="mt-3" key={componentKey}>
                            <Col sm="12">
                                {ind > 0 && <hr className="separator" />}
                                <p className="text-muted mt-3">
                                    Payment Plan {ind + 1}:
                                </p>
                                {createElement(
                                    plansComponents[componentKey].type,
                                    {
                                        setPlansValues: modifyPlanValues,
                                        deletePlan: onDeletePaymentPlanClick,
                                        ...plansComponents[componentKey].props,
                                    }
                                )}
                            </Col>
                        </Row>
                    ))}
                    <ShowIfAgentUser>
                        {plansValues && Object.keys(plansValues).length > 0 && (
                            <Row className="mt-4">
                                <Col sm={{ size: 6, offset: 6 }}>
                                    <hr className="separator" />
                                    <p className="font-roboto text-end">
                                        {' '}
                                        Total sum of percentages:{' '}
                                        <span className="fw-bold">
                                            {Object.keys(plansValues).reduce(
                                                (accumulator, id) => {
                                                    return (
                                                        (isNaN(
                                                            plansValues[id]
                                                                .value
                                                        )
                                                            ? 0
                                                            : plansValues[id]
                                                                  .value) +
                                                        accumulator
                                                    )
                                                },
                                                0
                                            )}
                                        </span>
                                    </p>
                                </Col>
                            </Row>
                        )}
                    </ShowIfAgentUser>
                </>
            )}
        </>
    )
}
