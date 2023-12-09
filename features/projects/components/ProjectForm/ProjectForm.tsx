import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Col, Label, Row } from 'reactstrap'
import PaymentPlanOptions from './PaymentPlanOptions'
import { toast } from 'react-toastify'
import ExampleCard from './ExampleCard'
import FloorPlanOptions from './FloorPlanOptions'
import { urls } from '../../../../data/custom-data/urls'
import { projectsData } from '../../data/projectsData'
import { useFilesDropzone } from '../../../../hooks/useFileDropzone'
import { useCurrentTime } from '../../../../hooks/useCurrentTime'
import TextField from '../../../../components/custom-components/forms/TextField'
import NumberField from '../../../../components/custom-components/forms/NumberField'
import SelectField from '../../../../components/custom-components/forms/SelectField'
import { useProjectsTypes } from '../../hooks/useProjectTypes'
import FormLabel from '../../../../components/custom-components/forms/FormLabel'
import Swal from 'sweetalert2'
import ShowIfAgentUser from '../../../auth/components/ShowIfAgentUser'
import { useTextAreaEditor } from '../../../../hooks/useTextAreaEditor'
import { useAgent } from '../../../agents/hooks/useAgent'
import Link from 'next/link'

import { useDeveloper } from '../../../../hooks/useDeveloper'

import { useLoadScript } from '@react-google-maps/api'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete'
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import { useAmenities } from '../../hooks/useAmenities'
import { getData } from '../../../../utils/requests'
import { useAppDispatch, useAppSelector } from '../../../../store'
import {
    setAddress,
    setAmeneties,
    setArea,
    setAreaId,
    setBrochureUrl,
    setCityId,
    setCountryId,
    setDescription,
    setDeveloperId,
    setEconomicAppealDescription,
    setHandOverQuarter,
    setHandOverYear,
    setLocationDescription,
    setMainDescription,
    setPaymentPlan1,
    setPaymentPlan2,
    setPrice,
    setPriceDescription,
    setProjectFloorPlans,
    setProjectStatus,
    setTitle,
    setTotalUnits,
    setType,
    setVideoUrl,
} from '../../../../store/slices/projectFormReducer'

const keyedPlanPaymentsIds = [5, 6, 7]

const statuses = [
    {
        id: 1,
        name: 'In progress',
    },
    {
        id: 2,
        name: 'Ready to move in',
    },
]

const yearsQuarters = ['Q1', 'Q2', 'Q3', 'Q4']
const maxMonthOfQuarters: any = { Q1: 3, Q2: 6, Q3: 9, Q4: 12 }

const AutoComplete = ({
    setAddresString,
    addresString,
    setLat,
    setLng,
    isAdmin,
}: any) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCsNoZLjvJaxAp8Wgiiu79DTA6Diw-e2i8',
        libraries: ['places'],
    })

    if (!isLoaded) return <div>Loading...</div>
    return (
        <PlacesAutocomplete
            setAddresString={setAddresString}
            addresString={addresString}
            setLat={setLat}
            setLng={setLng}
            isAdmin={isAdmin}
        />
    )
}

const PlacesAutocomplete = ({
    setAddresString,
    addresString,
    setLat,
    setLng,
    isAdmin,
}: any) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete()
    const [firsLaunch, setFirsLaunch] = useState(true)

    const handleSelect = async (address: any) => {
        setValue(address, false)
        clearSuggestions()
        setAddresString(address)
        const results = await getGeocode({ address })
        const { lat, lng } = await getLatLng(results[0])
        setLat(lat)
        setLng(lng)
    }

    useEffect(() => {
        if (addresString) setValue(addresString)
    }, [])

    useEffect(() => {
        if (firsLaunch && data.length > 0) {
            clearSuggestions()
            setFirsLaunch(false)
        }
    }, [firsLaunch, data])

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready && isAdmin}
                className="combobox-input admin-form form-control"
                placeholder="Search an address"
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === 'OK' &&
                        data.map(({ place_id, description }) => (
                            <ComboboxOption
                                className="admin-form form-control"
                                key={place_id}
                                value={description}
                            />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    )
}

