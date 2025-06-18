import LocationSearchBox from "../LocationSearchBox/LocationSearchBox";
import styles from "./SidebarHeader.module.css";

export default function SidebarHeader() {
  return (
    <header className={styles.header} aria-hidden="false">
      <h1 className="sr-only">Food Finder</h1>
      <h2 className={styles.subheading}>
        Find free groceries, meals, or places to double your SNAP EBT benefits
        near you.
      </h2>
      <LocationSearchBox />
    </header>
  );
}
