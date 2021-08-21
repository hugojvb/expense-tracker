import { FC, Fragment, useState, useContext, MouseEvent } from "react";

import LeftDrawer from "./LeftDrawer";

// MATERIAL-UI COMPONENTS IMPORT
import {
  makeStyles,
  Theme,
  createStyles,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  withStyles,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

// MATERIAL-UI ICONS IMPORT
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircle from "@material-ui/icons/AccountCircle";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import HistoryIcon from "@material-ui/icons/History";
import MenuIcon from "@material-ui/icons/Menu";

// ROUTER LINK IMPORT
import { Link } from "react-router-dom";

// CONTEXT IMPORT
import Context from "../context/context";

// MAKE STYLES
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    brand: {
      flexGrow: 1,
      marginLeft: 20,
      cursor: "pointer",
    },
    menu: {
      marginTop: "5vh",
    },
    link: {
      textDecoration: "none",
      color: "#444",
    },
    drawerOpen: {
      marginRight: "1em",
    },
  })
);

// CUSTOM MENU ITEM COMPONENT
const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

// FUNCTIONAL COMPONENT
const Navbar: FC = (): JSX.Element => {
  // USE STYLES HOOK
  const classes = useStyles();

  // USE CONTEXT HOOK
  const context = useContext(Context);

  // MENU STATE
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  // OPEN MENU
  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // CLOSE MENU
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // LOGOUT STATE
  const { logout } = context;

  // CHANGE LOGGEDIN STATE
  const onLogout = () => {
    if (logout) {
      logout();
    }
  };

  return (
    <Fragment>
      <AppBar position="sticky" className={classes.root} color="primary">
        <LeftDrawer />
        <Toolbar>
          <IconButton color="inherit" className={classes.drawerOpen}>
            <MenuIcon />
          </IconButton>
          <img
            src="/logo.png"
            alt="logo"
            height="40"
            width="50"
            onClick={() => (window.location.pathname = "/")}
          />
          <Typography
            variant="h6"
            className={classes.brand}
            onClick={() => (window.location.pathname = "/")}
          >
            Expense Tracker
          </Typography>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              elevation={4}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={openMenu}
              onClose={handleCloseMenu}
              className={classes.menu}
            >
              <Link to="/home" className={classes.link}>
                <StyledMenuItem onClick={handleCloseMenu}>
                  <ListItemIcon>
                    <HomeIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </StyledMenuItem>
              </Link>
              <Link to="/goals" className={classes.link}>
                <StyledMenuItem onClick={handleCloseMenu}>
                  <ListItemIcon>
                    <TrackChangesIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Goals" />
                </StyledMenuItem>
              </Link>
              <Link to="/history" className={classes.link}>
                <StyledMenuItem onClick={handleCloseMenu}>
                  <ListItemIcon>
                    <HistoryIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="History" />
                </StyledMenuItem>
              </Link>
              <Link to="/login" className={classes.link} onClick={onLogout}>
                <StyledMenuItem onClick={handleCloseMenu}>
                  <ListItemIcon>
                    <ExitToAppIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </StyledMenuItem>
              </Link>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Navbar;
