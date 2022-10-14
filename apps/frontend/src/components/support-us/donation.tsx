import { Button } from "@components/ui/button";
import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { Cta } from "@lib/@types/global.types";
import { useRouter } from "next/router";

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
  const router = useRouter();

  return (
    <Container
      type="section"
      className="flex lg:flex-row flex-col lg:items-center | lg:gap-10 gap-5 py-xxl | bg-[#F8F8F8F8]"
    >
      <div className="flex-1">
        <div className="lg:max-w-xl | space-y-2">
          <Header>{header}</Header>
          <p className="font-manrope text-body-1 text-gray--700">
            {description}
          </p>
        </div>
      </div>
      <div>
        <Button onClick={() => router.push(cta.href)}>{cta.title}</Button>
      </div>
    </Container>
  );
};
