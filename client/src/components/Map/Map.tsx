/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
  margin: "auto",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_GOOGLE_MAPS as string,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map?.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div>
      <header className="block ">
        <div className="px-5 py-16 md:px-7 md:py-10 lg:py-[50px]">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center text-center">
            <div className="mb-6 max-w-[720px] md:mb-10 lg:mb-12 lg:max-w-[800px]">
              <h1 className="mb-10 text-4xl font-bold md:text-6xl">
                Search For Hospitals Nearby
              </h1>
              <div className="mx-auto max-w-[630px]">
                <p className="text-[#7c8aaa]">
                  Lorem ipsum dolor sit amet consectetur adipiscing
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={() => onLoad(map)}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

const Map = React.memo(MyComponent);

export default Map;
