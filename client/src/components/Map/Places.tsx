import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { LatLngLiteral } from "./Map";
import { Button } from "../ui/button";

type PlacesProps = {
  setLocation: (position: LatLngLiteral) => void;
  currLocation: LatLngLiteral;
};

export default function Places({ setLocation, currLocation }: PlacesProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setLocation({ lat, lng });
  };

  return (
    <div className="flex justify-between items-center lg:w-[900px] md:w-[700px] sm:w-[550px] w-[300px]">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="w-full p-2 rounded-md border-2 placeholder-black border-black focus:outline-none"
          placeholder="Search your address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
      <Button onClick={() => setLocation(currLocation)}>
        Add current location
      </Button>
    </div>
  );
}
