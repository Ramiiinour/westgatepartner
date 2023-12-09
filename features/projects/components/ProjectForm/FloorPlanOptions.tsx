import React, { createElement, useEffect, useRef, useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import FloorPlan from './FloorPlan'
import { useFloorPlans } from '../../hooks/useFloorPlans'
import ShowIfAgentUser from '../../../auth/components/ShowIfAgentUser'

export default function FloorPlanOptions({
    disabled,
    project,
    setFloorPlans,
    initialFloorPlan,
}: any) {
    const lastId = useRef(1)
    const [selectedFloorPlans, setSelectedFloorPlans] = useState(
        project
            ? initializeFloorPlans
            : initialFloorPlan ?? initializeFloorPlans
    )

    const selectFloorPlanRef = useRef<any>()
    const { floorPlans }: any = useFloorPlans()

    function initializeFloorPlans() {
        let initalFloorPlans: any = {}

        if (project) {
            project.projectFloorPlans.forEach((plan: any) => {
                let images = plan.imagesFloorPlans.map(
                    (imageObject: any) => imageObject.images
                )
                initalFloorPlans[lastId.current] = {
                    id: plan.floorPlanId,
                    area: plan.area,
                    startingPrice: plan.startingPrice,
                    unitType: plan.unitType,
                    images,
                }
                ++lastId.current
            })
        }
        return initalFloorPlans
    }
    useEffect(() => {
        if (selectedFloorPlans) {
            setFloorPlans(selectedFloorPlans)
        }
    }, [selectedFloorPlans])

    function onAddFloorPlanButtonClick() {
        if (floorPlans === null) return
        const id = selectFloorPlanRef.current.value
        const newSelectedFloorPlans = { ...selectedFloorPlans }
        newSelectedFloorPlans[lastId.current] = {
            id,
            unitType: 'Apartment, Type 1A',
            startingPrice: 0,
            area: 1,
            images: [],
        }
        ++lastId.current
        setSelectedFloorPlans(newSelectedFloorPlans)
    }

    function modifySelectedFloorPlans({
        objectId,
        unitType,
        startingPrice,
        area,
        images,
    }: any) {
        const newSelectedFloorPlans = { ...selectedFloorPlans }
        newSelectedFloorPlans[objectId] = {
            id: newSelectedFloorPlans[objectId].id,
            unitType: unitType ?? newSelectedFloorPlans[objectId].unitType,
            startingPrice:
                startingPrice ?? newSelectedFloorPlans[objectId].startingPrice,
            area: area ?? newSelectedFloorPlans[objectId].area,
            images: images ?? newSelectedFloorPlans[objectId].images,
        }
        setSelectedFloorPlans(newSelectedFloorPlans)
    }

    function onClickDeletePlanButton(objectId: any) {
        const newSelectedFloorPlans = { ...selectedFloorPlans }
        delete newSelectedFloorPlans[objectId]
        setSelectedFloorPlans(newSelectedFloorPlans)
    }
    return (
        <>
            {floorPlans && (
                <>
                    <ShowIfAgentUser>
                        <div className="d-flex align-items-center gap-3">
                            <select
                                className="form-control form-select"
                                ref={selectFloorPlanRef}
                            >
                                {floorPlans.map((plan: any) => (
                                    <option value={plan.id} key={plan.id}>
                                        {plan.name}
                                    </option>
                                ))}
                            </select>
                            <Button
                                className="bg-custom_grey hover:!bg-custom_grey_hover"
                                onClick={onAddFloorPlanButtonClick}
                            >
                                Add
                            </Button>
                        </div>
                    </ShowIfAgentUser>

                    {selectedFloorPlans &&
                        floorPlans &&
                        Object.keys(selectedFloorPlans).map((objectId, ind) => (
                            <Col sm="12" key={objectId}>
                                {ind > 0 && <hr className="separator" />}
                                <p className="text-muted h5 mt-3">
                                    {ind + 1}.{' '}
                                    {
                                        floorPlans.find(
                                            (option: any) =>
                                                option.id ==
                                                selectedFloorPlans[objectId].id
                                        )?.name
                                    }
                                </p>
                                <FloorPlan
                                    objectId={objectId}
                                    initalFloorPlan={
                                        selectedFloorPlans[objectId]
                                    }
                                    setSelectedFloorPlans={
                                        modifySelectedFloorPlans
                                    }
                                    disabled={disabled}
                                />
                                {!disabled && (
                                    <div className="d-flex justify-content-end">
                                        <Button
                                            className="bg-danger hover:!bg-danger_hover"
                                            onClick={() => {
                                                onClickDeletePlanButton(
                                                    objectId
                                                )
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                )}
                            </Col>
                        ))}
                </>
            )}
        </>
    )
}
