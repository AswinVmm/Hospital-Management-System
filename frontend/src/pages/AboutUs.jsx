import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";

const AboutUs = () => {
    return (
        <>
            <Hero
                title={"Learn More About Us | Good Care Medical Institute"}
                imageUrl={"/hero.png"}
            />
            <Biography imageUrl={"/about.avif"} />
        </>
    );
};

export default AboutUs;