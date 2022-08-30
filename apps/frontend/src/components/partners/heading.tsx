interface HeadingProps {
  header: string;
  description: string;
}

export const Heading: React.FC<HeadingProps> = ({ header, description }) => {
  return (
    <header className="flex flex-col space-y-4 | xl:pt-xl md:pt-x pt-lg">
      <h1 className="xl:text-heading-4 text-heading-5 font-medium">{header}</h1>
      <h2 className="max-w-2xl | text-gray--700 text-body-1 font-manrope">
        {description}
      </h2>
      <span className="h-[6px] bg-vulcanic w-[235px]" />
    </header>
  );
};
