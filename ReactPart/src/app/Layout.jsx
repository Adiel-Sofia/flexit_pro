import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import classes from "./layout.module.css";

export default function Layout() {
  return (
    <div className={classes.layoutContainer}>
      <Header />

      <main className={classes.mainContent}>
        <Outlet />
      </main>

      <Footer className={classes.footer} />
    </div>
  );
}
