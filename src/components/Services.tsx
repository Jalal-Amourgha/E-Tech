import { services } from "@/constants";
import SectionHeader from "./SectionHeader";
import Image from "next/image";

const Services = () => {
  return (
    <section className="container">
      <SectionHeader title="Our Services" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {services.map((service) => (
          <div
            className="service__box text-center p-10 rounded-lg overflow-hidden duration-1000 cursor-pointer"
            key={service.title}
          >
            <div className="img__box flex items-center justify-center h-20 w-20 bg-black mx-auto border-[10px] border-bg-color rounded-full overflow-hidden  duration-1000">
              <Image
                src={service.icon}
                className="max-w-[70%]"
                alt="service icon"
              />
            </div>
            <h1 className="uppercase font-semibold text-xl my-5">
              {service.title}
            </h1>
            <p>{service.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
