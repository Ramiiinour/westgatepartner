import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { projectsData } from '../../features/projects/data/projectsData'

const initialState = {
    countryId: -1,
    cityId: -1,
    areaId: -1,
    title: '',
    area: 1,
    address: '',
    zipCode: '',
    phone: '',
    videoUrl: '',
    amentitiesIds: [],
    developerId: -1,
    rooms: '',
    beds: '',
    baths: '',
    landmark: '',
    type: '',
    projectStatus: projectsData.status.inProgressId,
    totalUnits: '1-4BR',
    handOverYear: 0,
    handOverQuarter: 'Q1',
    locationDescription: '',
    paybackDescription: '',
    priceDescription: '',
    economicAppealDescription: '',
    mainDescription: '',
    description: '',
    projectFloorPlans: {},
    brochureUrl: [],
    price: 0,
    paymentPlan1: 0,
    paymentPlan2: 0,
}

const projectFormReducer = createSlice({
    name: 'projectForm',
    initialState,
    reducers: {
        setCountryId(state, action: PayloadAction<number>) {
            if (action?.payload) state.countryId = action.payload
        },
        setCityId(state, action: PayloadAction<number>) {
            if (action?.payload) state.cityId = action.payload
        },
        setAreaId(state, action: PayloadAction<number>) {
            if (action?.payload) state.areaId = action.payload
        },
        setTitle(state, action: PayloadAction<string>) {
            if (action?.payload) state.title = action.payload
        },
        setType(state, action: PayloadAction<string>) {
            if (action?.payload) state.type = action.payload
        },
        setArea(state, action: PayloadAction<number>) {
            if (action?.payload) state.area = action.payload
        },
        setDeveloperId(state, action: PayloadAction<number>) {
            if (action?.payload) state.developerId = action.payload
        },
        setProjectStatus(state, action: PayloadAction<number>) {
            if (action?.payload) state.projectStatus = action.payload
        },
        setTotalUnits(state, action: PayloadAction<string>) {
            if (action?.payload) state.totalUnits = action.payload
        },
        setHandOverYear(state, action: PayloadAction<number>) {
            if (action?.payload) state.handOverYear = action.payload
        },
        setHandOverQuarter(state, action: PayloadAction<string>) {
            if (action?.payload) state.handOverQuarter = action.payload
        },
        setVideoUrl(state, action: PayloadAction<string>) {
            if (action?.payload) state.videoUrl = action.payload
        },
        setAddress(state, action: PayloadAction<string>) {
            if (action?.payload) state.address = action.payload
        },
        setLocationDescription(state, action: PayloadAction<string>) {
            if (action?.payload) state.locationDescription = action.payload
        },
        setPaybackDescription(state, action: PayloadAction<string>) {
            if (action?.payload) state.paybackDescription = action.payload
        },
        setPriceDescription(state, action: PayloadAction<string>) {
            if (action?.payload) state.priceDescription = action.payload
        },
        setEconomicAppealDescription(state, action: PayloadAction<string>) {
            if (action?.payload)
                state.economicAppealDescription = action.payload
        },
        setMainDescription(state, action: PayloadAction<string>) {
            if (action?.payload) state.mainDescription = action.payload
        },
        setDescription(state, action: PayloadAction<string>) {
            if (action?.payload) state.description = action.payload
        },
        setProjectFloorPlans(state, action: PayloadAction<{}>) {
            if (action?.payload) state.projectFloorPlans = action.payload
        },
        setBrochureUrl(state, action: PayloadAction<[]>) {
            if (action?.payload) state.brochureUrl = action.payload
        },
        setPrice(state, action: PayloadAction<number>) {
            if (action?.payload) state.price = action.payload
        },
        setPaymentPlan1(state, action: PayloadAction<number>) {
            if (action?.payload) state.paymentPlan1 = action.payload
        },
        setPaymentPlan2(state, action: PayloadAction<number>) {
            if (action?.payload) state.paymentPlan2 = action.payload
        },
        setAmeneties(state, action: PayloadAction<[]>) {
            if (action?.payload) state.amentitiesIds = action.payload
        },
    },
})

export const {
    setCountryId,
    setCityId,
    setAreaId,
    setTitle,
    setType,
    setArea,
    setDeveloperId,
    setProjectStatus,
    setTotalUnits,
    setHandOverYear,
    setHandOverQuarter,
    setVideoUrl,
    setAddress,
    setLocationDescription,
    setPaybackDescription,
    setPriceDescription,
    setEconomicAppealDescription,
    setMainDescription,
    setDescription,
    setProjectFloorPlans,
    setBrochureUrl,
    setPrice,
    setPaymentPlan1,
    setPaymentPlan2,
    setAmeneties,
} = projectFormReducer.actions
export default projectFormReducer.reducer
