
import HomePage from "./pages/HomePage";
import { VerificationPage } from "./pages/VerificationPage";
import DetailPage from "./pages/DetailPage";
import { AdminPage } from "./pages/AdminPage";
import { AdminDashboard } from "./pages/AdminDashboard";

import Navbar from "./components/navbar";
import { login } from "./redux/userSlice";
import { syncData } from "./redux/cartSlice";
import { loanData } from "./redux/loanSlice";

import Axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { NIM } = useSelector((state) => state.userSlice.value);

  const keepLogin = async () => {
    try {
      const res = await Axios.get(`http://localhost:2000/users/keepLogin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await Axios.get(`http://localhost:2000/carts/${res.data.NIM}`);
      dispatch(syncData(result.data))

      const loan = await Axios.get(`http://localhost:2000/loans/${res.data.NIM}`);
      dispatch(loanData(loan.data))

      dispatch(
        login({
          NIM: res.data.NIM,
          username: res.data.username,
          email: res.data.email,
          isVerified: res.data.isVerified,
          cart: result.data.length,
          loan: loan.data.length
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
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(
        login({
          username: res.data.username,
          isVerified: res.data.isVerified,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    NIM === 0 ? keepLogin() : keepLoginAdmin();
  });
  return (
    <div>
      <Routes>
        <Route path="/" element={<><Navbar /><HomePage /></>} />
        <Route path="/verification/:token" element={<VerificationPage />} />
        <Route path="/details/:id" element={<><Navbar /><DetailPage /></>} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />

      </Routes>
    </div>
  );
}

export default App;
