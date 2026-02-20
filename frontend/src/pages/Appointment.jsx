import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
    return (
        <>
            <Hero
                title={"Schedule Your Appointment | GoodCare Medical Institute"}
                imageUrl={"/heart.png"}
            />
            <AppointmentForm />
        </>
    );
};

export default Appointment;