import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import css from "./Layout.module.css";

const Layout: React.FC = () => {
  return (
    <div className={css.page}>
      <div className={css.mainRow}>
        <aside className={css.sidebar}>
          <Header />
        </aside>

        <main className={css.content}>
          <Outlet />
        </main>
      </div>
      <div className={css.footerWrap}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
