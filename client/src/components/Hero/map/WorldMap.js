import React, { useState, useEffect } from "react"
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"

import { ZoomContainer } from "./zoom-container";
import { Stage } from "./stage";

const world = require("./world-50m.json");

const WorldMap = (props) => {
  const mercator = geoMercator();
  const project = geoPath().projection(mercator);

  let [activeCountry, setActiveCountry] = useState({id: 0}) 

  useEffect(() => {
    setActiveCountry({id: props.id})
  }, [props])

  let country = props.id.selectedId;

  console.log(props.id.selectedId)

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
              onClick={() => setActiveCountry({id: feature.properties.iso_n3})}
            />
          );
        })}
      </ZoomContainer>
    </Stage>
  );
}

export default WorldMap