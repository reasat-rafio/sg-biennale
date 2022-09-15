import { Button } from "@components/ui/button";
import { Container } from "@components/ui/container";
import { Cta } from "@lib/@types/global.types";

interface DonationProps {
  header: string;
  description: string;
  cta: Cta;
}

export const Donation: React.FC<DonationProps> = ({
  header,
  description,
  cta,
}) => {
  return (
    <Container
      type="section"
      className="flex lg:flex-row flex-col lg:items-center | lg:gap-10 gap-5 py-xxl | bg-[#F8F8F8F8]"
    >
      <div className="flex-1">
        <div className="lg:max-w-xl | space-y-2">
          <h2 className="font-medium lg:text-heading-4 text-heading-5">
            {header}
          </h2>
          <p className="font-manrope text-body-1 text-gray--700">
            {description}
          </p>
        </div>
      </div>
      <div>
        <Button>{cta.title}</Button>
      </div>
    </Container>
  );
};