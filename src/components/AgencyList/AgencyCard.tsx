import React from "react";
import "./AgencyCard.css";

type Agency = {
  id: string;
  name: string;
  distance: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  directionsUrl: string;
  hours: string;
  programs: string[]; // e.g., ['pantry', 'baby-item-pantry']
};

type Props = {
  agency: Agency;
  onViewOnMap?: (agency: Agency) => void;
};

const AgencyCard: React.FC<Props> = ({ agency, onViewOnMap }) => {
  return (
    <li className="agency-card" data-id={agency.id}>
      <button
        type="button"
        className="agency-card__title-button"
        aria-label={`View ${agency.name} on map`}
        onClick={() => onViewOnMap?.(agency)}
      >
        <h4 className="agency-card__name">
          {agency.name}
          <span className="agency-card__distance">
            {" "}
            — {agency.distance} miles
          </span>
        </h4>
      </button>

      <div className="agency-card__content">
        <div className="agency-card__section agency-card__location">
          <h5 className="agency-card__label">Address:</h5>
          <p className="agency-card__text">
            {agency.address}
            <br />
            {agency.city}, {agency.state} {agency.zip}, {agency.country}
          </p>
        </div>

        <div className="agency-card__section agency-card__directions">
          <a
            href={agency.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="agency-card__directions-link"
          >
            Get Directions
          </a>
        </div>

        <div className="agency-card__section agency-card__phone">
          <h5 className="agency-card__label">Phone:</h5>
          <p className="agency-card__text">{agency.phone}</p>
        </div>

        <div className="agency-card__section agency-card__hours">
          <h5 className="agency-card__label">Hours:</h5>
          <p className="agency-card__text">{agency.hours}</p>
        </div>

        <div className="agency-card__section agency-card__programs">
          <h5 className="agency-card__label">Programs:</h5>
          <ul className="agency-card__program-list">
            {agency.programs.map((program, index) => (
              <li key={index} className="agency-card__program-item">
                {program.replace(/-/g, " ")}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
};

export default AgencyCard;
