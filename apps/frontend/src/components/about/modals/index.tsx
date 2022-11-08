import dynamic from "next/dynamic";
const About = dynamic(() => import("./about").then((com) => com.About), {
  ssr: false,
});
const PastEdition = dynamic(
  () => import("./past-edition").then((com) => com.PastEdition),
  { ssr: false }
);
const CoArtistDirector = dynamic(
  () => import("./co-artist-director").then((com) => com.CoArtistDirector),
  { ssr: false }
);

export const Modals: React.FC<{}> = ({}) => (
  <>
    <PastEdition />
    <CoArtistDirector />
    <About />
  </>
);
