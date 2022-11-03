import { About } from "./about";
import { CoArtistDirector } from "./co-artist-director";
import { PastEdition } from "./past-edition";

export const Modals: React.FC<{}> = ({}) => (
  <>
    <PastEdition />
    <CoArtistDirector />
    <About />
  </>
);
