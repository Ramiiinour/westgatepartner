import React from 'react'
import Slider from 'react-slick'
import Img from '../utils/Img'

const ImageSlider = ({ images }: any) => {
    const propertySlider = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    }

    return (
        <Slider className="property-slider" {...propertySlider}>
            {images?.map((image: any, i: number) => (
                <div key={i}>
                    <div>
                        <Img src={image.link} className="bg-img" />
                    </div>
                </div>
            ))}
        </Slider>
    )
}

export default ImageSlider
