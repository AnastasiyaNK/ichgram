
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import style from "./Layout.module.css";

const Layout: React.FC = () => {
  return (
    <div className={style .page}>
      <div className={style .mainRow}>
        <aside className={style .sidebar}>
          <Header />
        </aside>

        <main className={style .content}>
          <Outlet />
        </main>
      </div>

      <div className={style .footerWrap}>
        <div className={style .footerContainer}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;



