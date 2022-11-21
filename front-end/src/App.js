import HomePage from "./pages/HomePage";
import { VerificationPage } from "./pages/VerificationPage";
import DetailPage from "./pages/DetailPage";
import { AdminPage } from "./pages/AdminPage";
import { AdminDashboard } from "./pages/AdminDashboard";
import CartPage from "./pages/CartPage";
import LoanPage from "./pages/LoanPage";

import Navbar from "./components/navbar";
import { login } from "./redux/userSlice";
import { cartSync } from "./redux/cartSlice";
import { loanSync } from "./redux/loanSlice";
import { loginAdmin } from "./redux/adminSlice";

import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const tokenAdmin = localStorage.getItem("tokenAdmin");
  const keepLogin = async () => {
    try {
      const res = await Axios.get(`http://localhost:2000/users/keepLogin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await Axios.get(
        `http://localhost:2000/carts/${res.data.NIM}`
      );
      dispatch(cartSync(result.data));

      const loan = await Axios.get(
        `http://localhost:2000/loans/${res.data.NIM}`
      );
      dispatch(loanSync(loan.data));


      dispatch(
        login({
          NIM: res.data.NIM,
          username: res.data.username,
          email: res.data.email,
          isVerified: res.data.isVerified,
          cart: result.data.length,
          loan: loan.data.length,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const keepLoginAdmin = async () => {
    try {
      const res = await Axios.get(`http://localhost:2000/admins/keepLogin`, {
        headers: {
          Authorization: `Bearer ${tokenAdmin}`,
        },
      });
      dispatch(
        loginAdmin({
          username: res.data.username,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    tokenAdmin
      ? keepLoginAdmin()
      : token
      ? keepLogin()
      : console.log("Open Library");
  });
  
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
            </>
          }
        />
        <Route path="/verification/:token" element={<VerificationPage />} />
        <Route
          path="/details/:id"
          element={
            <>
              <Navbar />
              <DetailPage />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Navbar />
              <CartPage />
            </>
          }
        />
        <Route
          path="/loan"
          element={
            <>
              <Navbar />
              <LoanPage />
            </>
          }
        />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
