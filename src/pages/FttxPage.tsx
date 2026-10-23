import React from 'react';
import { PageHero } from '../components/Widgets';

export const FttxPage: React.FC = () => {
  return (
    <div className="bg-white">
      <PageHero title="FTTX" />

      <section className="page-section site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-[50px] items-center">
          <div className="space-y-6">
            <p className="text-black text-[18px] sm:text-lg leading-[28px] font-normal">
              In today’s interconnected world, connectivity is even more vital. Our products and solutions contribute to the development of this network by helping the modern home act as one of its crucial hubs.
            </p>

            <div>
              <h2 className="text-[20px] font-bold text-black font-heading mb-2">
                Simple and Quick Product Installations:-
              </h2>
              <p className="text-black text-[18px] leading-[28px]">
                CitiusComm’s products are designed for easy installation. The system is designed to reduce the total cost of ownership by improving efficiency for installers and end users.
              </p>
            </div>

            <div>
              <h2 className="text-[20px] font-bold text-black font-heading mb-2">
                Flexible Range of Products:-
              </h2>
              <p className="text-black text-[18px] leading-[28px]">
                The CitiusComm product portfolio covers a diverse range of scenarios -from GPON, Point to Point, or optical fiber patch through the product. With built-in intelligence in our products, CitiusComm is able to cater to a wide range of requirements – from setting up mixed networks to upgrading routing functionalities.
              </p>
            </div>

            <div>
              <h2 className="text-[20px] font-bold text-black font-heading mb-2">
                On-ground Local Support:-
              </h2>
              <p className="text-black text-[18px] leading-[28px]">
                CitiusComm products and solutions are supported by strong on-ground intelligence and support pan India. Our network allows us to understand unground scenarios, regulations, and the most efficient way to help you increase the success of your network.
              </p>
            </div>
          </div>

          <div>
            <img
              src="/images/optical-fiber.jpg"
              alt="FTTX Optical Fiber Solutions"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
