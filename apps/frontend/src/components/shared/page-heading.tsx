export interface PageHeaderProps {
  heading: string;
  tagline: string;
  color?: string;
}

export const PageHeading: React.FC<PageHeaderProps> = ({
  heading,
  tagline,
  color = "#F3F2EC",
}) => {
  return (
    <header className="flex flex-col space-y-3 | xl:pt-xl md:pt-x pt-lg">
      <h1 className="xl:text-heading-4 text-heading-5 font-medium">
        {heading}
      </h1>
      <h2 className="max-w-2xl | text-gray--700 text-body-1 font-manrope | pb-4">
        {tagline}
      </h2>
      <span style={{ background: color }} className="h-[6px] w-[235px]" />
    </header>
  );
};
