import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("services.json")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  return (
    <div>
      <div className="text-center mb-4">
        <p className="text-xl font-bold text-rose-600">Services</p>
        <h2 className="text-5xl font-semibold">Our Service Area</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero,
          neque? Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
          key={service._id}
          service={service}
          ></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default Services;
