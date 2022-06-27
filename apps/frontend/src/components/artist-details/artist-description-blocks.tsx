import { PortableText } from "@utils/sanity";

export const Header: React.FC<{
  name: string;
}> = ({ name }) => {
  return (
    <header>
      <h1 className="text-2xl font-medium">{name}</h1>
    </header>
  );
};

export const Description: React.FC<{ description: any[] }> = ({
  description,
}) => {
  return (
    <p className="text-sm">
      <PortableText blocks={description} />
    </p>
  );
};
