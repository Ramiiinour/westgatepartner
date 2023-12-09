import React from 'react'
import Slider from 'react-slick'
import Img from '../../../../components/utils/Img'

const ProjectImageSlider = ({ images }: any) => {
    const projectSlider = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    }

    return (
        <Slider className="property-slider h-100" {...projectSlider}>
            {images?.map((image: any, i: number) => (
                <div key={i}>
                    <div>
                        <Img src={image} className="bg-img" />
                    </div>
                </div>
            ))}
        </Slider>
    )
}

export default ProjectImageSlider
