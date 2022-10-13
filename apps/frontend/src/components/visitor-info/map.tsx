import { useEffect, useState } from "react";

interface MapProps {}

export const Map: React.FC<MapProps> = ({}) => {
  return (
    <iframe
      className="aspect-video w-screen "
      src="https://www.onemap.gov.sg/amm/amm.html?mapStyle=Grey&zoomLevel=12&marker=latLng:1.2205499805679,103.859261258906!iwt:null!colour:red&marker=postalcode:039803!colour:red&marker=postalcode:730900!colour:red&marker=postalcode:528523!colour:red&marker=postalcode:609732!colour:red&marker=postalcode:098537!colour:red&marker=postalcode:189555!colour:red&marker=postalcode:188535!colour:red&marker=postalcode:089065!colour:red&marker=postalcode:079903!colour:red&marker=postalcode:088267!colour:red&marker=postalcode:238885!colour:red&marker=postalcode:099254!colour:red&marker=postalcode:099203!colour:red&popupWidth=200"
      height="auto"
      width="auto"
      allowFullScreen
    ></iframe>
  );
};
