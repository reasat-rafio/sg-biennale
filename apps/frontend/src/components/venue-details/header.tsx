import { Container } from "@components/ui/container";
import { LiquidButton } from "@components/ui/liquid-button";
import Link from "next/link";

interface HeaderProps {
  name: string;
}

export const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <Container type="section" className="mt-xl">
      <Link href="">
        <a>Back to Visitor Info</a>
      </Link>
      <div className="flex items-center space-x-5">
        <header className="flex-1">
          <h1 className="text-heading-3 font-medium">{name}</h1>
        </header>
        <LiquidButton variant="secondary">Get Directions</LiquidButton>
      </div>
    </Container>
  );
};
