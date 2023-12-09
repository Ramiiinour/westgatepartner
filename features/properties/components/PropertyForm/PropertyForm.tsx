import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Col, Label, Row } from 'reactstrap'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { useFilesDropzone } from '../../../../hooks/useFileDropzone'
import { urls } from '../../../../data/custom-data/urls'
import { useAmenities } from '../../hooks/useAmenities'

import { useCountries } from '../../../../hooks/useCountries'
import { useCitiesCountry } from '../../../../hooks/useCitiesCountry'
import { useCountriesFromDB } from '../../../../hooks/useCountriesFromDB'
import { useDeveloper } from '../../../../hooks/useDeveloper'
import { useAreaCity } from '../../../../hooks/useAreaCity'

import TextField from '../../../../components/custom-components/forms/TextField'
import NumberField from '../../../../components/custom-components/forms/NumberField'
import SelectField from '../../../../components/custom-components/forms/SelectField'
import { usePropertiesTypes } from '../../hooks/usePropertiesTypes'
import { getSpecificaitonsAsObject } from '../../utils/propertiesUtils'
import FormLabel from '../../../../components/custom-components/forms/FormLabel'
import Switch from '../../../../components/custom-components/forms/Switch'
import { getData, postData } from '../../../../utils/requests'
import { useAuth } from '../../../auth/contexts/AuthProvider'
import { useLoader } from '../../../../contexts/LoaderProvider'
import { useAgent } from '../../../agents/hooks/useAgent'
import Link from 'next/link'
// import { usePropertyOfTheDay } from "../../hooks/usePropertyOfTheDay";
import { useTextAreaEditor } from '../../../../hooks/useTextAreaEditor'
import { propertiesData } from '../../data/propertiesData'
import { LocationSearchInput } from '../LocationSearchInput'
import ImageCropper from '../../../../components/custom-components/forms/ImageCropper'
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
import { useAppDispatch, useAppSelector } from '../../../../store'
import {
    setAddress,
    setAmeneties,
    setArea,
    setAreaId,
    setBaths,
    setCityId,
    setCountryId,
    setDescription,
    setDeveloperId,
    setLandmark,
    setPhone,
    setPropertyPrice,
    setPropertyRef,
    setPropertyStatus,
    setPropertyType,
    setRooms,
    setTitle,
    setVideoUrl,
    setZipCode,
} from '../../../../store/slices/propertyFormReducer'

const maxNumberOfRooms = 12
const maxNumberOfBaths = 12

const propertyStatus = [
    { id: 1, name: 'For Rent' },
    { id: 2, name: 'For Sale' },
]

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