export default function ProjectForm({
    project,
    isAgent,
    isAdmin,
    onSubmitHandler,
    onDeleteHandler,
    onAddHandler,
}: any) {
    const { projectForm } = useAppSelector((state) => state.persistedReducer)
    const dispatch = useAppDispatch()
    const {
        formState: { errors, isSubmitting },
        handleSubmit,
        register,
        setValue,
        getValues,
        watch,
    } = useForm({
        defaultValues: {
            title: project?.title ?? projectForm.title,
            area: project?.area ?? projectForm.area,
            developerId: project?.developerId ?? projectForm.developerId,
            areaId: parseInt(project?.areaId ?? projectForm.areaId.toString()),
            cityId: parseInt(project?.cityId ?? projectForm.cityId.toString()),
            countryId: parseInt(
                project?.countryId ?? projectForm.countryId.toString()
            ),
            projectStatus: project?.projectStatus ?? projectForm.projectStatus,
            address: project?.address ?? '',
            price: project?.price ?? projectForm.price,
            priceDescription: project?.priceDescription ?? '',
            paybackDescription: project?.paybackDescription ?? '',
            mainPaymentPlanFirstNumber:
                project?.mainPaymentPlanFirstNumber ?? projectForm.paymentPlan1,
            mainPaymentPlanSecondNumber:
                project?.mainPaymentPlanSecondNumber ??
                projectForm.paymentPlan2,
            handOverYear: project?.handOverYear ?? projectForm.handOverYear,
            handOverYearQuarter:
                project?.handOverYearQuarter ?? projectForm.handOverQuarter,
            brochureUrl: project?.brochureUrl ?? '',
            floorPlansBrochureUrl: project?.floorPlansBrochureUrl ?? '',
            videoUrl: project?.videoUrl ?? projectForm.videoUrl,
            videoThumbnailUrl: project?.videoThumbnailUrl ?? '',
            totalAmountOfUnits:
                project?.totalAmountOfUnits ?? projectForm.totalUnits,
            amenitiesIds: project
                ? project?.amenities?.map(
                      (amenity: any) => `${amenity.AmenitiesId}`
                  )
                : projectForm.amentitiesIds,
            type: project?.type ?? projectForm.type,
        },
    })
    const { projectsTypes }: any = useProjectsTypes()
    // const [selectedCountry, setSelectedCountry] = useState(0);
    // const [selectedCity, setSelectedCity] = useState(0);

    const selectedCountryId = watch('countryId')
    const selectedCityId = watch('cityId')
    const selectedTitle = watch('title')
    const selectedAreaId = watch('areaId')
    const selectedType = watch('type')
    const selectedArea = watch('area')
    const selectedDeveloperId = watch('developerId')
    const selectedProjectStatus = watch('projectStatus')
    const selectedTotalUnits = watch('totalAmountOfUnits')
    const selectedHandOverYear = watch('handOverYear')
    const selectedHandOverQuarter = watch('handOverYearQuarter')
    const selectedVideoUrl = watch('videoUrl')
    const selectedPrice = watch('price')
    const selectedPaymentPlan1 = watch('mainPaymentPlanFirstNumber')
    const selectedPaymentPlan2 = watch('mainPaymentPlanSecondNumber')
    const selectedAmeneties = watch('amenitiesIds')

    const [areas, setAreas] = useState<any>([])
    const [cities, setCities] = useState<any>([])

    useEffect(() => {
        if (selectedCountryId != -1) {
            fetchCitiesCountry(selectedCountryId)
            if (!project) dispatch(setCountryId(selectedCountryId))
        }
    }, [selectedCountryId])

    useEffect(() => {
        if (selectedCityId != -1) {
            fetchAreas(selectedCityId)
            if (!project) dispatch(setCityId(selectedCityId))
        }
    }, [selectedCityId])

    useEffect(() => {
        if (!project) dispatch(setTitle(selectedTitle))
    }, [selectedTitle])

    useEffect(() => {
        if (!project) dispatch(setAreaId(selectedAreaId))
    }, [selectedAreaId])

    useEffect(() => {
        if (!project) dispatch(setType(selectedType))
    }, [selectedType])

    useEffect(() => {
        if (!project) dispatch(setArea(selectedArea))
    }, [selectedArea])

    useEffect(() => {
        if (!project) dispatch(setDeveloperId(selectedDeveloperId))
    }, [selectedDeveloperId])

    useEffect(() => {
        if (!project) dispatch(setProjectStatus(selectedProjectStatus))
    }, [selectedProjectStatus])

    useEffect(() => {
        if (!project) dispatch(setTotalUnits(selectedTotalUnits))
    }, [selectedTotalUnits])

    useEffect(() => {
        if (selectedHandOverYear >= currentYear && !project)
            dispatch(setHandOverYear(selectedHandOverYear))
    }, [selectedHandOverYear])

    useEffect(() => {
        if (!project) dispatch(setHandOverQuarter(selectedHandOverQuarter))
    }, [selectedHandOverQuarter])

    useEffect(() => {
        if (!project) dispatch(setVideoUrl(selectedVideoUrl))
    }, [selectedVideoUrl])

    useEffect(() => {
        if (!project) dispatch(setPrice(selectedPrice))
    }, [selectedPrice])

    useEffect(() => {
        if (!project) dispatch(setPaymentPlan1(selectedPaymentPlan1))
    }, [selectedPaymentPlan1])

    useEffect(() => {
        if (!project) dispatch(setPaymentPlan2(selectedPaymentPlan2))
    }, [selectedPaymentPlan2])

    useEffect(() => {
        if (!project) dispatch(setAmeneties(selectedAmeneties))
    }, [selectedAmeneties])

    async function fetchCitiesCountry(countryId: any) {
        try {
            const response = await getData(urls.city.getAll(countryId), 'city')
            console.log(countryId, projectForm.countryId)

            setCities([...response?.data])
            if (response?.data?.length > 0) {
                setValue('cityId', response?.data?.[0]?.id)
            }
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    async function fetchAreas(cityId: any) {
        try {
            const response = await getData(urls.area.getAll(cityId), 'area')

            setAreas([...response?.data])
            console.log('areas', response?.data)

            if (response?.data?.length > 0) {
                setValue('areaId', response?.data?.[0]?.id)
            }
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    // const { cities } = useCitiesCountry(selectedCountry)
    // const { areas } = useAreaCity(selectedCity)

    const [countriesDB, setCountriesDB] = useState<any>([])
    useEffect(() => {
        fetchCountriesFromDB()
    }, [])

    async function fetchCountriesFromDB() {
        const response = await getData(urls.country.getAll, 'country')
        setCountriesDB([...response?.data])
        if (response?.data?.length > 0 && projectForm.countryId == -1) {
            setValue('countryId', response?.data?.[0]?.id)
        }
    }

    const { developers } = useDeveloper()

    const {
        imagesUrls: imagesUrlsMainImage,
        filesdropzoneComponent: filesdropzoneComponentMainImage,
    } = useFilesDropzone(urls.common.routes.properties.uploadPhoto, 5)

    const {
        imagesUrls: brochureUrlPDF,
        filesdropzoneComponent: filesdropzoneComponentBrocuhreUrl,
    } = useFilesDropzone(urls.common.routes.properties.uploadPhoto, 1)

    const {
        imagesUrls: imagesUrlsProjectImages,
        filesdropzoneComponent: filesdropzoneComponentProjectImage,
    } = useFilesDropzone(
        urls.common.routes.properties.uploadPhoto,
        projectsData.images.maxImagesWithoutMainImage
    )

    const {
        imagesUrls: floorPlanBrochureUrlPDF,
        filesdropzoneComponent: filesdropzoneComponentFloorPlanBrocuhreUrl,
    } = useFilesDropzone(urls.common.routes.properties.uploadPhoto, 1)

    useEffect(() => {
        if (!project && floorPlanBrochureUrlPDF?.length > 0 && !project)
            dispatch(setBrochureUrl(floorPlanBrochureUrlPDF))
    }, [floorPlanBrochureUrlPDF])

    // const {
    //   imagesUrls: imagesUrlsLocationImage,
    //   filesdropzoneComponent: filesdropzoneComponentLocationImage,
    // } = useFilesDropzone(urls.common.routes.properties.uploadPhoto, 1);
    // const { countries } = useCountries()
    // const [selectedCountry, setSelectedCountry] = useState(null);
    const [addresString, setAddresString] = useState(projectForm.address)
    useEffect(() => {
        if (!project) dispatch(setAddress(addresString))
    }, [addresString])
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)

    const [paymentPlans, setPaymentPlans] = useState<any>(null)

    const [floorPlans, setFloorPlans] = useState<any>(null)

    useEffect(() => {
        if (!project) dispatch(setProjectFloorPlans(floorPlans))
    }, [floorPlans])

    const [currentStatus, setCurrentStatus] = useState<any>()

    useEffect(() => {
        if (project) {
            setCurrentStatus(project.projectStatus)
        }
        if (!project) setCurrentStatus(projectForm.projectStatus)
    }, [])

    const [currentProjectImagesUrls, setCurrentProjectImagesUrls] = useState([])
    const [currentMainImagesProjectUrls, setCurrentMainImagesProjectUrls] =
        useState([])

    // const [developer, setDeveloper] = useState(project ? project?.developerId : "")
    const { currentYear, currentMonth } = useCurrentTime()

    const { amenities }: any = useAmenities()

    useEffect(() => {
        if (!project) return
        setCurrentProjectImagesUrls(() =>
            project.ImagesProject.map((image: any) => image.name)
        )
        setCurrentMainImagesProjectUrls(() =>
            project.mainImagesProject.map((image: any) => image.image)
        )
        setAddresString(project?.address)
        setLat(project?.lat)
        setLng(project?.lon)
    }, [project])

    const { agent }: any = useAgent(project?.teamMemberId)

    const {
        editorText: mainDescriptionEditorText,
        editorComponent: mainDescriptionEditorComoponent,
    } = useTextAreaEditor(
        project?.mainDescription ?? projectForm.mainDescription,
        isAdmin
    )
    const {
        editorText: descriptionEditorText,
        editorComponent: descriptionEditorComoponent,
    } = useTextAreaEditor(
        project?.description ?? projectForm.description,
        isAdmin
    )
    // const {
    //   editorText: amenitiesDescriptionEditorText,
    //   editorComponent: amenitiesDescriptionEditorComoponent,
    // } = useTextAreaEditor(project?.amenitiesDescription, isAdmin);
    const {
        editorText: economicAppealDescriptionEditorText,
        editorComponent: economicAppealDescriptionEditorComoponent,
    } = useTextAreaEditor(
        project?.economicAppealDescription ??
            projectForm.economicAppealDescription,
        isAdmin
    )
    const {
        editorText: priceDescriptionEditorText,
        editorComponent: priceDescriptionEditorComoponent,
    } = useTextAreaEditor(
        project?.priceDescription ?? projectForm?.priceDescription,
        isAdmin
    )
    const {
        editorText: paybackDescriptionEditorText,
        editorComponent: paybackDescriptionEditorComoponent,
    } = useTextAreaEditor(
        project?.paybackDescription ?? projectForm.paybackDescription,
        isAdmin
    )
    const {
        editorText: locationEditorText,
        editorComponent: locationEditorComoponent,
    } = useTextAreaEditor(
        project?.locationDescription ?? projectForm.locationDescription,
        isAdmin
    )

    useEffect(() => {
        if (typeof mainDescriptionEditorText == 'string' && !project)
            dispatch(setMainDescription(mainDescriptionEditorText))
    }, [mainDescriptionEditorText])

    useEffect(() => {
        if (typeof descriptionEditorText == 'string' && !project)
            dispatch(setDescription(descriptionEditorText))
    }, [descriptionEditorText])

    useEffect(() => {
        if (typeof locationEditorText == 'string' && !project)
            dispatch(setLocationDescription(locationEditorText))
    }, [locationEditorText])

    useEffect(() => {
        if (typeof priceDescriptionEditorText == 'string' && !project)
            dispatch(setPriceDescription(priceDescriptionEditorText))
    }, [priceDescriptionEditorText])

    useEffect(() => {
        if (typeof economicAppealDescriptionEditorText == 'string' && !project)
            dispatch(
                setEconomicAppealDescription(
                    economicAppealDescriptionEditorText
                )
            )
    }, [economicAppealDescriptionEditorText])

    async function onFormSubmit(values: any) {
        let mainImagesProject = []
        if (project) {
            mainImagesProject = [
                ...currentMainImagesProjectUrls,
                ...imagesUrlsMainImage,
            ]
        } else {
            mainImagesProject = imagesUrlsMainImage
        }

        // const mainImagesProject =
        //   imagesUrlsMainImage.length > 0
        //     ? imagesUrlsMainImage
        //     : project.mainImagesProject;
        if (mainImagesProject.length == 0) {
            toast.error('Please add atleast 1 Main Header Image.')
            return
        }
        const allSecondaryimages = [
            ...imagesUrlsProjectImages,
            ...currentProjectImagesUrls,
        ]
        const brochureUrl =
            brochureUrlPDF.length > 0
                ? brochureUrlPDF[0]
                : project
                ? project.brochureUrl
                : ''
        const floorPlansBrochureUrl =
            floorPlanBrochureUrlPDF.length > 0
                ? floorPlanBrochureUrlPDF[0]
                : project
                ? project.floorPlansBrochureUrl
                : ''

        if (allSecondaryimages.length < 5) {
            toast.error(
                'You must upload at least 5 images along with your main image.'
            )
            return
        }

        if (!addresString) {
            toast.error('Please enter the address for project.')
            return
        }

        if (values?.price < 1000) {
            toast.error("Price can't be less than 1000!")
            return
        }
        if (values?.area < 200) {
            toast.error("Area can't be less than 200!")
            return
        }

        let submittedPaymentPlans: any = paymentPlans
            ? Object.values(paymentPlans)
            : []
        let sumPaymentPlans = 0
        for (let i = 0; i < submittedPaymentPlans.length; i++) {
            if (
                submittedPaymentPlans[i].value === null ||
                (keyedPlanPaymentsIds.includes(submittedPaymentPlans[i].id) &&
                    submittedPaymentPlans[i].key === null)
            ) {
                toast.error('Please fill all your payment plans fields.')
                return
            }
            sumPaymentPlans += submittedPaymentPlans[i]['value']
        }
        if (submittedPaymentPlans.length > 0 && sumPaymentPlans !== 100) {
            toast.error(
                `Sum of payment plans values should add up to exactly 100 your total sum is ${sumPaymentPlans}.`
            )
            return
        }

        submittedPaymentPlans = submittedPaymentPlans.map(
            (paymentPlan: any) => {
                return {
                    id: parseInt(paymentPlan.id, 10),
                    key:
                        paymentPlan.key === null
                            ? 0
                            : parseInt(paymentPlan.key, 10),
                    value: parseInt(paymentPlan.value, 10),
                }
            }
        )

        let submittedFloorPlans: any = Object.values(floorPlans)
        for (let i = 0; i < submittedFloorPlans.length; i++) {
            if (
                submittedFloorPlans[i].area === null ||
                submittedFloorPlans[i].startingPrice === null ||
                submittedFloorPlans[i].startingPrice === null
            ) {
                toast.error('Please fill all your floor plans fields.')
                return
            }
        }

        submittedFloorPlans = submittedFloorPlans.map((floorPlan: any) => {
            return {
                ...floorPlan,
                id: parseInt(floorPlan.id, 10),
                startingPrice: floorPlan.startingPrice.toString(),
                area: floorPlan.area.toString(),
                unitType: floorPlan.unitType.toString(),
            }
        })
        let { amenitiesIds } = values
        amenitiesIds = amenitiesIds
            ? amenitiesIds.map((id: any) => parseInt(id, 10))
            : []
        values = {
            ...values,
            projectStatus: parseInt(values.projectStatus, 10),
            area: parseInt(values.area),
            address: addresString,
            lat: lat,
            lon: lng,
            handOverYear:
                currentStatus === projectsData.status.readyToUseStatusId
                    ? null
                    : values['handOverYear'],
            handOverYearQuarter:
                currentStatus === projectsData.status.readyToUseStatusId
                    ? null
                    : values['handOverYearQuarter'],
            paymentPlans: submittedPaymentPlans,
            floorPlans: submittedFloorPlans,
            mainImagesProject: mainImagesProject,
            images: allSecondaryimages,
            mainDescription: mainDescriptionEditorText,
            description: descriptionEditorText,
            // amenitiesDescription: amenitiesDescriptionEditorText,
            economicAppealDescription: economicAppealDescriptionEditorText,
            priceDescription: priceDescriptionEditorText,
            paybackDescription: paybackDescriptionEditorText,
            locationDescription: locationEditorText,
            brochureUrl,
            floorPlansBrochureUrl,
            amenitiesIds,
        }
        await onSubmitHandler(values)
    }

    useEffect(() => {
        if (projectsTypes && projectForm.type == '') {
            if (!project) {
                setValue('type', projectsTypes[0])
            } else {
                setValue('type', project.type)
            }
        }
    }, [projectsTypes])

    useEffect(() => {
        if (!project && currentYear && projectForm.handOverYear == 0) {
            setValue('handOverYear', currentYear)
        }
    }, [currentYear, project])

    // to set these fields with default value
    // useEffect(() => {
    //   if (project) {
    //     setValue("developerId", project?.developerId);
    //     setSelectedCountry(project?.countryId)
    //     setValue("countryId", project?.countryId);
    //   }
    //   if (project && selectedCountry) {
    //     setSelectedCity(project?.cityId)
    //     setValue("cityId", project?.cityId);
    //   }
    //   if (project && selectedCity) {
    //     setValue("areaId", project?.areaId);
    //   }

    // }, [countriesDB, cities, areas])

    async function onArchiveButtonClick() {
        const result = await Swal.fire({
            title: 'Are you sure you want to archive the project?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dd4b39',
            cancelButtonColor: 'var(--theme-default)',
            confirmButtonText: 'Archive Project',
            reverseButtons: true,
        })
        if (result.isConfirmed) {
            onDeleteHandler()
        }
    }

    async function onPublishButtonClick() {
        const result = await Swal.fire({
            title: 'Are you sure you want to publish the project?',
            text: 'This will become public!',
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#198754',
            cancelButtonColor: 'var(--theme-default)',
            confirmButtonText: 'Publish Property',
            reverseButtons: true,
        })
        if (result.isConfirmed) {
            onAddHandler()
        }
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <Row>
                <Col sm="12">
                    {isAdmin && agent && (
                        <div className="d-flex align-items-center flex-wrap justify-content-between">
                            <p className="mb-0 py-2">
                                Owned by {agent.firstName} {agent.lastName}
                            </p>{' '}
                            <Link href={urls.admin.pages.agents.edit(agent.id)}>
                                <button
                                    type="button"
                                    className="btn btn-pill d-flex gap-2 align-items-center py-2"
                                >
                                    Show Profile
                                    <i className="fas fa-arrow-right"></i>
                                </button>
                            </Link>
                        </div>
                    )}
                </Col>
                <Col sm="12" className="form-group mt-3">
                    <TextField
                        name="title"
                        label="Title"
                        placeholder="Palm Jebel Ali"
                        register={register}
                        errors={errors}
                        disabled={isAdmin}
                    />
                </Col>
                <Col sm="6" lg="4" className="form-group mt-3">
                    <SelectField
                        register={register}
                        name="type"
                        label="Type"
                        errors={errors}
                        disabled={isAdmin}
                    >
                        {projectsTypes?.map((type: any) => (
                            <option
                                value={type}
                                key={type}
                                selected={selectedType == type}
                            >
                                {type}
                            </option>
                        ))}
                    </SelectField>
                </Col>
                <Col sm="6" lg="4" className="form-group mt-3">
                    <NumberField
                        name="area"
                        label="Area (sq. ft.)"
                        type="number"
                        placeholder="5000"
                        register={register}
                        errors={errors}
                        min={1}
                        disabled={isAdmin}
                    />
                </Col>
                <Col sm="6" lg="4" className="form-group mt-3">
                    <SelectField
                        register={register}
                        name="developerId"
                        label="Developer"
                        errors={errors}
                        disabled={isAdmin}
                        // defaultValue={project?.developerId}

                        // onChange={(e) => {
                        //   setDeveloper(e.target.value)
                        // }}
                    >
                        <option value="" disabled>
                            Select Developer
                        </option>
                        {developers &&
                            developers.map((developer: any) => (
                                <option
                                    value={developer.id}
                                    key={developer.id}
                                    selected={
                                        selectedDeveloperId == developer?.id
                                    }
                                >
                                    {developer.name}
                                </option>
                            ))}
                    </SelectField>
                </Col>
                <Col sm="3" className="form-group mt-3">
                    <SelectField
                        register={register}
                        name="projectStatus"
                        label="Status"
                        errors={errors}
                        onChange={(e: any) => {
                            setCurrentStatus(parseInt(e.target.value, 10))
                        }}
                        disabled={isAdmin}
                    >
                        {statuses.map((status) => (
                            <option
                                value={status.id}
                                key={status.id}
                                selected={selectedProjectStatus == status?.id}
                            >
                                {status.name}
                            </option>
                        ))}
                    </SelectField>
                </Col>
                <Col sm="3" className="form-group mt-3">
                    <TextField
                        name="totalAmountOfUnits"
                        label="Available Units"
                        placeholder="Available Units"
                        register={register}
                        errors={errors}
                        disabled={isAdmin}
                    />
                </Col>
                {currentStatus != projectsData.status.readyToUseStatusId && (
                    <>
                        <Col sm="6" className="form-group mt-3">
                            {currentYear && (
                                <Row>
                                    <Col sm="9">
                                        <NumberField
                                            name="handOverYear"
                                            label="Handover Year"
                                            register={register}
                                            errors={errors}
                                            placeholder={currentYear}
                                            min={currentYear}
                                            max={3000}
                                            disabled={isAdmin}
                                        />
                                    </Col>

                                    <Col sm="3">
                                        <SelectField
                                            register={register}
                                            name="handOverYearQuarter"
                                            label="Quarter"
                                            errors={errors}
                                            className="miw-75-px"
                                            disabled={isAdmin}
                                            validate={{
                                                correctYearQuarter: (
                                                    value: any
                                                ) =>
                                                    getValues('handOverYear') >
                                                        currentYear ||
                                                    maxMonthOfQuarters[value] >=
                                                        currentMonth ||
                                                    'You must not put a past date.',
                                            }}
                                        >
                                            {yearsQuarters.map(
                                                (quarter, ind) => (
                                                    <option
                                                        value={quarter}
                                                        key={quarter}
                                                        selected={
                                                            selectedHandOverQuarter ==
                                                            quarter
                                                        }
                                                    >
                                                        {quarter}
                                                    </option>
                                                )
                                            )}
                                        </SelectField>
                                    </Col>
                                </Row>
                            )}
                        </Col>
                    </>
                )}

                <Col sm="12">
                    <TextField
                        name="videoUrl"
                        label="Video Url"
                        placeholder="Enter video link (if any)"
                        register={register}
                        errors={errors}
                        disabled={isAdmin}
                        required={false}
                    />
                </Col>

                <Col sm="12" className="form-group mt-3">
                    <FormLabel>Brochure PDF</FormLabel>
                    {(project?.brochureUrl ??
                        projectForm?.brochureUrl.length > 0) && (
                        <div className="form-group my-2 d-flex justify-content-center">
                            <div
                                className="image-wrapper w-100 custom-link"
                                style={{
                                    maxHeight: '300px',
                                }}
                            >
                                <a
                                    href={
                                        project?.brochureUrl ??
                                        projectForm?.brochureUrl?.[0]
                                    }
                                    target="_blank"
                                >
                                    click to download
                                </a>
                            </div>
                        </div>
                    )}
                    <ShowIfAgentUser>
                        {filesdropzoneComponentBrocuhreUrl}
                    </ShowIfAgentUser>
                </Col>

                <h3 className="h6">Location Details</h3>
                <Col sm="6" md="6" className="form-group">
                    <SelectField
                        name="countryId"
                        label="Country"
                        register={register}
                        errors={errors}
                        disabled={isAdmin}
                        required={project ? false : true}

                        // onChange={(e) => {
                        //   setSelectedCountry(e.target.value);
                        // }}
                    >
                        <option value="" disabled>
                            Select Country
                        </option>
                        {countriesDB?.map((country: any) => (
                            <option
                                value={country?.id}
                                key={country?.id}
                                selected={selectedCountryId == country?.id}
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
                        disabled={isAdmin}
                        // onChange={
                        //   (e) => setSelectedCity(e.target.value)
                        // }
                        required={project ? false : true}
                    >
                        <option value="" disabled>
                            Select City
                        </option>
                        {cities?.map((city: any) => (
                            <option
                                value={city?.id}
                                key={city?.id}
                                selected={selectedCityId == city?.id}
                            >
                                {city.name}
                            </option>
                        ))}
                    </SelectField>
                </Col>
                <Col sm="6" md="6" className="form-group">
                    <SelectField
                        name="areaId"
                        label="Area"
                        register={register}
                        errors={errors}
                        disabled={isAdmin}
                        required={project ? false : true}
                        // defaultValue={project?.developerId || null}
                    >
                        <option value="" disabled>
                            Select Area
                        </option>
                        {areas?.map((area: any) => (
                            <option
                                value={area?.id}
                                key={area?.id}
                                selected={selectedAreaId == area?.id}
                            >
                                {area.name}
                            </option>
                        ))}
                    </SelectField>
                </Col>
                <Col sm="6" md="6" className="form-group">
                    {/* <TextField
            name="address"
            label="Address"
            placeholder="Al Manara Tower, Business Bay, Dubai, UAE"
            register={register}
            errors={errors}
            disabled={isAdmin}
          /> */}
                    <label className={`label-color form-label`}>
                        {'Address'}
                    </label>
                    <AutoComplete
                        setAddresString={setAddresString}
                        addresString={addresString}
                        setLat={setLat}
                        setLng={setLng}
                        isAdmin={isAdmin}
                    />
                </Col>

                <Col sm="12" className="form-group">
                    <FormLabel>Location Description</FormLabel>
                    {locationEditorComoponent}
                </Col>
            </Row>

            <h2 className="h5 mt-4">Description Details</h2>
            <hr className="separator mb-1" />
            <Row>
                <Col sm="12" className="form-group mt-3">
                    <FormLabel>Main Description</FormLabel>
                    {mainDescriptionEditorComoponent}
                </Col>
                <Col sm="12" className="form-group mt-3">
                    <FormLabel>Project Description</FormLabel>
                    {descriptionEditorComoponent}
                </Col>
                {/* <Col sm="12" className="form-group mt-3">
          <FormLabel>Amenities Description</FormLabel>
          {amenitiesDescriptionEditorComoponent}
        </Col> */}
                <Col sm="12" className="form-group mt-3">
                    <FormLabel>Economic Appeal Description</FormLabel>
                    {economicAppealDescriptionEditorComoponent}
                </Col>
                <Col sm="12" className="form-group mt-3">
                    <FormLabel>
                        Main Header Image (Recommended 1200 x 800)
                    </FormLabel>
                    <div className="my-2  d-flex gap-5 flex-wrap justify-content-center mb-4">
                        {currentMainImagesProjectUrls?.map((image, ind) => (
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
                                    style={{ objectFit: 'cover' }}
                                />
                                {isAgent && (
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => {
                                            setCurrentMainImagesProjectUrls(
                                                (prev) =>
                                                    prev.filter(
                                                        (tempUrl) =>
                                                            tempUrl !== image
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
                    <ShowIfAgentUser>
                        {filesdropzoneComponentMainImage}
                    </ShowIfAgentUser>
                </Col>
                <Col sm="12" className="form-group mt-3">
                    <FormLabel>
                        Project Image (Recommended 1200 x 800)
                    </FormLabel>
                    <div className="my-2  d-flex gap-5 flex-wrap justify-content-center mb-4">
                        {currentProjectImagesUrls?.map((image, ind) => (
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
                                    style={{ objectFit: 'cover' }}
                                />
                                {isAgent && (
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => {
                                            setCurrentProjectImagesUrls(
                                                (
                                                    prevCurrentProjectImagesUrls
                                                ) =>
                                                    prevCurrentProjectImagesUrls.filter(
                                                        (tempUrl) =>
                                                            tempUrl !== image
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
                    <ShowIfAgentUser>
                        {filesdropzoneComponentProjectImage}
                    </ShowIfAgentUser>
                </Col>
            </Row>

            {(!project ||
                isAgent ||
                (isAdmin && project.projectFloorPlans.length > 0)) && (
                <>
                    <h2 className="h5 mt-4">Floor Plans</h2>
                    <hr className="separator mb-1" />
                    <Row className="mt-3">
                        <Col sm="12" lg="11" xl="8" className="form-group">
                            <FloorPlanOptions
                                disabled={isAdmin}
                                project={project}
                                setFloorPlans={setFloorPlans}
                                initialFloorPlan={projectForm.projectFloorPlans}
                            />
                        </Col>

                        <Col sm="12" className="form-group mt-3">
                            <FormLabel>Floor PlanBrochure PDF</FormLabel>
                            {(project?.floorPlansBrochureUrl ??
                                projectForm.brochureUrl.length > 0) && (
                                <div className="form-group my-2 d-flex justify-content-center">
                                    <div
                                        className="image-wrapper w-100 custom-link"
                                        style={{
                                            maxHeight: '300px',
                                        }}
                                    >
                                        <a
                                            href={
                                                project?.floorPlansBrochureUrl ??
                                                projectForm.brochureUrl?.[0]
                                            }
                                            target="_blank"
                                        >
                                            click to download
                                        </a>
                                    </div>
                                </div>
                            )}
                            <ShowIfAgentUser>
                                {filesdropzoneComponentFloorPlanBrocuhreUrl}
                            </ShowIfAgentUser>
                        </Col>
                    </Row>
                </>
            )}

            <h2 className="h5 mt-4">Price Details</h2>
            <hr className="separator mb-1" />
            <Row>
                <Col sm="6" lg="4" className="form-group mt-3">
                    <NumberField
                        name="price"
                        label="Starting Price From (USD)"
                        type="number"
                        max={1000000000000}
                        register={register}
                        errors={errors}
                        disabled={isAdmin}
                    />
                </Col>
                <Col sm="12" className="form-group mt-3">
                    <FormLabel>Price Description</FormLabel>

                    {/* <ShowIfAgentUser>
            <ExampleCard>
              The initial price for a 1-bedroom apartment amounts to USD 694K.
              The service charge for internal spaces is USD 10 per sq. ft,
              whilst the service charge for balconies amounts to USD 3.
            </ExampleCard>
          </ShowIfAgentUser> */}
                    {priceDescriptionEditorComoponent}
                </Col>
                {/* <Col sm="12" className="form-group mt-3">
          <FormLabel>Payback Description</FormLabel>
          <ShowIfAgentUser>
            <ExampleCard>
              Units have a return on investment rate of approximately 6%, and
              investments can be recouped within 16 to 18 years.
            </ExampleCard>
          </ShowIfAgentUser>
          {paybackDescriptionEditorComoponent}
        </Col> */}
                <h3 className="h6">Payment Plans</h3>
                <Col
                    sm="6"
                    className="form-group mt-3 d-flex align-items-center gap-2"
                >
                    <FormLabel horizontal={true}>Plan</FormLabel>
                    <input
                        type="number"
                        {...register('mainPaymentPlanFirstNumber', {
                            required: {
                                message: 'Plan is required',
                                value: false,
                            },
                            min: {
                                value: 0,
                                message: `Enter a number not less than 0`,
                            },
                            max: {
                                value: 100,
                                message: `Enter a number not greater than 100`,
                            },
                            valueAsNumber: true,
                        })}
                        onChange={(e: any) => {
                            const value = Math.min(e.target.value, 100)
                            setValue('mainPaymentPlanFirstNumber', value)
                            setValue('mainPaymentPlanSecondNumber', 100 - value)
                        }}
                        defaultValue={0}
                        className={`form-control small-input`}
                        disabled={isAdmin}
                    />
                    <span> / </span>
                    <input
                        type="number"
                        {...register('mainPaymentPlanSecondNumber', {
                            required: {
                                message: 'Plan is required',
                                value: false,
                            },
                            min: {
                                value: 0,
                                message: `Enter a number not less than 0`,
                            },
                            max: {
                                value: 100,
                                message: `Enter a number not greater than 100`,
                            },
                            valueAsNumber: true,
                        })}
                        onChange={(e: any) => {
                            const value = Math.min(e.target.value, 100)
                            setValue('mainPaymentPlanSecondNumber', value)
                            setValue('mainPaymentPlanFirstNumber', 100 - value)
                        }}
                        defaultValue={0}
                        className={`form-control small-input`}
                        disabled={isAdmin}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm="12" md="10" lg="9" xl="7" className="form-group">
                    <PaymentPlanOptions
                        readOnly={isAdmin}
                        project={project}
                        setPaymentPlans={setPaymentPlans}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm="12" className="form-group mb-0">
                    <label>Additional Features</label>
                    <div className="additional-checkbox custom-amenities-section">
                        {amenities?.map((amenity: any) => (
                            <Label
                                htmlFor={`chk-ani${amenity.id}`}
                                key={amenity.id}
                                className="d-flex align-items-start"
                            >
                                <input
                                    type="checkbox"
                                    value={`${amenity.id}`}
                                    className="checkbox_animated mb-3 amenity-checkbox"
                                    id={`chk-ani${amenity.id}`}
                                    {...register('amenitiesIds')}
                                    disabled={isAdmin}
                                />
                                <span>{amenity.key}</span>
                            </Label>
                        ))}
                    </div>
                </Col>
            </Row>
            <ShowIfAgentUser>
                <Row>
                    <Col
                        sm="12"
                        className="form-btn d-flex justify-content-center"
                    >
                        <Col sm="12" className="form-btn">
                            <div className="form-group d-grid custom-form-options">
                                <Button
                                    type="submit"
                                    className="btn btn-gradient btn-pill custom-submit-button"
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </Button>
                                {project && (
                                    <div className="d-flex justify-content-end">
                                        <Button
                                            type="button"
                                            className={`btn btn-pill ${
                                                onDeleteHandler
                                                    ? 'btn-danger'
                                                    : 'btn-success'
                                            }`}
                                            onClick={
                                                onDeleteHandler
                                                    ? onArchiveButtonClick
                                                    : onPublishButtonClick
                                            }
                                        >
                                            {onDeleteHandler
                                                ? 'Archive Project'
                                                : 'Publish Project'}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Col>
                </Row>
            </ShowIfAgentUser>
        </form>
    )
}
