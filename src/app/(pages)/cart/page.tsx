import { CartProducts } from "@/components/AddedCartProducts";
import CartTotal from "@/components/CartTotal";
import PageHeader from "@/components/PageHeader";

const page = () => {
  return (
    <div className="container">
      <PageHeader name="Cart" />
      <div className="grid grid-cols-4 text-xl">
        <h1>Product</h1>
        <h1 className="text-center">Price</h1>
        <h1 className="text-center">Quantity</h1>
        <h1 className="text-end">SubTotal</h1>
      </div>
      <CartProducts />

      <CartTotal classes="ml-auto" process={true} />
    </div>
  );
};

export default page;
