import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Homepage from "./components/Homepage";
import ItemCards from "./components/Cards";
import Footer from "./components/Footer";

import GameDetail from "./containers/GameDetail.js";
import MovieDetail from "./containers/MovieDetail.js";

import MainForm from "./containers/MainForm";
import MainFormEdit from "./containers/MainForm/FormEdit";
import MainTable from "./containers/MainTable";

import AccountModals from "./components/Modals/AccountModals";

import SideBar from "./components/ui/SideBar";
import FloatingButton from "./components/ui/FloatingButton";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/item/:section" element={<ItemCards />} />
        <Route path="/game/:id" element={<GameDetail />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/create/:section" element={<MainForm />} />
        <Route path="/edit/:section/:itemId" element={<MainFormEdit />} />
        <Route path="/table/:section" element={<MainTable />} />
        <Route path="/account/:action" element={<AccountModals />} />
      </Routes>
      <SideBar />
      <FloatingButton />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
