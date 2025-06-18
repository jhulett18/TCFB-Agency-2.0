import React, { useState, useRef, useEffect } from "react";
import AgencyCard from "./AgencyCard";
import agencyData from "../../data/agencies.json";
import { useSelectedAgencyStore } from "../../store/useSelectedAgecy";

const BATCH_SIZE = 5;

export default function AgencyList() {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const selectedId = useSelectedAgencyStore((state) => state.selectedId);
  const setSelectedId = useSelectedAgencyStore((state) => state.setSelectedId);
  const cardRefs = useRef<{ [id: string]: HTMLLIElement | null }>({});

  const visibleAgencies = agencyData.slice(0, visibleCount);

  useEffect(() => {
    if (selectedId && cardRefs.current[selectedId]) {
      cardRefs.current[selectedId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedId]);

  const loadMore = () => setVisibleCount((prev) => prev + BATCH_SIZE);

  return (
    <div>
      <ul className="agency-list">
        {visibleAgencies.map((agency) => (
          <li
            key={agency.id}
            ref={(el) => (cardRefs.current[agency.id] = el)}
            className={`agency-card ${
              selectedId === agency.id ? "active" : ""
            }`}
            onClick={() => setSelectedId(agency.id)}
          >
            <AgencyCard agency={agency} />
          </li>
        ))}
      </ul>

      {visibleCount < agencyData.length && (
        <div className="load-more-container">
          <button className="load-more-button" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
