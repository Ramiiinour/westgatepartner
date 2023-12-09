import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button, Col, Row } from 'reactstrap'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { useAuth } from '../../../auth/contexts/AuthProvider'
import { useFilesDropzone } from '../../../../hooks/useFileDropzone'
import { urls } from '../../../../data/custom-data/urls'
import TextField from '../../../../components/custom-components/forms/TextField'
import EmailField from '../../../../components/custom-components/forms/EmailField'
import SelectField from '../../../../components/custom-components/forms/SelectField'
import TextAreaField from '../../../../components/custom-components/forms/TextAreaField'
import DateField from '../../../../components/custom-components/forms/DateField'
import { deleteData, getData } from '../../../../utils/requests'
import { useLoader } from '../../../../contexts/LoaderProvider'
import { appRoutes } from '../../../../data/custom-data/appRoutes'

import { useCitiesCountry } from '../../../../hooks/useCitiesCountry'
import { useCountriesFromDB } from '../../../../hooks/useCountriesFromDB'
import { useAreaCity } from '../../../../hooks/useAreaCity'

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

export default function AgentForm({ agent, onSubmitHandler, isAdmin }: any) {
    const { token }: any = useAuth()
    const router = useRouter()
    const { imagesUrls, filesdropzoneComponent } = useFilesDropzone(
        appRoutes.agents.uploadPhoto,
        1
    )
    const [selectedCountry, setSelectedCountry] = useState(0)
    const [selectedCity, setSelectedCity] = useState(0)

    // for multi areas
    const [selected, setSelected] = useState<any>([])

    const { countriesDB } = useCountriesFromDB()
    const { cities } = useCitiesCountry(selectedCountry)
    const { areas } = useAreaCity(selectedCity)

    // set the agent for areas as default value (edit mode)
    useEffect(() => {
        if (agent) {
            agent.area.map((a: any) => {
                setSelected((oldArray: any) => [...oldArray, a.area.name])
            })
        }
    }, [agent])

    const { incrementLoaderCount, decrementLoaderCount } = useLoader()
    const {
        formState: { errors },
        handleSubmit,
        register,
        getValues,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            firstName: agent ? agent.firstName : '',
            lastName: agent ? agent.lastName : '',
            gender: agent ? agent.gender : 'Male',
            cellNumber: agent ? agent.cellNumber : '',
            dateOfBirth: agent
                ? new Date(agent.dateOfBirth).toISOString().split('T')[0]
                : '',
            email: agent ? agent.email : '',
            password: '',
            passwordConfirmation: '',
            description: agent ? agent.description : '',
            address: agent ? agent.address : '',
            zipCode: agent ? agent.zipCode : '',
            facebookUrl: agent ? agent.facebookUrl : '',
            googleUrl: agent ? agent.googleUrl : '',
            twitterUrl: agent ? agent.twitterUrl : '',
        },
    })

    async function onDeleteButtonClick() {
        if (!agent) {
            throw new Error('No agent detected.')
        }
        incrementLoaderCount()
        const propertiesData = await getData(
            appRoutes.properties.allForAgent({ agentId: agent.id }),
            'agent'
        )
        const projectsData = await getData(
            appRoutes.projects.allForAgent({ agentId: agent.id }),
            'agent2'
        )

        decrementLoaderCount()
        if (propertiesData.count > 0 || projectsData.count > 0) {
            toast.error(
                'Agent should delete all their properties and projects first.'
            )
            return
        }
        const result = await Swal.fire({
            title: 'Are you sure you want to delete the agent?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dd4b39',
            cancelButtonColor: 'var(--theme-default)',
            confirmButtonText: 'Delete Agent',
            reverseButtons: true,
        })
        if (result.isConfirmed) {
            incrementLoaderCount()
            await deleteData(
                appRoutes.agents.delete({ agentId: agent.id }),
                token
            )
            await router.push(urls.admin.pages.agents.all)
            toast.success('Agent has been deleted successfully.')
            decrementLoaderCount()
        }
    }

    async function onFormSubmit(values: any) {
        if (!agent && imagesUrls.length === 0) {
            toast.error('You must upload your photo.')
            return
        }
        delete values['passwordConfirmation']
        if (agent && values.password === '') {
            delete values['password']
        }
        let avatar = agent?.avatar
        if (imagesUrls.length === 1) {
            avatar = imagesUrls[0]
        }

        if (selected.length < 1) {
            toast.error('You must select area.')
            return
        }
        const formData = {
            firstName: values.firstName?.trim(),
            lastName: values.lastName?.trim(),
            gender: values.gender,
            cellNumber: values.cellNumber?.trim(),
            dateOfBirth: values.dateOfBirth,
            email: values.email?.trim(),
            password: values.password,
            description: values.description?.trim(),
            address: values.address,
            zipCode: values.zipCode,
            facebookUrl: values.facebookUrl?.trim(),
            googleUrl: values.googleUrl?.trim(),
            twitterUrl: values.twitterUrl?.trim(),
            areaIds: selected.map((name: any) => getAreasIdByName(name)),
            avatar,
        }

        await onSubmitHandler(formData)
    }

    // for multi selection component
    const classes = useStyles()
    const isAllSelected = areas.length > 0 && selected.length === areas.length

    const handleChange = (event: any) => {
        const value = event.target.value
        if (value[value.length - 1] === 'all') {
            setSelected(selected.length === areas.length ? [] : areas)
            return
        }
        setSelected(value)
    }

    function getAreasIdByName(name: any) {
        const matchingObject: any = areas.find(
            (item: any) => item.name === name
        )
        return matchingObject && matchingObject.id
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <Row className="gx-3">
                <Col sm="6" md="4" className="form-group">
                    <TextField
                        name="firstName"
                        label="First Name"
                        placeholder="Hamza"
                        register={register}
                        errors={errors}
                    />
                </Col>
                <Col sm="6" md="4" className="form-group">
                    <TextField
                        name="lastName"
                        label="Last Name"
                        placeholder="Muhsin"
                        register={register}
                        errors={errors}
                    />
                </Col>
                <Col sm="6" md="4" className="form-group">
                    <SelectField
                        name="gender"
                        label="Gender"
                        register={register}
                        errors={errors}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </SelectField>
                </Col>
                <Col sm="6" md="4" className="form-group">
                    <TextField
                        name="cellNumber"
                        label="Phone number"
                        placeholder="+971501234567"
                        register={register}
                        errors={errors}
                    />
                </Col>
                <Col sm="6" md="4" className="form-group">
                    <DateField
                        name="dateOfBirth"
                        label="Date of birth"
                        register={register}
                        errors={errors}
                        validate={{
                            dateBeforeToday: (value: any) =>
                                new Date(value) < new Date() ||
                                'Check your entered date.',
                        }}
                    />
                </Col>
                <Col sm="6" md="4" className="form-group">
                    <EmailField
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="hamza@example.com"
                        register={register}
                        errors={errors}
                        disabled={!isAdmin}
                    />
                </Col>
            </Row>
            <Row>
                <h3 className="h6">Location Details</h3>
                <Col sm="6" md="6" className="form-group">
                    <SelectField
                        name="countryId"
                        label="Country"
                        register={register}
                        errors={errors}
                        onChange={(e: any) => {
                            setSelectedCountry(e.target.value)
                        }}
                    >
                        <option value="" selected>
                            Select Country
                        </option>
                        {countriesDB &&
                            countriesDB?.map((country: any) => (
                                <option value={country?.id} key={country?.id}>
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
                        onChange={(e: any) => setSelectedCity(e.target.value)}
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
                            value={selected}
                            onChange={handleChange}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                            placeholder="sdf"
                        >
                            {areas.map((option: any) => (
                                <MenuItem key={option?.id} value={option?.name}>
                                    <ListItemIcon>
                                        <Checkbox
                                            checked={
                                                selected.indexOf(option.name) >
                                                -1
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
                <Col sm="6" className="form-group">
                    <TextField
                        name="password"
                        label="Password"
                        // type="password"
                        placeholder="P@ssw0rd"
                        register={register}
                        errors={errors}
                        required={!agent}
                        minLength={8}
                        validate={{
                            checkPasswordsMatch: (value: any) => {
                                return (
                                    value ===
                                        getValues().passwordConfirmation ||
                                    'Passwords do not match'
                                )
                            },
                        }}
                    />
                </Col>
                <Col sm="6" className="form-group">
                    <TextField
                        name="passwordConfirmation"
                        label="Confirm Password"
                        // type="password"
                        placeholder="P@ssw0rd"
                        register={register}
                        errors={errors}
                        required={!agent}
                    />
                </Col>
                <Col sm="12" className="form-group">
                    <TextAreaField
                        name="description"
                        label="Description"
                        placeholder="Write a description..."
                        rows={7}
                        register={register}
                        errors={errors}
                    />
                </Col>
                <Col sm="12" md="6" className="form-group">
                    <TextField
                        name="address"
                        label="Address"
                        placeholder="123 Sheikh Zayed Road, Dubai, United Arab Emirates"
                        register={register}
                        errors={errors}
                    />
                </Col>
                <Col sm="12" md="6" className="form-group">
                    <TextField
                        name="zipCode"
                        label="Zip code"
                        placeholder="34000"
                        register={register}
                        errors={errors}
                    />
                </Col>

                <Col sm="12" className="form-group">
                    <TextField
                        name="facebookUrl"
                        label="Facebook link"
                        placeholder="https://www.facebook.com"
                        required={false}
                        register={register}
                        errors={errors}
                    />
                </Col>
                <Col sm="12" className="form-group">
                    <TextField
                        name="googleUrl"
                        label="Google link"
                        placeholder="https://www.google.com"
                        required={false}
                        register={register}
                        errors={errors}
                    />
                </Col>
                <Col sm="12" className="form-group">
                    <TextField
                        name="twitterUrl"
                        label="Twitter link"
                        placeholder="https://www.twitter.com"
                        required={false}
                        register={register}
                        errors={errors}
                    />
                </Col>

                <Col sm="12" className="form-group">
                    {agent && (
                        <div className="form-group mt-2 mb-2 d-flex justify-content-center">
                            <div
                                className="image-wrapper"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                }}
                            >
                                <img
                                    src={agent.avatar}
                                    className="w-100 h-100 border rounded-circle"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    )}
                    <label className={`label-color form-label`}>
                        Photo (Recommended 1200 x 800)
                    </label>
                    {filesdropzoneComponent}
                </Col>
            </Row>

            <div className="form-group  custom-agent-form-options">
                <Button
                    type="submit"
                    className="btn btn-gradient btn-pill"
                    style={{ gridColumnStart: 2 }}
                    disabled={isSubmitting}
                >
                    Submit
                </Button>
                {agent && isAdmin && (
                    <div className="d-flex justify-content-end">
                        <Button
                            type="button"
                            className="btn btn-danger btn-pill"
                            onClick={onDeleteButtonClick}
                        >
                            Delete Agent
                        </Button>
                    </div>
                )}
            </div>
        </form>
    )
}
