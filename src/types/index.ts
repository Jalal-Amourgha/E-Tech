import { StaticImageData } from "next/image";

export interface ProductCardProps {
  id: number;
  name: string;
  img: StaticImageData;
  price: string | number | any;
  oldprice?: string;
  reviews?: string;
  stars: number;
  sale?: number;
  best?: boolean;
  category?: string;
  cart?: boolean;
}

export interface BillingInformationsProps {
  fullname: string;
  country: string;
  city: string;
  zipCode: number | string;
  email: string;
  phoneNumber: number | string;
  creditCardNumber?: number | string;
  creditCardName?: string;
  validity?: number | string;
  CVC?: number | string;
}

export interface OrderProps {
  id: number;
  img: StaticImageData;
  name: string;
  price: string;
  stars: 4.8;
  reviews: string;
  order_id: string;
  date?: string;
  quantity: number;
}

export interface PaymentDetailsProps {
  name: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  zipCode: string;
  phoneNumber: string;
  creditCardNumber: string;
  creditCardName: string;
  validity: string;
  CVC: string;
}

export interface UserDataProps {
  email: string;
  password: string;
  name: string;
  orders: OrderProps[];
  paymentDetails: PaymentDetailsProps;
}

export interface LeadershipTeamProps {
  name: string;
  img: StaticImageData;
  position: string;
}

export interface StarsArrProps {
  number: number;
  type: "oneStars" | "twoStars" | "threeStars" | "fourStars" | "fiveStars";
}
