import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router";
import Loader from "../components/loader/Loader";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <main className="container mt-4">
        <Outlet />
      </main>
      <Footer />
      <Loader />
    </>
  );
}
