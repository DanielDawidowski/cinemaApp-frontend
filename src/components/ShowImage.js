import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
  <div>
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      style={{
        // maxHeight: "100%",
        // maxWidth: "100%",
        width: "220px",
        height: "280px",
        borderRadius: "27px",
      }}
    />
  </div>
);

export default ShowImage;
