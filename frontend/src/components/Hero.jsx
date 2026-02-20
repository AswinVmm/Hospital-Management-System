import React from "react";

const Hero = ({ title, imageUrl }) => {
    return (
        <div className="hero container">
            <div className="banner">
                <h1>{title}</h1>
                <p>
                    Providing exceptional healthcare services with compassion and dedication.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur exercitationem
                    delectus minus aut esse praesentium quidem quos suscipit quasi. Exercitationem.
                </p>
            </div>
            <div className="banner">
                <img src={imageUrl} alt="Hero Image" className="animated-image" />
                <span>
                    <img src="/vector.png" alt="vector" />
                </span>
            </div>
        </div>
    )
}

export default Hero;