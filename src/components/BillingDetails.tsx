"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { countries11 } from "@/constants/_data";
import Image from "next/image";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useAppContext } from "@/context";
import { GoArrowLeft } from "react-icons/go";
import React, { useEffect, useState } from "react";
import { DateField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { ProductCardProps } from "@/types";
import { useSession } from "next-auth/react";

const BillingDetails = () => {
  const {
    myProducts,
    getTotalPrice,
    myBillingInformations,
    setMyBillingInformations,
    quantities,
  } = useAppContext();
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpire, setCardExpire] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const handleChangeCardNumber = (event: any) => {
    const rawValue = event.target.value.replace(/\s+/g, "");
    if (/^\d*$/.test(rawValue)) {
      const formattedValue = rawValue.replace(/(\d{4})(?=\d)/g, "$1 ");

      setCardNumber(formattedValue);
    }
  };

  const handleChangeCVV = (event: any) => {
    const newValue = event.target.value;
    if (/^\d*$/.test(newValue)) {
      setCardCVC(newValue);
    }
  };

  const handleChangeName = (event: any) => {
    const newValue = event.target.value;
    if (/^[\p{L}\s]*$/u.test(newValue)) {
      setCardName(newValue);
    }
  };
  const handleDateChange = (newDate: any) => {
    if (newDate) {
      setCardExpire(newDate.format("MM-YY"));
    }
  };

  const generateOrderId = () => {
    let order_id = "";

    const numbers = "0123456789";
    const letters = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 1; i <= 15; i++) {
      if (Number.isInteger(i / 3)) {
        order_id += numbers[Math.floor(Math.random() * 9)];
        order_id += numbers[Math.floor(Math.random() * 9)];
        order_id += numbers[Math.floor(Math.random() * 9)];
      } else {
        order_id += letters[Math.floor(Math.random() * 26)];

        order_id += letters[Math.floor(Math.random() * 26)];
      }
    }

    return order_id;
  };

  const handleSubmitPersonalInformations = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setShowPaymentDetails(true);
  };

  const handleSubmitBillingDetails = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    let addedCartProducts = myProducts.filter(
      (product: ProductCardProps) => product.cart
    );
    let productsSlected = [];

    // setMyBillingInformations({
    //   fullname: name,
    //   email: email,
    //   country: country,
    //   city: city,
    //   zipCode: zipCode,
    //   phoneNumber: number,
    //   creditCardNumber: cardNumber,
    //   creditCardName: cardName,
    //   validity: cardExpire,
    //   CVC: cardCVC,
    // });

    for (let i = 0; i < addedCartProducts.length; i++) {
      var order_id = generateOrderId();
      var createdAt = new Date();
      addedCartProducts[i].order_id = order_id;
      addedCartProducts[i].quantity = quantities[addedCartProducts[i].name];
      addedCartProducts[i].date = createdAt.toString();
      productsSlected.push(addedCartProducts[i]);
    }

    if (productsSlected.length > 0 && session?.user?.email) {
      try {
        const response = await fetch(
          `/api/user/${session?.user?.email}/infos`,
          {
            method: "PATCH",
            body: JSON.stringify({
              type: "orders",
              orders: productsSlected,
            }),
          }
        );

        if (response.ok) {
          console.log("jalalalalal");
          router.push("/successful");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {showPaymentDetails ? (
        <div className="">
          <div className="w-full flex justify-between items-center mb-10">
            <h1 className="text-2xl font-normal ">Payment Details</h1>
            <button
              className="text-2xl text-primary flex items-center gap-2"
              onClick={() => setShowPaymentDetails(false)}
            >
              <GoArrowLeft /> Back
            </button>
          </div>

          <div className="bg-mastercard-bg h-[300px] max-w-[500px] bg-no-repeat bg-contain relative mb-10 mx-auto">
            <div className="w-[85%] absolute bottom-20 left-10 text-xl text-white flex justify-between items-center">
              <div>
                <p className="mb-2">{cardName ? cardName : ""}</p>
                <p>{cardNumber ? cardNumber : ""}</p>
              </div>
              <p>{cardExpire !== "Invalid Date" ? cardExpire : ""}</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmitBillingDetails}
            className="flex flex-col gap-5"
          >
            <TextField
              id="standard-basic"
              label="Name on card"
              placeholder="Anas Ajaanan"
              variant="standard"
              value={cardName}
              onChange={handleChangeName}
            />
            <TextField
              id="standard-basic"
              label="Card number"
              placeholder="0000 0000 0000"
              variant="standard"
              value={cardNumber}
              onChange={handleChangeCardNumber}
              inputProps={{ maxLength: 19 }}
            />
            <div className="grid grid-cols-2 gap-10 ">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateField"]}>
                  <DateField
                    label="Expiry date"
                    format="MM-YY"
                    variant="standard"
                    minDate={dayjs("2024-01-01")}
                    maxDate={dayjs("2030-12-31")}
                    onChange={handleDateChange}
                    fullWidth={true}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <TextField
                id="filled-password-input"
                label="CNN Code"
                placeholder="CNN Code"
                type="password"
                autoComplete="current-password"
                variant="standard"
                value={cardCVC}
                onChange={handleChangeCVV}
                inputProps={{ maxLength: 3 }}
              />
            </div>
            <button
              type="submit"
              className="bg-custom-gradient tetx-lg py-3 px-20 text-center font-medium text-white mt-10 rounded-lg mx-auto"
            >
              PAY ${getTotalPrice()}.00
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-normal mb-10">Personal Informations</h1>

          <form
            onSubmit={handleSubmitPersonalInformations}
            className="personal__info flex flex-col gap-8"
          >
            <div className="flex flex-row items-center gap-8 w-full">
              <div className="w-full">
                <TextField
                  required
                  id="outlined-basic"
                  label="First Name"
                  variant="standard"
                  fullWidth={true}
                  value={name}
                  onChange={(e) => {
                    /^[\p{L}\s]*$/u.test(e.target.value)
                      ? setName(e.target.value)
                      : "";
                  }}
                />
              </div>
              <div className="w-full">
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="standard"
                  fullWidth={true}
                />
              </div>
            </div>
            <div>
              <Autocomplete
                id="country-select-demo"
                sx={{ width: "100%" }}
                options={countries11}
                autoHighlight
                getOptionLabel={(option) => option.label}
                onChange={(e) => setCountry(e.target?.textContent)}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                    key={option.label}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      alt=""
                    />
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    variant="standard"
                    label="Choose a country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
              />
            </div>
            <div className="flex flex-row items-center gap-5">
              <div className="w-full">
                <TextField
                  required
                  id="outlined-basic"
                  label="City"
                  variant="standard"
                  fullWidth={true}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="w-full">
                <TextField
                  required
                  id="outlined-basic"
                  label="ZIP Code"
                  placeholder="ZIP Code"
                  variant="standard"
                  fullWidth={true}
                  inputProps={{ maxLength: 5 }}
                  value={zipCode}
                  onChange={(e) => {
                    /^\d*$/.test(e.target.value)
                      ? setZipCode(e.target.value)
                      : console.log(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <TextField
                required
                id="outlined-basic"
                label="E-mail"
                variant="standard"
                fullWidth={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-basic"
                label="Phone Number"
                variant="standard"
                fullWidth={true}
                value={number}
                onChange={(e) => {
                  /^\d*$/.test(e.target.value)
                    ? setNumber(e.target.value)
                    : console.log(e.target.value);
                }}
              />
            </div>
            <Button title="Place order" classes="mt-10" type="submit" />
          </form>
        </div>
      )}
    </>
  );
};

export default BillingDetails;
