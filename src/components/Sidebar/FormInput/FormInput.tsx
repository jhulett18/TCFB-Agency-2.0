import { useState } from "react";
import "./FormInput2.css";

import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { Button } from "../../Button/Button"; // use relative if no alias
import FoodTypeDropdown from "./filters/FoodTypeDropdown";
import NearbyDropdown from "./filters/NearbyDropdown";

export default function FormInput() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="container" aria-live="polite" data-open="true">
      <div className="formIntro">
        <h3 className="formIntroHeading">
          Share more details to narrow your search results.
        </h3>
      </div>

      {/* FOOD TYPE AND NEARBY FILTERING */}
      <div className="dropdown-group">
        {/* FILTER TYPE */}
        <FoodTypeDropdown />

        {/* Nearby Filter */}
        <NearbyDropdown />
      </div>
    </div>
  );
}
