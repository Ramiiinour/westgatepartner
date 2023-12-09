import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    countryId: -1,
    cityId: -1,
    areaId: -1,
    title: '',
    propertyStatus: 'For Rent',
    propertyPrice: 0,
    area: 1,
    propertyRef: '',
    address: '',
    zipCode: '',
    phone: '',
    videoUrl: '',
    amentitiesIds: [],
    developerId: 0,
    rooms: 0,
    beds: 0,
    baths: 0,
    landmark: '',
    propertyType: '',
    description: '',
}

const propertyFormReducer = createSlice({
    name: 'propertyForm',
    initialState,
    reducers: {
        setCountryId(state, action: PayloadAction<any>) {
            if (action?.payload) state.countryId = action.payload
        },
        setCityId(state, action: PayloadAction<any>) {
            if (action?.payload) state.cityId = action.payload
        },
        setAreaId(state, action: PayloadAction<any>) {
            if (action?.payload) state.areaId = action.payload
        },
        setTitle(state, action: PayloadAction<any>) {
            if (action?.payload) state.title = action.payload
        },
        setPropertyType(state, action: PayloadAction<string>) {
            if (action?.payload) state.propertyType = action.payload
        },
        setPropertyStatus(state, action: PayloadAction<string>) {
            if (action?.payload) state.propertyStatus = action.payload
        },
        setPropertyPrice(state, action: PayloadAction<number>) {
            if (action?.payload) state.propertyPrice = action.payload
        },
        setRooms(state, action: PayloadAction<number>) {
            if (action?.payload) state.rooms = action.payload
        },
        setBeds(state, action: PayloadAction<number>) {
            if (action?.payload) state.beds = action.payload
        },
        setBaths(state, action: PayloadAction<number>) {
            if (action?.payload) state.baths = action.payload
        },
        setDeveloperId(state, action: PayloadAction<number>) {
            if (action?.payload) state.developerId = action.payload
        },
        setLandmark(state, action: PayloadAction<string>) {
            if (action?.payload) state.landmark = action.payload
        },
        setArea(state, action: PayloadAction<number>) {
            if (action?.payload) state.area = action.payload
        },
        setPropertyRef(state, action: PayloadAction<string>) {
            if (action?.payload) state.propertyRef = action.payload
        },
        setAddress(state, action: PayloadAction<string>) {
            if (action?.payload) state.address = action.payload
        },
        setDescription(state, action: PayloadAction<string>) {
            if (action?.payload) state.description = action.payload
        },
        setZipCode(state, action: PayloadAction<string>) {
            if (action?.payload) state.zipCode = action.payload
        },
        setPhone(state, action: PayloadAction<string>) {
            if (action?.payload) state.phone = action.payload
        },
        setAmeneties(state, action: PayloadAction<[]>) {
            if (action?.payload) state.amentitiesIds = action.payload
        },
        setVideoUrl(state, action: PayloadAction<string>) {
            if (action?.payload) state.videoUrl = action.payload
        },
    },
})

export const {
    setCountryId,
    setCityId,
    setAreaId,
    setTitle,
    setPropertyType,
    setPropertyStatus,
    setPropertyPrice,
    setBaths,
    setBeds,
    setDeveloperId,
    setLandmark,
    setRooms,
    setArea,
    setPropertyRef,
    setAddress,
    setDescription,
    setZipCode,
    setPhone,
    setAmeneties,
    setVideoUrl,
} = propertyFormReducer.actions
export default propertyFormReducer.reducer
