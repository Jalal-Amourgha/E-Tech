"use client";

import { PaymentDetailsProps } from "@/types";

const PaymentDetails = ({
  paymentDetails,
}: {
  paymentDetails?: PaymentDetailsProps;
}) => {
  return (
    <div>
      <h1 className="text-2xl text-primary mb-5">Payment Details</h1>
      <div className="flex flex-col gap-10">
        <div className="bg-mastercard-bg w-[335px] h-[185px] bg-no-repeat bg-cover relative ">
          <div className="absolute bottom-5 left-2 w-[calc(100%-16px)] flex justify-between items-center text-white  ">
            <div>
              <p>{paymentDetails?.creditCardName}</p>
              <p>{paymentDetails?.creditCardNumber}</p>
            </div>
            <div>
              <p>{paymentDetails?.validity}</p>
              <p>***</p>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-xl mb-5">Personal Information</h1>
          <div className="flex flex-col gap-4 text-lg font-normal">
            <p>
              Name: <span className="text-gray">{paymentDetails?.name}</span>
            </p>
            <p>
              Last name:{" "}
              <span className="text-gray">{paymentDetails?.lastName}</span>
            </p>
            <p>
              Country:{" "}
              <span className="text-gray">{paymentDetails?.country}</span>
            </p>
            <p>
              City: <span className="text-gray">{paymentDetails?.city}</span>
            </p>
            <p>
              zipCode:{" "}
              <span className="text-gray">{paymentDetails?.zipCode}</span>
            </p>
            <p>
              Email: <span className="text-gray">{paymentDetails?.email}</span>
            </p>
            <p>
              Number:{" "}
              <span className="text-gray">{paymentDetails?.phoneNumber}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
