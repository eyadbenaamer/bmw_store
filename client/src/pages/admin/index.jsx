import Products from "components/products";
import CreateProduct from "./create-product";
import Header from "components/header";

const Admin = () => {
  return (
    <>
      <Header />
      <section className="flex flex-col px-2 gap-8 justify-center py-12">
        <Products>
          <div className="fixed z-50 bottom-8 right-8">
            <CreateProduct />
          </div>
        </Products>
      </section>
    </>
  );
};

export default Admin;
