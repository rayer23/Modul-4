import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import { VerificationPage } from "./pages/VerificationPage";
import DetailPage from "./pages/DetailPage";

import Navbar from "./components/navbar";
import { login } from "./redux/userSlice";

import Axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const keepLogin = async () => {
    try {
      const res = await Axios.get(`http://localhost:2000/users/keepLogin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(
        login({
          NIM: res.data.NIM,
          username: res.data.username,
          email: res.data.email,
          isVerified: res.data.isVerified,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    keepLogin();
  });
  console.log("test");
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/verification/:token" element={<VerificationPage />} />
        <Route path="/details/:id" element={<DetailPage />} />

      </Routes>
    </div>
  );
}

export default App;
