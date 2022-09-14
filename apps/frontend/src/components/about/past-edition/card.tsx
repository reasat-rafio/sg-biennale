import CardImgScene from "@components/home/news/card-img-scene";
import { PastEditionCollection } from "@lib/@types/about.types";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

interface CardProps extends PastEditionCollection {
  index: number;
}

export const Card: React.FC<CardProps> = ({ _key, image, title, url }) => {
  const router = useRouter();
  const cardRef = useRef<HTMLElement>(null);
  const [hovered, setHover] = useState(false);
  const [scalePos, setScalePos] = useState([0, 0, 0]);

  return (
    <article
      key={_key}
      ref={cardRef}
      className="flex w-[calc(25%-2%)] flex-col | space-y-4 p-5 | bg-white | rounded | cursor-pointer "
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={({ clientY }) => {
        if (typeof window !== "undefined") {
          const y = -(clientY / window.innerHeight) * 2 + 1;
          setScalePos([y * 0.1, y * 0.1, 1]);
        }
      }}
      onClick={() => {
        if (url) router.push(url);
      }}
    >
      <figure className="p-5 h-[300px] aspect-square">
        <CardImgScene
          hovered={hovered}
          url={image.asset.url}
          scalePos={scalePos}
        />
      </figure>
      <section>
        <h6 className="text-lg font-medium mb-1">{title}</h6>
      </section>
    </article>
  );
};
