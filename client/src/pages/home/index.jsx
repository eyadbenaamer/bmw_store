import Products from "components/products";
import UserHeader from "components/user-header";
import Landing from "./Landing";

const Home = () => {
  return (
    <>
      <UserHeader />
      <div className="bg-[#2a2d3d]">
        <Landing />
      </div>
      <section className="flex flex-col px-2 gap-8 justify-center py-12">
        <Products />
      </section>
    </>
  );
};
export default Home;
