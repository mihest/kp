"use client"

import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const SliderC = ({images, settings}) => {
    return (
        <Slider {...settings}>
            {images.map((cat) => {
                return(
                    <div key={cat.path}>
                        <Image src={cat.path} alt="room"/>
                    </div>
                );
            })}
        </Slider>
    );
}
export default SliderC;