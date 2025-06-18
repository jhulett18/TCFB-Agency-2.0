import React, { useEffect, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import agencies from "../../data/agencies.json";
import { useSelectedAgencyStore } from "../../store/useSelectedAgecy";
import "./InteractiveMap.css";

const center = { lat: 27.435, lng: -80.35 };
const zoom = 12;

export default function InteractiveMap() {
  const mapRef = useRef<google.maps.Map | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const markerRefs = useRef<{
    [id: string]: google.maps.marker.AdvancedMarkerElement;
  }>({});

  const selectedId = useSelectedAgencyStore((state) => state.selectedId);
  const { setSelectedId } = useSelectedAgencyStore();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCH2qqZvE62MJ5JC1jSJFPA_O8gO2PUO3U", // Move to .env in production
    libraries: ["marker"],
    version: "beta",
  });

  // Update marker appearance on selection
  useEffect(() => {
    Object.entries(markerRefs.current).forEach(([id, marker]) => {
      marker.content?.classList.toggle("selected-marker", id === selectedId);
    });
  }, [selectedId]);

  // Initialize map and markers
  useEffect(() => {
    if (!isLoaded || !window.google?.maps?.marker?.AdvancedMarkerElement)
      return;

    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center,
        zoom,
        mapId: "YOUR_OPTIONAL_MAP_ID",
      }
    );

    mapRef.current = map;
    infoWindowRef.current = new google.maps.InfoWindow();

    agencies.forEach((agency) => {
      if (!agency.coordinates) return;

      // Dynamic icon based on agency type
      const iconType = agency.programs?.includes("pantry") // <-- this is checked
        ? "pantry"
        : agency.programs?.includes("soup-kitchen") // <-- same check again
        ? "soup-kitchen"
        : agency.programs?.includes("baby-item-pantry") // <-- same check again
        ? "baby-item-pantry"
        : "default";

      // Create marker DOM
      const markerEl = document.createElement("div");
      markerEl.className = "custom-marker";
      markerEl.innerHTML = `
        <img 
          src="/icons/${iconType}.png" 
          class="marker-icon" 
          alt="${agency.name}" 
        />
      `;

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: agency.coordinates,
        title: agency.name,
        content: markerEl,
      });

      markerRefs.current[agency.id] = marker;

      marker.addListener("click", () => {
        const html = `
          <div style="font-family: 'Segoe UI'; max-width: 260px; padding: 12px;">
            <h3 style="margin: 0; font-size: 1.1rem;">${agency.name}</h3>
            <p style="margin: 4px 0;">${agency.address}, ${agency.city}</p>
            <p style="margin: 4px 0;">📞 ${
              agency.phone || "No phone listed"
            }</p>
            <p style="margin: 4px 0;">🕒 ${
              agency.hours || "Hours not listed"
            }</p>
            <a href="${
              agency.directionsUrl
            }" target="_blank" style="color: #0066cc; text-decoration: underline;">➤ Get Directions</a>
          </div>
        `;
        infoWindowRef.current?.setContent(html);
        infoWindowRef.current?.open(map, marker);
        setSelectedId(agency.id);
      });
    });
  }, [isLoaded]);

  if (loadError) return <p>Map failed to load.</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div
      id="map"
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
        border: "1px solid #ccc",
        borderRadius: "6px",
      }}
    />
  );
}
