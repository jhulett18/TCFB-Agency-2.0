import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { useFilters } from "../../../../store/useFilters";

const options = [
  { label: "Free Groceries", value: "4" },
  { label: "Free Meals", value: "2" },
  { label: "Free Produce", value: "3" },
  { label: "Other Programs", value: "5" },
];

export default function FoodTypeDropdown() {
  const { foodTypes, toggleFoodType } = useFilters();

  const selectedLabels = options
    .filter((opt) => foodTypes.includes(opt.value))
    .map((opt) => opt.label);

  return (
    <div className="dropdown-wrapper">
      <label htmlFor="foodType" className="dropdown-label">
        Food Type:
      </label>

      <Menu
        menuButton={
          <MenuButton className="dropdown-button">
            {selectedLabels.length > 0
              ? selectedLabels.join(", ")
              : "All Options"}
          </MenuButton>
        }
        transition
      >
        {options.map((opt) => (
          <MenuItem
            key={opt.value}
            className="dropdown-item"
            onClick={() => null}
          >
            <label
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input
                type="checkbox"
                checked={foodTypes.includes(opt.value)}
                onChange={() => toggleFoodType(opt.value)}
                onClick={(e) => e.stopPropagation()} // ✅ prevents dropdown from closing
              />
              {opt.label}
            </label>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
