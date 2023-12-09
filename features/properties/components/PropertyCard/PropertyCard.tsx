import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { Camera } from 'react-feather'
import {
    getSpecificaitonsAsObject,
    getStatusLabel,
} from '../../utils/propertiesUtils'
import ImageSlider from '../../../../components/myproperties/ImageSlider'
import PropertyLabel from '../../../../components/Common/Propertybox/PropertyLabel'
import { urls } from '../../../../data/custom-data/urls'
import roomIcon from '../../../../public/assets/custom-images/icons/room-icon.svg'
import bedroomIcon from '../../../../public/assets/images/svg/icon/double-bed.svg'
import bathroomIcon from '../../../../public/assets/images/svg/icon/bathroom.svg'
import areaIcon from '../../../../public/assets/images/svg/icon/square-ruler-tool.svg'

import bedroomIconWhite from '../../../../public/assets/custom-images/icons/double-bed-white-icon.svg'
import bathroomIconWhite from '../../../../public/assets/custom-images/icons/bathroom-white-icon.svg'
import areaIconWhite from '../../../../public/assets/custom-images/icons/square-ruler-tool-white-icon.svg'
import roomIconWhite from '../../../../public/assets/custom-images/icons/room-white-icon.svg'
import { getSantisizedHTML } from '../../../../utils/text'
import { useTheme } from '../../../../contexts/ThemeProvider'

const PropertyCard = ({ property, status = 1 }: any) => {
    const [specifications, _] = useState<any>(() =>
        getSpecificaitonsAsObject(property.specification)
    )
    const { isLight } = useTheme()
    const routeTo: string =
        status == 1
            ? urls.common.pages.properties.edit(property.id)
            : urls.common.pages.drafts.properties.edit(property.id)

    return (
        <>
            <div className="property-box d-flex flex-column h-100">
                <div className="property-image">
                    <ImageSlider images={property.images.slice(0, 7)} />
                    <div className="labels-left">
                        <PropertyLabel
                            labels={[
                                getStatusLabel(property),
                                property.isFeature ? 'Featured' : '',
                            ]}
                        />
                    </div>
                    <div className="seen-data">
                        <Camera />
                        <span>{property.images.length}</span>
                    </div>
                    {/* <div className="overlay-property-box">
                        <Link href='https://sheltos-react.vercel.app/pages/user-panel/compare-property' className="effect-round" title="Compare">
                            <AddToCompareProducts id={property.id} />
                        </Link>
                        <div className="effect-round like" onClick={() => { NavigateFavourit() }} title="wishlist">
                            <Heart />
                        </div>
                    </div> */}
                </div>
                <div className="property-details d-flex flex-column flex-grow-1">
                    <span className="font-roboto">
                        {property?.country?.name} - {property?.city?.name}
                    </span>
                    <Link href={urls.common.pages.properties.edit(property.id)}>
                        <h3>{property.title}</h3>
                    </Link>
                    <h6>${property.propertyPrice}</h6>
                    <div className="font-roboto custom-description custom-line-clip-3">
                        {getSantisizedHTML(property.description)}
                    </div>
                    <ul
                        className="d-flex flex-wrap"
                        style={{ rowGap: '0.75rem' }}
                    >
                        <li>
                            <img
                                src={isLight ? roomIcon.src : roomIconWhite.src}
                                className="img-fluid custom-property-icon"
                                alt=""
                            />
                            Rooms : {specifications.Rooms}
                        </li>
                        <li>
                            <img
                                src={
                                    isLight
                                        ? bedroomIcon.src
                                        : bedroomIconWhite.src
                                }
                                className="img-fluid custom-property-icon"
                                alt=""
                            />
                            Bed : {specifications.Bedroom}
                        </li>
                        <li>
                            <img
                                src={
                                    isLight
                                        ? bathroomIcon.src
                                        : bathroomIconWhite.src
                                }
                                className="img-fluid custom-property-icon"
                                alt=""
                            />
                            Baths : {specifications.Bath}
                        </li>
                        <li>
                            <img
                                src={isLight ? areaIcon.src : areaIconWhite.src}
                                className="img-fluid ruler-tool custom-property-icon"
                                alt=""
                            />
                            Sq Ft : {specifications.Size}
                        </li>
                    </ul>
                    <div className="property-btn d-flex mt-auto">
                        <span>
                            {new Date(property.createdAt).toDateString()}
                        </span>
                        <Link href={routeTo}>
                            <button
                                type="button"
                                className="btn btn-dashed btn-pill"
                            >
                                Details
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PropertyCard
