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

export default function DeveloperForm({
    developer,
    onSubmitHandler,
    onDeleteHandler,
    isAdmin,
}: any) {
    // const [articleCategoryId, setArticleCategoryId] = useState(article?.articleCategory?.id || "")
    const [createdon, setCreatedon] = useState()

    // for multi areas
    const [selectedAreas, setSelectedAreas] = useState<any>([])
    const [selectedAgents, setSelectedAgents] = useState<any>([])

    const [selectedCountry, setSelectedCountry] = useState<any>(0)
    const [selectedCity, setSelectedCity] = useState<any>(null)

    const [currentDeveloperImagesUrls, setCurrentDeveloperImagesUrls] =
        useState([])

    // set the agent for developer as default value (edit mode)
    useEffect(() => {
        if (!developer) return

        if (developer) {
            developer.area.map((a: any) => {
                setSelectedAreas((oldArray: any) => [...oldArray, a.area.name])
            })
        }

        if (developer) {
            developer.agent.map((a: any) => {
                setSelectedAgents((oldArray: any) => [
                    ...oldArray,
                    `${a.agent.firstName} ${a.agent.lastName}`,
                ])
            })
        }

        setCurrentDeveloperImagesUrls(() =>
            developer?.developerImage?.map((i: any) => i?.image)
        )
    }, [])

    const { countriesDB } = useCountriesFromDB()
    const { cities } = useCitiesCountry(selectedCountry)
    const { areas } = useAreaCity(selectedCity)
    const { agents } = useAgentsNameId()

    const {
        imagesUrls: mainImageUrl,
        filesdropzoneComponent: mainImageUrlFilesDropzoneComponent,
    } = useFilesDropzone(urls.common.routes.properties.uploadPhoto, 1)
    const {
        imagesUrls: logoUrl,
        filesdropzoneComponent: logoUrlFilesDropzoneComponent,
    } = useFilesDropzone(urls.common.routes.properties.uploadPhoto, 1)
    const {
        imagesUrls: developerImageUrls,
        filesdropzoneComponent: developerImageUrlsFilesDropzoneComponent,
    } = useFilesDropzone(urls.common.routes.properties.uploadPhoto, 10)
    const {
        formState: { errors, isSubmitting },
        handleSubmit,
        register,
    } = useForm({
        defaultValues: {
            // title: article ? article.title : "",
            name: developer ? developer?.name : '',
            foundIn: developer ? developer?.foundIn : '',
        },
    })

    const {
        editorText: aboutEditorText,
        editorComponent: aboutEditorComoponent,
    } = useTextAreaEditor(developer?.about, false)
    const {
        editorText: managementEditorText,
        editorComponent: managementEditorComoponent,
    } = useTextAreaEditor(developer?.management, false)
    const {
        editorText: economicAttractivenessEditorText,
        editorComponent: economicAttractivenessEditorComoponent,
    } = useTextAreaEditor(developer?.economicAttractive, false)

    async function onDeleteButtonClick() {
        const result = await Swal.fire({
            title: 'Are you sure you want to delete the developer?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dd4b39',
            cancelButtonColor: 'var(--theme-default)',
            confirmButtonText: 'Delete Developer',
            reverseButtons: true,
        })
        if (result.isConfirmed) {
            onDeleteHandler()
        }
    }
    async function onFormSubmit(values: any) {
        const areaDeveloper = selectedAreas.map((name: any) =>
            getIdByNameAreas(name)
        )
        const agentsList = selectedAgents.map((name: any) =>
            getIdByNameAgents(name)
        )
        const allSecondaryimages = [
            ...developerImageUrls,
            ...currentDeveloperImagesUrls,
        ]

        if (!developer && areaDeveloper.length < 1) {
            toast.error('You must select area.')
            return
        }

        if (!aboutEditorText) {
            toast.error('You must fill about.')
            return
        }

        if (!developer && mainImageUrl.length < 1) {
            toast.error('You must choose main image.')
            return
        }

        if (!developer && logoUrl.length < 1) {
            toast.error('You must choose a logo.')
            return
        }

        if (!developer && developerImageUrls.length < 3) {
            toast.error('You must choose 3 Images at least.')
            return
        }

        const formData = {
            name: values.name,
            foundIn: values.foundIn,
            about: aboutEditorText,
            management: managementEditorText,
            economicAttractive: economicAttractivenessEditorText,
            mainImage: mainImageUrl[0] ? mainImageUrl[0] : developer?.mainImage,
            logo: logoUrl[0] ? logoUrl[0] : developer?.logo,
            developerImage: allSecondaryimages,
            areaDeveloper: [
                ...new Set(
                    areaDeveloper.filter((item: any) => item !== undefined)
                ),
            ],
            agentsList: [
                ...new Set(
                    agentsList.filter((item: any) => item !== undefined)
                ),
            ],
        }
        await onSubmitHandler(formData)
    }

    // for multi selection component
    const classes = useStyles()
    // const isAllSelected =
    //     options.length > 0 && selectedAreas.length === options.length

    const handleChangeAreas = (event: any) => {
        const value = event.target.value
        if (value[value.length - 1] === 'all') {
            setSelectedAreas(
                selectedAreas.length === selectedAreas.length
                    ? []
                    : selectedAreas
            )
            return
        }
        setSelectedAreas(value)
    }

    const handleChangeAgents = (event: any) => {
        const value = event.target.value
        if (value[value.length - 1] === 'all') {
            setSelectedAgents(
                selectedAgents.length === selectedAgents.length
                    ? []
                    : selectedAgents
            )
            return
        }
        setSelectedAgents(value)
    }

    function getIdByNameAreas(name: any) {
        const matchingObject: any = areas.find((item: any) => item.name == name)
        return matchingObject && matchingObject.id
    }
    function getIdByNameAgents(name: any) {
        const matchingObject: any = agents.find(
            (item: any) => `${item.firstName} ${item.lastName}` == name
        )
        return matchingObject && matchingObject.id
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <Row className="gx-3">
                <Row className="align-items-center">
                    <Col sm="6" className="form-group">
                        <TextField
                            name="name"
                            label="Name"
                            placeholder=""
                            register={register}
                            errors={errors}
                        />
                    </Col>
                    <Col sm="6" className="form-group">
                        <TextField
                            name="foundIn"
                            label="Founded In"
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
                            required={developer ? false : true}
                            onChange={(e: any) => {
                                setSelectedCountry(e.target.value)
                            }}
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
                            required={developer ? false : true}
                            onChange={(e: any) =>
                                setSelectedCity(e.target.value)
                            }
                        >
                            <option value="" disabled selected>
                                Select City
                            </option>
                            {cities &&
                                selectedCountry &&
                                cities?.map((city: any) => (
                                    <option value={city?.id} key={city?.id}>
                                        {city.name}
                                    </option>
                                ))}
                        </SelectField>
                    </Col>
                </Row>

                <Row>
                    <Col sm="12" md="12" className="form-group">
                        <InputLabel
                            id="mutiple-select-label"
                            style={{ fontSize: '14px', color: '#6E7275' }}
                        >
                            Select Areas
                        </InputLabel>
                        <FormControl className={classes.formControl}>
                            {/* <InputLabel id="mutiple-select-label">Multiple Select</InputLabel> */}
                            <Select
                                style={{ height: '40px' }}
                                labelId="mutiple-select-label"
                                multiple
                                value={selectedAreas}
                                onChange={handleChangeAreas}
                                renderValue={(selectedAreas) =>
                                    selectedAreas.join(', ')
                                }
                                MenuProps={MenuProps}
                                placeholder="sdf"
                            >
                                {areas?.map((option: any) => (
                                    <MenuItem
                                        key={option?.id}
                                        value={option?.name}
                                    >
                                        <ListItemIcon>
                                            <Checkbox
                                                checked={
                                                    selectedAreas.indexOf(
                                                        option?.name
                                                    ) > -1
                                                }
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    variant="body2"
                                                    style={{ color: '#6E7275' }}
                                                >
                                                    {option?.name}
                                                </Typography>
                                            }
                                        />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Col>
                </Row>

                <Row>
                    <Col sm="12" md="12" className="form-group">
                        <InputLabel
                            id="mutiple-select-label"
                            style={{ fontSize: '14px', color: '#6E7275' }}
                        >
                            Select Agents
                        </InputLabel>
                        <FormControl className={classes.formControl}>
                            {/* <InputLabel id="mutiple-select-label">Multiple Select</InputLabel> */}
                            <Select
                                style={{ height: '40px' }}
                                labelId="mutiple-select-label"
                                multiple
                                value={selectedAgents}
                                onChange={handleChangeAgents}
                                renderValue={(selectedAgents) =>
                                    selectedAgents.join(', ')
                                }
                                MenuProps={MenuProps}
                                placeholder="sdf"
                            >
                                {agents?.map((option: any) => (
                                    <MenuItem
                                        key={option?.id}
                                        value={`${option?.firstName} ${option?.lastName}`}
                                    >
                                        <ListItemIcon>
                                            <Checkbox
                                                checked={
                                                    selectedAgents.indexOf(
                                                        `${option?.firstName} ${option?.lastName}`
                                                    ) > -1
                                                }
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    variant="body2"
                                                    style={{ color: '#6E7275' }}
                                                >{`${option?.firstName} ${option?.lastName}`}</Typography>
                                            }
                                        />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Col>
                </Row>

                <Col sm="12" className="form-group">
                    <FormLabel>About</FormLabel>
                    {aboutEditorComoponent}
                </Col>

                <Col sm="12" className="form-group">
                    <FormLabel>Management (optional)</FormLabel>
                    {managementEditorComoponent}
                </Col>

                <Col sm="12" className="form-group">
                    <FormLabel>Economic Attractiveness(optional)</FormLabel>
                    {economicAttractivenessEditorComoponent}
                </Col>

                <Col sm="12" className="form-group">
                    {developer && (
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
                                        src={developer?.mainImage}
                                        className="w-100 h-100 border rounded"
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    {!developer && <FormLabel>Main Image</FormLabel>}
                    {mainImageUrlFilesDropzoneComponent}
                </Col>
                <Col sm="12" className="form-group">
                    {developer && (
                        <>
                            <FormLabel>Old Logo Preview</FormLabel>
                            <div className="form-group my-2 d-flex justify-content-center">
                                <div
                                    className="image-wrapper w-100"
                                    style={{
                                        maxHeight: '300px',
                                    }}
                                >
                                    <img
                                        src={developer?.logo}
                                        className="w-100 h-100 border rounded"
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    {!developer && <FormLabel>Logo</FormLabel>}
                    {logoUrlFilesDropzoneComponent}
                </Col>
                <Col sm="12" className="form-group">
                    {currentDeveloperImagesUrls &&
                        currentDeveloperImagesUrls?.length > 0 && (
                            <>
                                <div className="my-2  d-flex gap-5 flex-wrap justify-content-center mb-4">
                                    {currentDeveloperImagesUrls &&
                                        currentDeveloperImagesUrls.map(
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
                                                            objectFit: 'cover',
                                                        }}
                                                    />

                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        onClick={() => {
                                                            setCurrentDeveloperImagesUrls(
                                                                (prev) =>
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
                    {!developer && (
                        <FormLabel>Images (required 3 Images)</FormLabel>
                    )}
                    <div className="mt-5">
                        {developerImageUrlsFilesDropzoneComponent}
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

                {developer && (
                    <div className="d-flex justify-content-end">
                        <Button
                            type="button"
                            className="btn btn-danger btn-pill"
                            onClick={onDeleteButtonClick}
                            disabled={isSubmitting}
                        >
                            Delete Developer
                        </Button>
                    </div>
                )}
            </div>
        </form>
    )
}
