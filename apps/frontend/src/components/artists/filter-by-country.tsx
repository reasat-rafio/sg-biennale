import { ChevronArrow } from "@components/icons/chevron-arrow";
import { Combobox } from "@headlessui/react";
import useArtistsStore from "@stores/artists-store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface FilterByCountryProps {}

export const FilterByCountry: React.FC<FilterByCountryProps> = () => {
  const { allCountries } = useArtistsStore();

  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState([]);
  const [query, setQuery] = useState("");

  const filteredCountries =
    query === ""
      ? allCountries
      : allCountries.filter((country) => {
          return country.label.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    router.push(
      {
        query: {
          ...router.query,
          country: selectedCountry.map(({ value }) => value),
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  }, [selectedCountry]);

  return (
    <aside className="relative">
      <Combobox
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e)}
        multiple
      >
        <Combobox.Button className="flex items-center justify-between | w-36 | space-x-2 px-4 py-1 | border-2 border-black | rounded-lg">
          <span>Country</span>
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
                <Combobox.Option key={data.value} value={data}>
                  <input
                    type="checkbox"
                    checked={selectedCountry.some(
                      ({ value }) => value === data.value
                    )}
                  />
                  <span>{data.label}</span>
                </Combobox.Option>
              ))
            ) : (
              <div>No country found</div>
            )}
          </div>
        </Combobox.Options>
      </Combobox>
    </aside>
  );
};
