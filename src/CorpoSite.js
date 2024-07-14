import React, { useState, useEffect } from "react";

import "./StylePadrao.css";
import "./Style_Cores.css";
import HomePage from "./pages/Home/HomePage";
import Suporte_Chat from "./pages/Suporte_Chat/Suporte_Chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const LoadingComponent = () => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots + 1) % 4);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const dotString = ".".repeat(dots);

  return <div className="loading">Charge{dotString}</div>;
};

export default function CorpoSite() {
  const [isLoading, setIsLoading] = useState(true);
  const [showByNidus, setShowByNidus] = useState(true);
  const [showByPage, setshowByPage] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setShowByNidus(false);
        setTimeout(() => {
          setshowByPage(true);
        }, 2000);
      }, 250);
    }
  }, [isLoading]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <>
              <div
                className="by-nidus"
                style={
                  showByNidus
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                        zIndex: -99999,
                      }
                }
              >
                by{" "}
                <img
                  src="./img/Logo_Nidus_Branca.png"
                  className="Logo_In_Loading"
                />
              </div>
              <div
                className="Div_De_Controle_De_Paginas"
                style={
                  showByPage
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      }
                }
              >
                <HomePage />
              </div>
            </>
          }
        />
        <Route path="Admin">
          <Route path="Atendimento" element={<Suporte_Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
