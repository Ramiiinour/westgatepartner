import React from 'react'
import { Button } from 'reactstrap'
import { BsFillTrashFill } from 'react-icons/bs'
import ShowIfAgentUser from '../../../auth/components/ShowIfAgentUser'

export default function PaymentPlan({
    id,
    name,
    twoFields,
    firstFieldSymbol,
    setPlansValues,
    deletePlan,
    defaultKeyFieldValue,
    defaultValueFieldValue,
    readOnly,
}: any) {
    return (
        <div
            className="d-grid align-items-center"
            style={{ gridTemplateColumns: '1fr auto' }}
        >
            <div
                className="d-grid align-items-center gap-2 justify-items-start"
                style={{ gridTemplateColumns: 'auto 1fr auto' }}
            >
                <div className="d-flex align-items-center gap-2">
                    {twoFields && (
                        <>
                            {<p className="mb-0">{twoFields && 'On'}</p>}
                            <input
                                type="number"
                                onChange={(e: any) => {
                                    if (e.target.value > 100) {
                                        e.target.value = 100
                                    }
                                    console.log(id, 'key', e.target.value)
                                    setPlansValues(id, 'key', e.target.value)
                                }}
                                onBlur={(e: any) => {
                                    if (e.target.value < 1) {
                                        e.target.value = 1
                                    }
                                }}
                                defaultValue={defaultKeyFieldValue}
                                className="form-control small-input"
                                min={1}
                                max={100}
                                disabled={readOnly}
                            />
                            {firstFieldSymbol && (
                                <span>{firstFieldSymbol}</span>
                            )}
                        </>
                    )}
                </div>
                <p className={`mb-0 `}>
                    {!twoFields && 'On'} {name} the payment will be
                </p>
                <div className="d-flex align-items-center gap-2">
                    <input
                        type="number"
                        onChange={(e: any) => {
                            if (e.target.value > 100) {
                                e.target.value = 100
                            }
                            console.log(id, 'value', e.target.value)
                            setPlansValues(id, 'value', e.target.value)
                        }}
                        onBlur={(e: any) => {
                            if (e.target.value < 1) {
                                e.target.value = 1
                            }
                        }}
                        defaultValue={defaultValueFieldValue}
                        className="form-control small-input"
                        min={1}
                        max={100}
                        disabled={readOnly}
                    />
                    <span>%</span>
                </div>
            </div>
            <ShowIfAgentUser>
                <div>
                    <Button
                        className="btn btn-danger px-3 ms-4"
                        onClick={() => {
                            deletePlan(id)
                        }}
                    >
                        <BsFillTrashFill style={{ fontSize: '20px' }} />
                    </Button>
                </div>
            </ShowIfAgentUser>
        </div>
    )
}
