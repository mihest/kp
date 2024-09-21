'use client'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const SliderComponent = ({images, settings}) => {
    return (
        <Slider {...settings}>
            {images.map((cat) => {
                return(
                    <div key={cat.path}>
                        <img src={cat.path} alt="room"/>
                    </div>
                );
            })}
        </Slider>
    );
}
export default SliderComponent;