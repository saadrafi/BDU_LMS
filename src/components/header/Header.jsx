import { Button, Fab, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="flex pt-2 px-2 justify-between items-center bg-neutral-100 drop-shadow-md ">
        <div className=" flex items-center">
          <IconButton sx={{display:{
            sm:"none",
          }}}>
            <MenuIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <h1 className="text-2xl uppercase font-medium bg-clip-text text-transparent  bg-gradient-to-r from-[#552D8D] to-[#0C61A2]">
            BDU Learning Management System
          </h1>
        </div>

        <div className="hidden md:inline">
          <Link to="/login">
            <Button variant="outlined" startIcon={<LoginIcon />}>
              Log In
            </Button>
          </Link>
        </div>
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
          >
            <AccountCircleRoundedIcon
              sx={{ fontSize: 40, display: { xs: "none", sm: "inline" } }}
            />
          </IconButton>
        </div>
      </div>
      <Link to="/login">
        <Fab
          variant="extended"
          color="primary"
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            display: {
              sm: "none",
            },
          }}
        >
          <LoginIcon sx={{ mr: 1 }} />
          Log In
        </Fab>
      </Link>
    </>
  );
};

export default Header;
