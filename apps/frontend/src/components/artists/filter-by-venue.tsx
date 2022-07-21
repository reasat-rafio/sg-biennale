import { ChevronArrow } from "@components/icons/chevron-arrow";
import { Combobox } from "@headlessui/react";
import useArtistsStore from "@stores/artists-store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface FilterByVenueProps {}

export const FilterByVenue: React.FC<FilterByVenueProps> = () => {
  const { allCountries } = useArtistsStore();

  const router = useRouter();

  const [selectedVenue, setSelectedVenue] = useState([]);
  const [query, setQuery] = useState("");

  const filteredCountries =
    query === ""
      ? allCountries
      : allCountries.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    router.push(
      {
        query: {
          ...router.query,
          venue: selectedVenue.map(({ code }) => code),
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  }, [selectedVenue]);

  return (
    <div className="relative">
      <Combobox value={selectedVenue} onChange={setSelectedVenue} multiple>
        <Combobox.Button className="flex items-center justify-between | w-36 | space-x-2 px-4 py-1 | border-2 border-black | rounded-lg">
          <span>Venue</span>
          <ChevronArrow className="h-4 w-4" />
        </Combobox.Button>

        <Combobox.Options className="no-scrollbar | absolute top-12 left-0 | max-h-[330px] | border-2 border-black  | bg-white overflow-auto rounded-lg">
          <div className="sticky top-0 | px-4 | bg-white">
            <Combobox.Input
              className=" | my-3 | border-2 border-black "
              onChange={(event: any) => setQuery(event.target.value)}
            />
          </div>
          <div className="px-4 py-1">
            {filteredCountries.length ? (
              filteredCountries.map((data) => (
                <Combobox.Option
                  key={data.code}
                  value={data}
                  // onClick={onVenueSelect}
                >
                  <input
                    type="checkbox"
                    checked={selectedVenue.some(
                      ({ code }) => code === data.code
                    )}
                  />
                  <span>{data.name}</span>
                </Combobox.Option>
              ))
            ) : (
              <div>No venue found</div>
            )}
          </div>
        </Combobox.Options>
      </Combobox>
    </div>
  );
};
