import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Home from "pages/home";
import Login from "pages/login";

import "assets/index.css";
import Product from "pages/product";
import Admin from "pages/admin";
import NotFound from "pages/NotFound";
import ManageCategories from "pages/manage-categories";
import Footer from "components/Footer";

const App = () => {
  const token = useSelector((state) => state.token);
  const mode = useSelector((state) => state.mode);
  return (
    <BrowserRouter>
      <div className={`App ${mode} transition bg-100 `}>
        <motion.main
          className="min-h-screen"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "linear" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                token ? <Navigate to="/admin" replace={true} /> : <Login />
              }
            />
            <Route
              path="/admin"
              element={
                !token ? <Navigate to="/login" replace={true} /> : <Admin />
              }
            />
            <Route
              path="/admin/manage-categories"
              element={
                !token ? (
                  <Navigate to="/login" replace={true} />
                ) : (
                  <ManageCategories />
                )
              }
            />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/not-found" element={<NotFound />} />
          </Routes>
        </motion.main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
export default App;
