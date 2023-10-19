/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  useJsApiLoader,
  Libraries,
} from "@react-google-maps/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import axios from "axios";
import Header from "./Header";
import Places from "./Places";

export type LatLngLiteral = google.maps.LatLngLiteral;
export type DirectionsResult = google.maps.DirectionsResult;
export type MapOptions = google.maps.MapOptions;

const libraries = ["places"] as Libraries;

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

function MyComponent() {
  const [location, setLocation] = React.useState<LatLngLiteral>();
  const [currLocation, setCurrLocation] = React.useState<LatLngLiteral>(
    {} as LatLngLiteral
  );
  const [hospitals, setHospitals] = React.useState<any[]>([]);
  const [photo, setPhoto] = React.useState<any>();
  const [testPhoto, setTestPhoto] = React.useState<any>();

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setCurrLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error: GeolocationPositionError) => {
          console.log(error.code, error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  React.useEffect(() => {
    const getHospitals = async () => {
      const mapData = {
        location: location,
        radius: 5000,
        type: "hospital",
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(
          "http://localhost:8000/api/v1/maps/nearby-places",
          mapData,
          config
        );
        setHospitals(data.data.results);
        console.log(data.data.results);
      } catch (error: any) {
        console.log(error);
      }
    };

    if (location) {
      getHospitals();
    }
  }, [location]);

  React.useEffect(() => {
    const getPhotoTest = async () => {
      const payload = {
        photoRef:
          "AcJnMuEpbj2l-dHCbecOjuMh1eF0cBVEkfXi0xDEHxHuLW8DUDkCGs9wpAoMNnsc0JPSZZ4fWQ2tx_PHw50Kw4kiHSoIsu5E2Q10SvEvfh6m-3QJVg0qjxxiPAFIKiswo0UB-w5DdReOe3TSZJMVf5cQ_yrMQVdu6J-dajziuuw1CCoxBy9V",
      };

      try {
        const { data } = await axios.post(
          "http://localhost:8000/api/v1/maps/places-photo",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setTestPhoto(data.img);
      } catch (error) {
        console.log(error);
      }
    };
    getPhotoTest();
  }, []);

  React.useEffect(() => {
    const getPhotoData = async (photo: any, placeId: string) => {
      const payload = {
        photoRef: photo,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(
          "http://localhost:8000/api/v1/maps/places-photo",
          payload,
          config
        );
        setPhoto((prevPhotos: any) => ({
          ...prevPhotos,
          [placeId]: data.data,
        }));
      } catch (error: any) {
        console.log(error);
      }
    };

    hospitals.forEach((hospital: any) => {
      if (hospital.photos?.[0].photo_reference) {
        getPhotoData(hospital.photos[0].photo_reference, hospital.place_id);
      }
    });
  }, [hospitals]);

  const center = React.useMemo<LatLngLiteral>(
    () => ({ lat: 43.45, lng: -80.49 }),
    []
  );
  const mapRef = React.useRef<GoogleMap>();
  const onLoad = React.useCallback((map: any) => (mapRef.current = map), []);
  const options = React.useMemo<MapOptions>(
    () => ({
      mapId: "f51bf47145d5b25",
      disableDefaultUI: true,
      clickableIcons: false,
      zoomControl: true,
    }),
    []
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_GOOGLE_MAPS as string,
    libraries,
  });

  return isLoaded ? (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8">
        <Places
          setLocation={(position) => {
            setLocation(position);
            mapRef.current?.panTo(position);
          }}
          currLocation={currLocation}
        />
        <div className="flex justify-around items-center h-[100vh] w-full">
          <ScrollArea className="w-[45%] h-[90%] bg-stone-300">
            {testPhoto && (
              <img src={`data:image/jpeg;base64,${testPhoto}`} alt="testing" />
            )}
            {hospitals.map((hospital: any) => {
              return (
                <Card key={hospital.place_id}>
                  <CardHeader>
                    {photo && photo[hospital.place_id] && (
                      <img src={photo[hospital.place_id]} alt="place-photo" />
                    )}
                    <CardTitle>{hospital.name}</CardTitle>
                    <CardDescription>{hospital.vicinity}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </ScrollArea>
          <GoogleMap
            mapContainerClassName="w-[50%] h-[90%]"
            center={center}
            zoom={10}
            onLoad={onLoad}
            options={options}
          >
            {location && (
              <>
                <Marker
                  position={location}
                  icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                />
                <Circle
                  center={location}
                  radius={15000}
                  options={closeOptions}
                />
                <Circle
                  center={location}
                  radius={30000}
                  options={middleOptions}
                />
                <Circle center={location} radius={45000} options={farOptions} />
              </>
            )}
          </GoogleMap>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

const Map = React.memo(MyComponent);

export default Map;
