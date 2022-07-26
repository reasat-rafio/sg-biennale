import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { IPromotion } from "@lib/@types/home.types";
import { useWindowSize } from "@lib/hooks";
import { imageUrlBuilder } from "@utils/sanity";
import Link from "next/link";
import { SanityImg } from "sanity-react-extra";

interface PromotionProps {
  type: string;
  header: string;
  promotions: IPromotion[];
}

export const promotion: React.FC<PromotionProps> = ({ header, promotions }) => {
  return (
    <Container type="section" className="py-section | border-y-2 border-black">
      <Header type="h3">{header}</Header>

      <div className="grid grid-cols-12 | pt-5 lg:gap-10 gap-5">
        {promotions.map((newsData) => (
          <PromotionCard key={newsData._id} {...newsData} />
        ))}
      </div>
    </Container>
  );
};

const PromotionCard: React.FC<IPromotion> = ({
  description,
  image,
  title,
  cta,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <div className="flex flex-col col-span-12 lg:col-span-6 | space-y-4">
      <div className="lg:h-[350px] h-auto">
        <SanityImg
          className="h-full w-full object-cover"
          height={windowWidth >= 768 ? 400 : 200}
          builder={imageUrlBuilder}
          image={image}
          alt={`${title}`}
        />
      </div>

      <h6>{title}</h6>
      <p>{description}</p>

      {cta?.title && (
        <Link href={cta.href}>
          <a>{cta.title}</a>
        </Link>
      )}
    </div>
  );
};
