import React, { useState, useEffect, useContext } from "react"
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"

import { ZoomContainer } from "./zoom-container";
import { Stage } from "./stage";
import { ThemeContext } from '../Hero/Hero.js';

const world = require("./world-50m.json");

const WorldMap = (props) => {
  const mercator = geoMercator();
  const project = geoPath().projection(mercator);
  project.center = ([109, 109], [10, 10])

  const [Position, setPosition] = useState({
    x: 0,
    y: 0
  })

  const [CountryName, setCountryName] = useState({
    name: "slovenijaaa"
  })


  useEffect(() => {
  }, [])

  function handleChange(iso, countryName) {
    // Here, we invoke the callback with the new value
    props.onChange(iso, countryName);
  }

  function handleNameChange(countryName) {
    // Here, we invoke the callback with the new value
    props.onChange(countryName);
  }

  let country = props.id;
  let name = CountryName.name;

  return (
    <Stage width="100%" height="100%">
      <ZoomContainer>
        {world.features.map((feature, index) => {
          const d = project(feature);
          return (
            <g key={index} className={feature.properties.iso_n3 == country ? "map__country active" : "map__country"}>
              <path
                d={d}
                fill="#fff"
                stroke="#666666"
                strokeWidth={0.15}
                data-id={feature.properties.iso_n3}
                data-name={feature.properties.name}
                onClick={() => handleChange(feature.properties.iso_n3, feature.properties.iso_n3)}
              >
              </path>
            </g>
          );
        })}
      </ZoomContainer>
    </Stage>
  );
}

export default WorldMap