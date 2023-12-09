import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button, Col, Row } from 'reactstrap'
import Swal from 'sweetalert2'
import { useFilesDropzone } from '../../../../hooks/useFileDropzone'
import { urls } from '../../../../data/custom-data/urls'
import TextField from '../../../../components/custom-components/forms/TextField'
import FormLabel from '../../../../components/custom-components/forms/FormLabel'
import { useTextAreaEditor } from '../../../../hooks/useTextAreaEditor'
import SelectField from '../../../../components/custom-components/forms/SelectField'

import {
    MenuProps,
    useStyles,
    options,
} from '../../../../components//styleForMultiSelection'
import {
    Checkbox,
    Typography,
    FormControl,
    InputLabel,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
} from '@mui/material'

import { useCitiesCountry } from '../../../../hooks/useCitiesCountry'
import { useCountriesFromDB } from '../../../../hooks/useCountriesFromDB'
import { useAreaCity } from '../../../../hooks/useAreaCity'
import { useAgentsNameId } from '../../../../hooks/useAgentsNameId'

import { v4 as uuidv4 } from 'uuid'

import FeatureArea from './FeatureArea'

export default function AreaForm({
    area,
    onSubmitHandler,
    onDeleteHandler,
}: any) {
    // const [articleCategoryId, setArticleCategoryId] = useState(article?.articleCategory?.id || "")
    const [createdon, setCreatedon] = useState()

    // for multi areas
    const [selectedAreas, setSelectedAreas] = useState([])
    const [selectedAgents, setSelectedAgents] = useState([])

    const [selectedCountry, setSelectedCountry] = useState(0)
    const [selectedCity, setSelectedCity] = useState(null)

    const [areaFeatures, setAreaFeatures] = useState<any>([])

    const [currentAreaImagesUrls, setCurrentAreaImagesUrls] = useState([])

    const { countriesDB } = useCountriesFromDB()
    const { cities } = useCitiesCountry(selectedCountry)
    // set the agent for developer as default value (edit mode)
    useEffect(() => {
        if (!area) return
        setValue('cityId', area?.cityId)
        // if (area && selectedCountry) {
        //   setValue("cityId", area?.cityId);
        // }
        // if (area?.cityId) {

        // }
        if (area && area?.areaFeature.length > 0) {
            setAreaFeatures(area?.areaFeature)
        }

        setCurrentAreaImagesUrls(() =>
            area?.areaImage?.map((i: any) => i?.image)
        )
    }, [])

    const {
        imagesUrls: mainImageUrl,
        filesdropzoneComponent: mainImageUrlFilesDropzoneComponent,
    }: any = useFilesDropzone(urls.common.routes.properties.uploadPhoto, 1)

    const {
        imagesUrls: areasImageUrls,
        filesdropzoneComponent: areasImageUrlsFilesDropzoneComponent,
    }: any = useFilesDropzone(urls.common.routes.properties.uploadPhoto, 10)

    const {
        imagesUrls: areaFeatureImageUrls,
        filesdropzoneComponent: areaFeatureImageUrlsFilesDropzoneComponent,
        setImagesUrls: setAreaFeatureImageUrls,
        setUploadedFiles: setUploadedFilesAreaFeature,
    }: any = useFilesDropzone(urls.common.routes.properties.uploadPhoto, 10)

    const {
        formState: { errors, isSubmitting },
        handleSubmit,
        register,
        setValue,
    } = useForm({
        defaultValues: {
            // title: article ? article.title : "",
            name: area ? area?.name : '',
            cityId: area?.cityId,
        },
    })

    const {
        editorText: aboutEditorText,
        editorComponent: aboutEditorComoponent,
    }: any = useTextAreaEditor(area?.about, false)
    const {
        editorText: infrastructureEditorText,
        editorComponent: infrastructureEditorComoponent,
    }: any = useTextAreaEditor(area?.infrastructure, false)
    const {
        editorText: attractionsEditorText,
        editorComponent: attractionsEditorComoponent,
    }: any = useTextAreaEditor(area?.attractions, false)
    const {
        editorText: areaFeaturesEditorText,
        editorComponent: areaFeaturesEditorComoponent,
        setEditorText,
    }: any = useTextAreaEditor('', false)
    // area?.areaFeatures

    async function onDeleteButtonClick() {
        const result = await Swal.fire({
            title: 'Are you sure you want to delete the Area?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dd4b39',
            cancelButtonColor: 'var(--theme-default)',
            confirmButtonText: 'Delete Area',
            reverseButtons: true,
        })
        if (result.isConfirmed) {
            onDeleteHandler()
        }
    }

    async function onFormSubmit(values: any) {
        if (!aboutEditorText) {
            toast.error('You must fill about.')
            return
        }

        if (areaFeatures.length == 0) {
            toast.error('You must fill at least 1 Feature.')
            return
        }

        if (!area && mainImageUrl.length < 1) {
            toast.error('You must choose main image.')
            return
        }

        if (!area && areasImageUrls.length < 3) {
            toast.error('You must choose at least 3 Images.')
            return
        }

        const allSecondaryimages = [...areasImageUrls, ...currentAreaImagesUrls]

        const formData = {
            name: values.name,
            cityId: values.cityId,
            about: aboutEditorText,
            infrastructure: infrastructureEditorText || '',
            attractions: attractionsEditorText || '',
            images: allSecondaryimages,
            mainImage: mainImageUrl[0] || area.mainImage,
            areaFeature: areaFeatures,
        }

        await onSubmitHandler(formData)
    }

    function handleAreaFeatures() {
        if (!areaFeaturesEditorText) {
            toast.error('You must fill area feature text.')
            return
        }

        if (areaFeatureImageUrls.length != 3) {
            toast.error('You must choose three Images only.')
            return
        }

        setAreaFeatures([
            ...areaFeatures,
            {
                id: uuidv4(),
                description: areaFeaturesEditorText,
                featureImage: areaFeatureImageUrls.map((image: any) => ({
                    image: image,
                })),
            },
        ])

        setEditorText('')
        setAreaFeatureImageUrls([])
        setUploadedFilesAreaFeature([])
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <Row className="gx-3">
                <Row className="align-items-center">
                    <Col sm="12" className="form-group">
                        <TextField
                            name="name"
                            label="Name"
                            placeholder=""
                            register={register}
                            errors={errors}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm="6" md="6" className="form-group">
                        <SelectField
                            name="countryId"
                            label="Country"
                            register={register}
                            errors={errors}
                            onChange={(e: any) => {
                                setSelectedCountry(e.target.value)
                            }}
                            required={area ? false : true}
                        >
                            <option value="" disabled selected>
                                Select Country
                            </option>
                            {countriesDB &&
                                countriesDB?.map((country: any) => (
                                    <option
                                        value={country?.id}
                                        key={country?.id}
                                    >
                                        {country.name}
                                    </option>
                                ))}
                        </SelectField>
                    </Col>
                    <Col sm="6" md="6" className="form-group">
                        <SelectField
                            name="cityId"
                            label="City"
                            register={register}
                            errors={errors}
                            required={area ? false : true}
                            onChange={(e: any) =>
                                setSelectedCity(e.target.value)
                            }
                        >
                            <option value="" disabled selected>
                                Select City
                            </option>
                            {cities &&
                                cities?.map((city: any) => (
                                    <option value={city?.id} key={city?.id}>
                                        {city.name}
                                    </option>
                                ))}
                        </SelectField>
                    </Col>
                </Row>

                <Col sm="12" className="form-group">
                    <FormLabel>About</FormLabel>
                    {aboutEditorComoponent}
                </Col>

                <Col sm="12" className="form-group">
                    <FormLabel>Infrastructure (optional)</FormLabel>
                    {infrastructureEditorComoponent}
                </Col>

                <Col sm="12" className="form-group">
                    <FormLabel>Attractions (optional)</FormLabel>
                    {attractionsEditorComoponent}
                </Col>
                <Row>
                    <Col sm="9" className="form-group">
                        <FormLabel>Area Features</FormLabel>
                        <div className="">{areaFeaturesEditorComoponent}</div>

                        <div className="mt-3">
                            {areaFeatureImageUrlsFilesDropzoneComponent}
                        </div>
                    </Col>
                    <Col sm="3" className="d-flex align-items-end mb-4">
                        <div
                            className="btn btn-secondary "
                            onClick={handleAreaFeatures}
                        >
                            Add
                        </div>
                    </Col>
                </Row>
                <Row>
                    {areaFeatures.length > 0 && (
                        <FeatureArea
                            areaFeatures={areaFeatures}
                            setAreaFeatures={setAreaFeatures}
                        />
                    )}
                </Row>

                <Col sm="12" className="form-group">
                    {area && (
                        <>
                            <FormLabel>Old Image Preview</FormLabel>
                            <div className="form-group my-2 d-flex justify-content-center">
                                <div
                                    className="image-wrapper w-100"
                                    style={{
                                        maxHeight: '300px',
                                    }}
                                >
                                    <img
                                        src={area?.mainImage}
                                        className="w-100 h-100 border rounded"
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    {!area && <FormLabel>Main Image</FormLabel>}
                    {mainImageUrlFilesDropzoneComponent}
                </Col>

                <Col sm="12" className="form-group">
                    {area && (
                        <>
                            <FormLabel>Old Images Preview</FormLabel>
                            {currentAreaImagesUrls &&
                                currentAreaImagesUrls?.length > 0 && (
                                    <>
                                        <div className="my-2  d-flex gap-5 flex-wrap justify-content-center mb-4">
                                            {currentAreaImagesUrls &&
                                                currentAreaImagesUrls.map(
                                                    (image, ind) => (
                                                        <div
                                                            className="image-wrapper img-with-remove-btn"
                                                            key={ind}
                                                            style={{
                                                                width: '200px',
                                                                height: '200px',
                                                            }}
                                                        >
                                                            <img
                                                                src={image}
                                                                className="w-100 h-100 border rounded"
                                                                style={{
                                                                    objectFit:
                                                                        'cover',
                                                                }}
                                                            />

                                                            <button
                                                                type="button"
                                                                className="btn btn-danger"
                                                                onClick={() => {
                                                                    setCurrentAreaImagesUrls(
                                                                        (
                                                                            prev
                                                                        ) =>
                                                                            prev.filter(
                                                                                (
                                                                                    tempUrl
                                                                                ) =>
                                                                                    tempUrl !==
                                                                                    image
                                                                            )
                                                                    )
                                                                }}
                                                            >
                                                                X
                                                            </button>
                                                        </div>
                                                    )
                                                )}
                                        </div>
                                    </>
                                )}
                        </>
                    )}
                    {!area && <FormLabel>Images (required 3 Images)</FormLabel>}
                    <div className="mt-5">
                        {areasImageUrlsFilesDropzoneComponent}
                    </div>
                </Col>
            </Row>

            <div className="form-group custom-agent-form-options">
                <Button
                    type="submit"
                    className="btn btn-gradient btn-pill"
                    style={{ gridColumnStart: 2 }}
                >
                    Submit
                </Button>

                {area && (
                    <div className="d-flex justify-content-end">
                        <Button
                            type="button"
                            className="btn btn-danger btn-pill"
                            onClick={onDeleteButtonClick}
                            disabled={isSubmitting}
                        >
                            Delete Area
                        </Button>
                    </div>
                )}
            </div>
        </form>
    )
}
