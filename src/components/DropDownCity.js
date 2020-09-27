import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCities } from "../api/ApiCore";
import { setCity, getCity, removeCity } from "../api/cartHelpers";
import SVGIcon from "../assets/SVG/SVGIcon";
import {
  DropDownHeader,
  DropDownListContainer,
  DropDownList,
  DropDownContainer,
  ListItem,
} from "./styles/dropdownStyles";

export default function DropdownCity() {
  const [cityFromLS, setCityFromLS] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setIsOpen(false);
    setCity(value);
    removeCity(value);
  };

  const showCities = () => {
    getCities().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCities(data);
      }
    });
  };

  useEffect(() => {
    showCities();
    setCityFromLS(getCity());
  }, []);

  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggling}>
        <span>
          {cityFromLS.length === 0 ? "Miasto" : cityFromLS.map((c) => c.c)}
        </span>
        <span>
          {isOpen ? (
            <SVGIcon name="X" width={20} fill={"#F77F00"} />
          ) : (
            <SVGIcon name="arrow" width={200} fill={"#F77F00"} />
          )}
        </span>
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer onMouseLeave={() => setIsOpen(!isOpen)}>
          <DropDownList>
            {cities.map((city, i) => (
              <ListItem key={i} onClick={onOptionClicked(city.name)}>
                <Link
                  to={`/city/${city._id}`}
                  style={{ color: "#ffffff" }}
                  value={city._id}
                >
                  {city.name}
                </Link>
              </ListItem>
            ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
}
