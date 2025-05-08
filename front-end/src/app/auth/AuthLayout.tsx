import { Paper } from "@mantine/core";
import { Outlet } from "react-router-dom";
import classes from "./AuthLayout.module.css";

const AuthLayout = () => {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form}>
        <Outlet />
      </Paper>
    </div>
  );
};

export default AuthLayout;
