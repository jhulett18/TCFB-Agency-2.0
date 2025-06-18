import { useState } from "react";
import styles from "./LocationSearchBox.module.css";
import { useLocationStore } from "../../../store/locationStore";

export default function LocationSearchBox() {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const setUserLocation = useLocationStore((s) => s.setUserLocation);

  const handleSearch = async () => {
    if (!searchValue.trim()) return;
    setLoading(true);

    try {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: searchValue }, (results, status) => {
        setLoading(false);
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          setUserLocation({ lat: location.lat(), lng: location.lng() });
        } else {
          alert("Unable to find location. Try refining your address.");
        }
      });
    } catch (error) {
      setLoading(false);
      alert("Geocoding failed.");
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => alert("Unable to retrieve your location")
    );
  };

  return (
    <div className={styles.container} aria-live="polite" data-open="true">
      <div className={styles.locationButtonWrapper}>
        <button
          className={styles.locationButton}
          name="location"
          aria-pressed="false"
          type="button"
          onClick={handleUseCurrentLocation}
        >
          {/* SVG icon here */}
          <span>Use my current location, or search an address below.</span>
        </button>
      </div>

      <div aria-hidden="false">
        <label htmlFor="searchInput" className="sr-only">
          Enter your location to find food near you:
        </label>
        <div className={styles.inputWrapper}>
          <input
            type="search"
            className={styles.searchInput}
            id="searchInput"
            placeholder="Enter an address, city or zip code"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className={styles.searchButton}
            type="button"
            onClick={handleSearch}
            disabled={loading}
          >
            <span>
              <span className={styles.searchButtonLabel}>
                {loading ? "Searching..." : "Search"}
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
