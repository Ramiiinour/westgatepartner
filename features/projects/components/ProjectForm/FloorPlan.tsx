import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Col, Row } from 'reactstrap'
import { useFilesDropzone } from '../../../../hooks/useFileDropzone'
import { urls } from '../../../../data/custom-data/urls'
import SelectField from '../../../../components/custom-components/forms/SelectField'
import NumberField from '../../../../components/custom-components/forms/NumberField'
import TextField from '../../../../components/custom-components/forms/TextField'

const unitTypes = [
    {
        id: 1,
        name: 'Apartment, Type 1A',
    },
    {
        id: 2,
        name: 'Apartment, Type 1B',
    },
    {
        id: 3,
        name: 'Apartment, Type 1C',
    },
    {
        id: 4,
        name: 'Apartment, Type 1D',
    },
    {
        id: 5,
        name: 'Apartment, Type 1E',
    },
    {
        id: 6,
        name: 'Apartment, Type 1',
    },
    {
        id: 7,
        name: 'Apartment, Type 2',
    },
    {
        id: 8,
        name: 'Apartment, Type 7',
    },
    {
        id: 9,
        name: 'Duplex A',
    },
    {
        id: 10,
        name: 'Duplex B',
    },
]

export default function FloorPlan({
    objectId,
    initalFloorPlan,
    setSelectedFloorPlans,
    disabled,
}: any) {
    const {
        formState: { errors },
        register,
    } = useForm({
        defaultValues: {
            unitType: initalFloorPlan.unitType ?? 'Apartment, Type 1A',
            area: initalFloorPlan.area ?? 1,
            startingPrice: initalFloorPlan.startingPrice ?? 0,
        },
    })
    const { imagesUrls, filesdropzoneComponent } = useFilesDropzone(
        urls.common.routes.properties.uploadPhoto,
        5
    )
    const [initialFloorPlansImagesUrls, setInitialFloorPlansImagesUrls] =
        useState([...initalFloorPlan.images])

    useEffect(() => {
        if (imagesUrls && initialFloorPlansImagesUrls) {
            const allImages = [...imagesUrls, ...initialFloorPlansImagesUrls]
            setSelectedFloorPlans({ objectId, images: allImages })
        }
    }, [imagesUrls, initialFloorPlansImagesUrls])

    return (
        <>
            <Row className="mt-3">
                <Col sm="6" md="4" className="form-group">
                    <TextField
                        name="unitType"
                        label="Unit Type"
                        placeholder="Unit Type"
                        register={register}
                        errors={errors}
                        required={false}
                    />
                </Col>
                <Col sm="6" md="4" className="form-group">
                    <NumberField
                        name="startingPrice"
                        label="Starting Price (USD)"
                        max={1000000000000}
                        register={register}
                        errors={errors}
                        onChange={(e: any) => {
                            setSelectedFloorPlans({
                                objectId,
                                startingPrice: e.target.value,
                            })
                        }}
                        disabled={disabled}
                    />
                </Col>
                <Col sm="6" md="4" className="form-group">
                    <NumberField
                        name="area"
                        label="Area (sq. ft)"
                        register={register}
                        max={1000000000}
                        errors={errors}
                        onChange={(e: any) => {
                            setSelectedFloorPlans({
                                objectId,
                                area: e.target.value,
                            })
                        }}
                        min={1}
                        disabled={disabled}
                    />
                </Col>
                <Col sm="12" className="form-group">
                    <label className="label-color form-label">
                        Floor Plan Images
                    </label>
                    <div className="d-flex flex-wrap gap-3 mb-4 ">
                        {initialFloorPlansImagesUrls &&
                            initialFloorPlansImagesUrls.map((image, ind) => (
                                <div
                                    className="image-wrapper img-with-remove-btn"
                                    key={ind}
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                    }}
                                >
                                    <img
                                        src={image}
                                        className="w-100 h-100 border rounded"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    {!disabled && (
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => {
                                                setInitialFloorPlansImagesUrls(
                                                    (
                                                        prevInitialFloorPlansImagesUrls
                                                    ) =>
                                                        prevInitialFloorPlansImagesUrls.filter(
                                                            (tempUrl) =>
                                                                tempUrl !==
                                                                image
                                                        )
                                                )
                                            }}
                                        >
                                            X
                                        </button>
                                    )}
                                </div>
                            ))}
                    </div>
                    {!disabled && filesdropzoneComponent}
                </Col>
            </Row>
        </>
    )
}
