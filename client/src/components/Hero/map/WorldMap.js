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


  useEffect(() => {
    console.log(project)
  }, [])

  function handleChange(iso) {
    // Here, we invoke the callback with the new value
    props.onChange(iso);
  }

  let country = props.id;

  return (
    <Stage width="100%" height="100%">
      <ZoomContainer>
        {world.features.map((feature, index) => {
          const d = project(feature);
          return (
            <path
              key={index}
              d={d}
              fill="#fff"
              stroke="#666666"
              strokeWidth={0.15}
              className={feature.properties.iso_n3 == country ? "map__country active" : "map__country"}
              data-id={feature.properties.iso_n3}
              onClick={() => handleChange(feature.properties.iso_n3)}
            />
          );
        })}
      </ZoomContainer>
    </Stage>
  );
}

export default WorldMap