export default function PropertyForm({
    property,
    isAgent,
    isAdmin,
    onSubmitHandler,
    onDeleteHandler,
    onAddHandler,
}: any) {
    const { propertyForm } = useAppSelector((state) => state.persistedReducer)
    const {
        setValue,
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting },
        watch,
    } = useForm({
        defaultValues: {
            countryId: property?.countryId ?? propertyForm.countryId,
            cityId: property?.cityId ?? propertyForm.cityId,
            areaId: property?.areaId ?? propertyForm.areaId,
            title: property?.title ?? propertyForm.title,
            propertyStatus: property
                ? property.isrent
                    ? 'For Rent'
                    : 'For Sale'
                : propertyForm.propertyStatus,
            propertyPrice:
                property?.propertyPrice ?? propertyForm.propertyPrice,
            area: property?.area ?? propertyForm.area,
            propertyRef: property?.propertyRef ?? propertyForm.propertyRef,
            address: property ? property.address : '',
            zipCode: property?.zipCode ?? propertyForm.zipCode,
            phone: property?.phone ?? propertyForm.phone,
            videoUrl: property?.videoUrl ?? propertyForm.videoUrl,
            amenetiesIds: property
                ? property.amenities.map(
                      (amenity: any) => `${amenity.AmenitiesId}`
                  )
                : propertyForm.amentitiesIds,
            developerId: property ? property?.developerId : 0,
            rooms: property?.rooms ?? propertyForm.rooms,
            baths: property?.baths ?? propertyForm.baths,
            landmark: property?.landmark ?? propertyForm.landmark,
            propertyType: '',
        },
    })
    const dispatch = useAppDispatch()

    const selectedCountryId = watch('countryId')
    const selectedCityId = watch('cityId')
    const selectedAreaId = watch('areaId')
    const selectedTitle = watch('title')
    const selectedPropertyType = watch('propertyType')
    const selectedPropertyStatus = watch('propertyStatus')
    const selectedPropertyPrice = watch('propertyPrice')
    const selectedRooms = watch('rooms')
    const selectedBaths = watch('baths')
    const selectedDeveloperId = watch('developerId')
    const selectedLandmark = watch('landmark')
    const selectedArea = watch('area')
    const selectedPropertyRef = watch('propertyRef')
    const selectedZipCode = watch('zipCode')
    const selectedPhone = watch('phone')
    const selectedAmeneties = watch('amenetiesIds')
    const selectedVideoUrl = watch('videoUrl')

    useEffect(() => {
        console.log('title', selectedTitle)
        if (!property) dispatch(setTitle(selectedTitle))
    }, [selectedTitle])

    useEffect(() => {
        if (!property) dispatch(setPropertyType(selectedPropertyType))
    }, [selectedPropertyType])

    useEffect(() => {
        if (!property) dispatch(setPropertyStatus(selectedPropertyStatus))
    }, [selectedPropertyStatus])

    useEffect(() => {
        if (!property) dispatch(setPropertyPrice(selectedPropertyPrice))
    }, [selectedPropertyPrice])

    useEffect(() => {
        if (!property) dispatch(setRooms(selectedRooms))
    }, [selectedRooms])

    useEffect(() => {
        if (!property) dispatch(setBaths(selectedBaths))
    }, [selectedBaths])

    useEffect(() => {
        if (!property) dispatch(setDeveloperId(selectedDeveloperId))
    }, [selectedDeveloperId])

    useEffect(() => {
        if (!property) dispatch(setLandmark(selectedLandmark))
    }, [selectedLandmark])

    useEffect(() => {
        if (!property) dispatch(setArea(selectedArea))
    }, [selectedArea])

    useEffect(() => {
        if (!property) dispatch(setPropertyRef(selectedPropertyRef))
    }, [selectedPropertyRef])

    useEffect(() => {
        if (!property) dispatch(setZipCode(selectedZipCode))
    }, [selectedZipCode])

    useEffect(() => {
        if (!property) dispatch(setPhone(selectedPhone))
    }, [selectedPhone])

    useEffect(() => {
        if (!property) dispatch(setAmeneties(selectedAmeneties))
    }, [selectedAmeneties])

    useEffect(() => {
        if (!property) dispatch(setVideoUrl(selectedVideoUrl))
    }, [selectedVideoUrl])

    const { imagesUrls, filesdropzoneComponent } = useFilesDropzone(
        urls.common.routes.properties.uploadPhoto,
        propertiesData.pagination.countPerPage
    )
    const {
        imagesUrls: mainImageUrl,
        filesdropzoneComponent: mainImageFilesdropzoneComponent,
    } = useFilesDropzone(urls.common.routes.properties.uploadPhoto, 1)

    const [addresString, setAddresString] = useState(propertyForm.address)

    useEffect(() => {
        if (!property) dispatch(setAddress(addresString))
    }, [addresString])

    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    // const { countries } = useCountries();
    const { amenities }: any = useAmenities()

    const { propertiesTypes }: any = usePropertiesTypes()
    const { token } = useAuth()
    const { incrementLoaderCount, decrementLoaderCount } = useLoader()
    const { agent }: any = useAgent(property?.teamMemberId)

    const [formSubmitted, setFormSubmitted] = useState(false)
    const [currentPropertyImagesUrls, setCurrentPropertyImagesUrls] = useState(
        []
    )

    const [areas, setAreas] = useState<any>([])
    const [cities, setCities] = useState<any>([])
    const [countriesDB, setCountriesDB] = useState<any>([])

    useEffect(() => {
        if (selectedCountryId != -1) {
            fetchCitiesCountry(selectedCountryId)
            if (!property) dispatch(setCountryId(selectedCountryId))
        }
    }, [selectedCountryId])

    useEffect(() => {
        if (selectedCityId != -1) {
            fetchAreas(selectedCityId)
            if (!property) dispatch(setCityId(selectedCityId))
        }
    }, [selectedCityId])

    useEffect(() => {
        if (!property) dispatch(setAreaId(selectedAreaId))
    }, [selectedAreaId])

    useEffect(() => {
        fetchCountriesFromDB()
    }, [])

    async function fetchCountriesFromDB() {
        const response = await getData(urls.country.getAll, 'country')
        setCountriesDB([...response?.data])
        if (response?.data?.length > 0 && propertyForm.countryId == -1) {
            setValue('countryId', response?.data?.[0]?.id)
        }
    }

    async function fetchCitiesCountry(countryId: any) {
        try {
            const response = await getData(urls.city.getAll(countryId), 'city')

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
            if (response?.data?.length > 0) {
                setValue('areaId', response?.data?.[0]?.id)
            }
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    const [developers, setDevelopers] = useState([])

    const [specifications, _] = useState(
        () => property && getSpecificaitonsAsObject(property?.specification)
    )
    const [isFeatured, setIsFeatured] = useState<any>(null)
    const {
        editorText: propertyEditorText,
        editorComponent: propertyEditorComponent,
    } = useTextAreaEditor(
        property?.description ?? propertyForm.description,
        isAdmin
    )

    useEffect(() => {
        if (typeof propertyEditorText == 'string' && !property)
            dispatch(setDescription(propertyEditorText))
    }, [propertyEditorText])

    // const { propertyOfTheDay, togglePropertyOfTheDay } = usePropertyOfTheDay(property.id);

    useEffect(() => {
        fetchDeveloperCountry()
    }, [])

    async function fetchDeveloperCountry() {
        const response = await getData(urls.developer.getNames, 'test100')
        setDevelopers(response?.data)
        if (response?.data?.length > 0)
            setValue('developerId', response?.data?.[0]?.id)
    }

    useEffect(() => {
        if (!property) return
        setCurrentPropertyImagesUrls(
            property.images.map((image: any) => image.link)
        )
        setIsFeatured(property.isFeature)
        setAddresString(property?.address)
        setLat(property?.lat)
        setLng(property?.lon)
    }, [property])

    useEffect(() => {
        if (specifications) {
            setValue('rooms', specifications.Rooms)
            setValue('baths', specifications.Bath)
            setValue('landmark', specifications.View)
        }
    }, [specifications])
    useEffect(() => {
        if (propertiesTypes && property) {
            setValue('propertyType', specifications.Type)
        } else setValue('propertyType', propertyForm.propertyType)
    }, [propertiesTypes])

    // useEffect(() => {
    //   if (countries) {
    //     if (!property) {
    //       Object.keys(countries).forEach(key => {
    //         if (key == "Turkey") {
    //           setSelectedCountry(key);
    //         }
    //       });
    //     } else {
    //       setSelectedCountry(property.country);
    //     }
    //   }
    // }, [property, countries]);

    // useEffect(() => {
    //   if (selectedCountry) {
    //     setValue("countryId", selectedCountry);
    //     if (property && !getValues("cityId")) {
    //       setValue("cityId", property.city);
    //     } else {
    //         if(selectedCountry == "Turkey"){
    //           countries[selectedCountry].cities.forEach(city => {
    //             if(city == "Ankara"){
    //               setValue("cityId",city)
    //             }
    //           });
    //         }else{
    //           setValue("city", countries[selectedCountry].cities[0]);
    //         }
    //     }
    //   }
    // }, [selectedCountry]);

    // to set these fields with default value

    useEffect(() => {
        if (formSubmitted) {
            setFormSubmitted(false)
        }
    }, [formSubmitted])

    async function onArchiveButtonClick() {
        const result = await Swal.fire({
            title: 'Are you sure you want to archive the property?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dd4b39',
            cancelButtonColor: 'var(--theme-default)',
            confirmButtonText: 'Archive Property',
            reverseButtons: true,
        })
        if (result.isConfirmed) {
            onDeleteHandler()
        }
    }

    async function onPublishButtonClick() {
        const result = await Swal.fire({
            title: 'Are you sure you want to publish the property?',
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

    async function onFormSubmit(values: any) {
        if (!property && mainImageUrl.length === 0) {
            toast.error("Please upload your property's main image.")
            return
        }
        const allImages = [
            ...mainImageUrl,
            ...imagesUrls,
            ...currentPropertyImagesUrls,
        ]
        if (allImages.length < 5) {
            toast.error('Uploade at least 5 image.')
            return
        }

        if (!addresString) {
            toast.error('Please enter the address for project.')
            return
        }

        let { amenetiesIds, propertyPrice } = values
        amenetiesIds = amenetiesIds
            ? amenetiesIds.map((id: any) => parseInt(id, 10))
            : []
        propertyPrice = parseInt(propertyPrice, 10)
        if (propertyPrice < 1000) {
            toast.error("Price can't be less than 1000!")
            return
        }

        if (values?.area < 200) {
            toast.error("Area can't be less than 200!")
            return
        }
        const specificationIds = [
            {
                id: 1,
                answer: values.area.toString(10),
            },
            {
                id: 3,
                answer: values.baths,
            },
            {
                id: 5,
                answer: values.propertyType,
            },
            {
                id: 6,
                answer: values.landmark,
            },
            {
                id: 8,
                answer: values.rooms,
            },
        ]
        const formData = {
            ...values,
            address: addresString,
            lat: lat,
            lon: lng,
            isrent: values.propertyStatus === 'For Rent',
            phone: values.phone,
            propertyPrice,
            description: propertyEditorText,
            amenetiesIds,
            specificationIds,
            images: allImages,
        }
        try {
            await onSubmitHandler(formData)
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    async function toggleIsFeatured() {
        incrementLoaderCount()
        const data = await postData(
            urls.common.routes.properties.setIsFeatured(property.id),
            { isFeature: !isFeatured },
            token
        )
        if (data.data) {
            if (isFeatured) {
                toast.success('Property removed as featured.')
            } else {
                toast.success('Property is now featured.')
            }
            setIsFeatured(!isFeatured)
        }
        decrementLoaderCount()
    }
    return (
        <>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Row className="gx-3">
                    <Col sm="12">
                        {isAdmin && agent && (
                            <div className="d-flex align-items-center flex-wrap justify-content-between">
                                <p className="mb-0 py-2">
                                    Owned by {agent.firstName} {agent.lastName}
                                </p>{' '}
                                <Link
                                    href={urls.admin.pages.agents.edit(
                                        agent.id
                                    )}
                                >
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
                    <Col sm="12" className="form-group">
                        <TextField
                            name="title"
                            label="Title"
                            placeholder="High Valley Fields"
                            register={register}
                            errors={errors}
                            disabled={isAdmin}
                        />
                    </Col>
                    <Col sm="4" className="form-group">
                        <SelectField
                            name="propertyType"
                            label="Type"
                            register={register}
                            errors={errors}
                            disabled={isAdmin}
                        >
                            {propertiesTypes?.map((type: any, ind: number) => (
                                <option
                                    key={ind}
                                    value={type}
                                    selected={selectedPropertyType == type}
                                >
                                    {type}
                                </option>
                            ))}
                        </SelectField>
                    </Col>
                    <Col sm="4" className="form-group">
                        <SelectField
                            name="propertyStatus"
                            label="Status"
                            register={register}
                            errors={errors}
                            disabled={isAdmin}
                        >
                            {propertyStatus?.map((status) => (
                                <option
                                    key={status.id}
                                    value={status.name}
                                    selected={
                                        selectedPropertyStatus == status.name
                                    }
                                >
                                    {status.name}
                                </option>
                            ))}
                        </SelectField>
                    </Col>
                    <Col sm="4" className="form-group">
                        <NumberField
                            register={register}
                            name="propertyPrice"
                            label="Price (USD)"
                            type="number"
                            placeholder="$2800"
                            errors={errors}
                            max={1000000000000}
                            disabled={isAdmin}
                        />
                    </Col>
                    <Col sm="4" className="form-group">
                        <SelectField
                            name="rooms"
                            label="Rooms"
                            register={register}
                            errors={errors}
                            disabled={isAdmin}
                        >
                            <option
                                value={'studio'}
                                selected={selectedRooms == 'studio'}
                            >
                                Studio
                            </option>
                            {Array.from(Array(maxNumberOfRooms), (_, ind) => (
                                <option
                                    key={ind}
                                    value={ind + 1}
                                    selected={selectedRooms == ind + 1}
                                >
                                    {ind + 1}
                                </option>
                            ))}
                        </SelectField>
                    </Col>
                    {/* <Col sm="4" className="form-group">
                        <SelectField
                            name="beds"
                            label="Beds"
                            register={register}
                            errors={errors}
                            disabled={isAdmin}
                        >
                            {Array.from(Array(maxNumberOfBeds), (_, ind) => (
                                <option
                                    key={ind}
                                    value={ind + 1}
                                    selected={selectedBeds == ind + 1}
                                >
                                    {ind + 1}
                                </option>
                            ))}
                        </SelectField>
                    </Col> */}
                    <Col sm="4" className="form-group">
                        <SelectField
                            name="baths"
                            label="Baths"
                            register={register}
                            errors={errors}
                            disabled={isAdmin}
                        >
                            {Array.from(Array(maxNumberOfBaths), (_, ind) => (
                                <option
                                    value={ind + 1}
                                    key={ind}
                                    selected={selectedBaths == ind + 1}
                                >
                                    {ind + 1}
                                </option>
                            ))}
                        </SelectField>
                    </Col>
                    <Col sm="4" className="form-group">
                        <SelectField
                            name="developerId"
                            label="Developer"
                            register={register}
                            errors={errors}
                            disabled={isAdmin}
                        >
                            <option value="" disabled>
                                Select City
                            </option>
                            {developers?.map((developer: any) => (
                                <option
                                    key={developer?.id}
                                    value={developer?.id}
                                    selected={
                                        selectedDeveloperId == developer?.id
                                    }
                                >
                                    {developer.name}
                                </option>
                            ))}
                        </SelectField>
                    </Col>
                    <Col sm="6" className="form-group">
                        <NumberField
                            register={register}
                            name="area"
                            label="Area (Sq Ft)"
                            type="number"
                            placeholder="5000"
                            errors={errors}
                            min={1}
                            max={1000000000000}
                            disabled={isAdmin}
                        />
                    </Col>
                    <Col sm="6" className="form-group">
                        <TextField
                            register={register}
                            name="propertyRef"
                            label="Reference"
                            placeholder="123RE"
                            errors={errors}
                            disabled={isAdmin}
                        />
                    </Col>
                    <Col sm="12" className="form-group">
                        <FormLabel>Description</FormLabel>
                        {propertyEditorComponent}
                    </Col>
                    <Col sm="12" className="form-group"></Col>
                </Row>
                <Row>
                    <Col sm="6" className="form-group">
                        {/* <TextField
              register={register}
              name="address"
              label="Address"
              placeholder="Elite Sports Residence 3, Victory Drive, Dubai, United Arab Emirates"
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
                    <Col sm="6" md="4" className="form-group">
                        <TextField
                            register={register}
                            name="zipCode"
                            label="Zip code"
                            placeholder="34000"
                            errors={errors}
                            disabled={isAdmin}
                        />
                    </Col>

                    <Col sm="6" md="4" className="form-group">
                        <SelectField
                            name="countryId"
                            label="Country"
                            register={register}
                            errors={errors}
                            disabled={isAdmin}
                            required={property ? false : true}
                        >
                            <option value="" disabled>
                                Select Country
                            </option>
                            {countriesDB?.map((country: any) => (
                                <option
                                    key={country?.id}
                                    value={country?.id}
                                    selected={selectedCountryId == country?.id}
                                >
                                    {country.name}
                                </option>
                            ))}
                        </SelectField>
                    </Col>
                    <Col sm="6" md="4" className="form-group">
                        <SelectField
                            name="cityId"
                            label="City"
                            register={register}
                            errors={errors}
                            disabled={isAdmin}
                            required={property ? false : true}
                        >
                            <option value="" disabled>
                                Select City
                            </option>
                            {cities?.map((city: any) => (
                                <option
                                    key={city?.id}
                                    value={city?.id}
                                    selected={selectedCityId == city?.id}
                                >
                                    {city.name}
                                </option>
                            ))}
                        </SelectField>
                    </Col>
                    <Col sm="6" md="4" className="form-group">
                        <SelectField
                            name="areaId"
                            label="Area"
                            register={register}
                            errors={errors}
                            disabled={isAdmin}
                            required={property ? false : true}
                        >
                            <option value="" disabled>
                                Select Area
                            </option>
                            {areas?.map((area: any) => (
                                <option
                                    key={area?.id}
                                    value={area?.id}
                                    selected={selectedAreaId == area?.id}
                                >
                                    {area.name}
                                </option>
                            ))}
                        </SelectField>
                    </Col>
                    <Col sm="12" lg="6" className="form-group">
                        <TextField
                            register={register}
                            name="landmark"
                            label="Landmark"
                            placeholder="Dubai Museum"
                            errors={errors}
                            disabled={isAdmin}
                        />
                    </Col>
                    <Col sm="12" lg="6" className="form-group">
                        <TextField
                            register={register}
                            name="phone"
                            label="Phone"
                            placeholder="+9715184575181"
                            errors={errors}
                            disabled={isAdmin}
                        />
                    </Col>
                </Row>
                <Row>
                    <div>
                        <h6>Images</h6>
                        <div className="mb-2 d-flex gap-5 flex-wrap justify-content-center mb-4">
                            {currentPropertyImagesUrls &&
                                currentPropertyImagesUrls.map((url) => (
                                    <div
                                        className="image-wrapper img-with-remove-btn"
                                        key={url}
                                        style={{
                                            width: '250px',
                                            height: '250px',
                                        }}
                                    >
                                        <img
                                            src={url}
                                            className="w-100 h-100 border rounded"
                                            style={{ objectFit: 'cover' }}
                                        />
                                        {isAgent && (
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => {
                                                    setCurrentPropertyImagesUrls(
                                                        (
                                                            prevCurrentPropertyImagesUrls
                                                        ) =>
                                                            prevCurrentPropertyImagesUrls.filter(
                                                                (tempUrl) =>
                                                                    tempUrl !==
                                                                    url
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

                        {!isAdmin && (
                            <>
                                <FormLabel>
                                    Main Image (Recommended 1200 x 800)
                                </FormLabel>
                                {mainImageFilesdropzoneComponent}
                                <FormLabel>
                                    Other Images (Recommended 1200 x 800)
                                </FormLabel>
                                {filesdropzoneComponent}
                            </>
                        )}
                    </div>
                </Row>
                <Row className="gx-3">
                    <Col sm="12" className="form-group">
                        <TextField
                            register={register}
                            name="videoUrl"
                            label="Video Link"
                            placeholder="https://www.youtube.com"
                            errors={errors}
                            required={false}
                            disabled={isAdmin}
                        />
                    </Col>
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
                                        {...register('amenetiesIds')}
                                        disabled={isAdmin}
                                    />
                                    <span>{amenity.key}</span>
                                </Label>
                            ))}
                        </div>
                    </Col>
                    {isAdmin && (
                        <>
                            {isFeatured !== null && (
                                <>
                                    <hr className=" mt-4 custom-separator-hr" />
                                    <Col
                                        sm="12"
                                        className="mt-4 d-flex gap-4 align-items-center justify-content-center-md"
                                    >
                                        <FormLabel className="mb-0">
                                            Featured Property
                                        </FormLabel>
                                        <Switch
                                            onClick={toggleIsFeatured}
                                            checked={isFeatured}
                                            defaultChecked={isFeatured}
                                        />
                                    </Col>
                                </>
                            )}
                            <hr className=" mt-4 custom-separator-hr" />
                            {/* <>
                <Col
                  sm="12"
                  className="mt-4 d-flex flex-wrap align-items-center gap-4 justify-content-between justify-content-center-md"
                >
                  <div className="d-flex gap-4 align-items-center">
                    <FormLabel className="mb-0">
                      Set As Property Of The Day
                    </FormLabel>
                    <Switch
                      onClick={() => {
                        togglePropertyOfTheDay(property);
                      }}
                      checked={
                        propertyOfTheDay && propertyOfTheDay.id === property.id
                      }
                    />
                  </div>
                  {propertyOfTheDay && propertyOfTheDay.id !== property.id && (
                    <Link
                      href={urls.common.pages.properties.edit(
                        propertyOfTheDay.id
                      )}
                    >
                      <button
                        type="button"
                        className="btn btn-dashed btn-pill d-flex gap-2 align-items-center"
                      >
                        Current property of the day{" "}
                        <i className="fas fa-arrow-right"></i>
                      </button>
                    </Link>
                  )}
                </Col>
                <hr className=" mt-4 custom-separator-hr" />
              </> */}
                        </>
                    )}
                    <Col sm="12" className="form-btn">
                        <div className="form-group d-grid custom-form-options">
                            <Button
                                type="submit"
                                className="btn btn-gradient btn-pill custom-submit-button"
                                disabled={isSubmitting}
                            >
                                Submit
                            </Button>
                            {isAgent && property && (
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
                                            ? 'Archive Property'
                                            : 'Publish Property'}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </form>
        </>
    )
}
