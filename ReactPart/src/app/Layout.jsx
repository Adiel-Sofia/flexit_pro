import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import classes from "./layout.module.css";

export default function Layout(props) {
  // console.log(currentUser);
  const { func } = props;
  return (
    <div className={classes.layoutContainer}>
      <Header func={func} />

      <main className={classes.mainContent}>
        <Outlet />
      </main>

      <Footer className={classes.footer} />
    </div>
  );
}
