import { AnimatedHamburgerMenu } from "@components/icons/animated-hamburger-menu";
import { Listbox, Transition } from "@headlessui/react";
import { AllVenuesProps } from "@lib/@types/programmes-events.types";
import useProgrammesAndEventsStore from "@stores/programme-event.store";
import { Fragment, MouseEvent, useEffect, useState } from "react";

export const FilterByVenue: React.FC<{}> = () => {
  const { allVenues, selectedVenue, setSelectedVenue } =
    useProgrammesAndEventsStore();

  const onChangeAction = (venue: AllVenuesProps) => setSelectedVenue(venue);

  const removeVenueFilteringAction = (e: MouseEvent<SVGSVGElement, any>) =>
    setSelectedVenue(null);

  return (
    <div className="z-20">
      <Listbox value={selectedVenue}>
        <div className="relative mt-1">
          <Listbox.Button className="flex items-center xl:w-[40%] md:w-[70%] w-full | space-x-4 p-3 | border-b border-black cursor-pointer">
            <span className="flex-1 text-left block truncate">
              {selectedVenue?.name ? selectedVenue.name : "See by Venue"}
            </span>

            <AnimatedHamburgerMenu
              onClick={removeVenueFilteringAction}
              animate={selectedVenue !== null}
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm | scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 z-30 | xl:w-[40%] md:w-[70%] w-full">
              {allVenues.map((venue) => (
                <Listbox.Option
                  key={venue._id}
                  onClick={() => onChangeAction(venue)}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-vulcanic text-gray--700" : "text-gray-900"
                    }`
                  }
                  value={venue}
                >
                  {() => (
                    <>
                      <span
                        className={`block truncate ${
                          venue._id === selectedVenue?._id
                            ? "font-medium"
                            : "font-normal"
                        }`}
                      >
                        {venue.name}
                      </span>
                      {venue._id === selectedVenue?._id ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-love">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-5 w-5"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
