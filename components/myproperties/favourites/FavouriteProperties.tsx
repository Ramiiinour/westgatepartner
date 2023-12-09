import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import PropertyBox from '../../Common/Propertybox/PropertyBox'
import { getData } from '../../utils/getData'

const FavouriteProperties = () => {
    const [propertyList, setPropertyList] = useState<any>()

    useEffect(() => {
        getData(`${process.env.API_URL}/property`)
            .then((res: any) => {
                setPropertyList(res.data?.LatestPropertyListingInEnterprise)
            })
            .catch((error) => console.log('Error', error))
    }, [])

    return (
        <Col xl="12">
            <Row className="property-2 column-sm property-label property-grid">
                {propertyList &&
                    propertyList.slice(0, 6).map((item: any, index: number) => {
                        return (
                            <Col key={index} xl="4" md="6 xl-6">
                                <PropertyBox data={item} />
                            </Col>
                        )
                    })}
            </Row>
        </Col>
    )
}

export default FavouriteProperties
