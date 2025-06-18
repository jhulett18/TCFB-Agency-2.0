import styles from "./Navbar.module.css";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "./menuOverrides.css";
import classNames from "classnames";

export default function Navbar() {
  return (
    <header className={styles.navbarRoot}>
      <div className={styles.logoContainer}>
        <img
          src="/assets/tcfb_logo.png"
          alt="FoodFinder logo"
          className={styles.logo}
        />
      </div>

      <nav className={styles.navActions} aria-label="Main navigation">
        {/* Slogan Text */}
        <div className={styles.slogan_text}>
          <span className={styles.slogan_text_primary_color}>
            Tackling Hunger.{" "}
          </span>
          <span className={styles.slogan_text_secondary_color}>
            Since 1988.
          </span>
        </div>

        {/* Help Button */}
        <Menu
          menuButton={
            <MenuButton className={styles.helpButton}>Help</MenuButton>
          }
          transition
        >
          <MenuItem>Settings</MenuItem>
          <MenuItem>About</MenuItem>
        </Menu>
      </nav>
    </header>
  );
}
