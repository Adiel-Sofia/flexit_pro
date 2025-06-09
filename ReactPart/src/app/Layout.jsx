import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import classes from "./layout.module.css";
import { useNavigate } from "react-router-dom";

export default function Layout(props) {
  // console.log(currentUser);
  const navigate = useNavigate();
  function navigateToUse() {
    navigate("/use");
  }
  function navigateToModify() {
    navigate("/modify");
  }
  const { logout } = props;
  return (
    <div className={classes.layoutContainer}>
      <Header logout={logout} modify={navigateToModify} use={navigateToUse} />

      <main className={classes.mainContent}>
        <Outlet />
      </main>

      <Footer className={classes.footer} />
    </div>
  );
}
