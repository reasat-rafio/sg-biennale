import { LiquidButton } from "@components/ui/liquid-button";

interface HeaderProps {
  name: string;
}

export const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <div className="flex items-center space-x-5">
      <header className="flex-1">
        <h1 className="text-heading-3 font-medium">{name}</h1>
      </header>
      <LiquidButton variant="secondary">Get Directions</LiquidButton>
    </div>
  );
};
