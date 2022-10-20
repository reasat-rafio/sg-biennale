import { SanityImage } from "sanity-react-extra";
import { Carousel } from "./carousel";
import { Information, InformationProps } from "./information";

interface KVProps {
  kvs: SanityImage[];
  randomizeKV: boolean;
  information: InformationProps;
}

export const KV: React.FC<KVProps> = ({ information, kvs, randomizeKV }) => {
  return (
    <>
      <Carousel randomizeKV={randomizeKV} kvs={kvs} />
      <Information {...information} />
    </>
  );
};
