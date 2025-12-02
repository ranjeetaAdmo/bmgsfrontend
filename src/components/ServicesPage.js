import React from 'react';
import './styles/ServicesPage.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import {
  FaStream, FaProjectDiagram, FaChartLine, FaLightbulb,
  FaUserTie, FaCogs, FaDigitalTachograph, FaUsers,
  FaChalkboardTeacher, FaCalendarCheck
} from 'react-icons/fa';

const services = [
  {
    title: "Lean Transformation Programs",
    icon: <FaStream />,
    description: "End-to-end initiatives that embed lean thinking across the organization—aligning leadership, culture, and processes for long-term impact."
  },
  {
    title: "Problem Solving",
    icon: <FaLightbulb />,
    description: "Learn distinct types of problem-solving methods to maintain a world class business."
  },
  {
    title: "Value Stream Mapping",
    icon: <FaProjectDiagram />,
    description: "A visual deep-dive into your workflows to identify bottlenecks, redundancies, and non-value-adding steps—then redesign them for flow and efficiency."
  },
  {
    title: "Kaizen Facilitation",
    icon: <FaChartLine />,
    description: "Guided improvement events that solve specific problems quickly, often resulting in measurable gains in productivity, quality, or cost."
  },
  {
    title: "Leadership Coaching",
    icon: <FaUserTie />,
    description: "Equipping executives and managers with a mindset and tools to lead lean initiatives and sustain momentum."
  },
  {
    title: "Lean Six Sigma Integration",
    icon: <FaCogs />,
    description: "Combining lean’s speed and waste reduction with Six Sigma’s precision and quality control for powerful results."
  },
  {
    title: "Digital Lean & Industry 4.0",
    icon: <FaDigitalTachograph />,
    description: "Helping organizations leverage data, automation, and real-time dashboards to amplify lean outcomes."
  },
  {
    title: "Cultural Change & Team Engagement",
    icon: <FaUsers />,
    description: "Fostering a culture of continuous improvement by aligning teams, empowering employees, and breaking down silos."
  },
  {
    title: "Training & Capability Building",
    icon: <FaChalkboardTeacher />,
    description: "Workshops, certifications, and on-the-job coaching to build internal lean champions and reduce reliance on external consultants."
  },
  {
    title: "Daily Management System",
    icon: <FaCalendarCheck />,
    description: "Structured approach that ensures an organization’s day-to-day operations are monitored, controlled, and continuously improved to meet strategic goals effectively."
  }
];

const ServicesPage = () => {
  return (
    <section className="services-page-section py-3 bg-light">
      <div className="container position-relative">
        <h2 className="text-center mb-5 service-heading">Our Services</h2>

        {/* Custom Navigation Arrows */}
      <div className="swiper-custom-button-prev">
  <BiChevronLeft />
</div>
<div className="swiper-custom-button-next">
  <BiChevronRight />
</div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            prevEl: '.swiper-custom-button-prev',
            nextEl: '.swiper-custom-button-next'
          }}
          pagination={{ el: '.swiper-pagination-custom', clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <div className="service-card shadow-sm">
                <div className="service-icon-box">{service.icon}</div>
                <h5 className="service-title">{service.title}</h5>
                <p className="service-description">{service.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Dots */}
        <div className="swiper-pagination-custom mt-4 d-flex justify-content-center"></div>
      </div>
    </section>
  );
};

export default ServicesPage;
