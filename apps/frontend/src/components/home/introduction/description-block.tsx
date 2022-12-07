interface DescriptionProps {
  subtitle: string;
  description: string;
}

export const DescriptionBlock: React.FC<DescriptionProps> = ({
  subtitle,
  description,
}) => {
  return (
    <div className="flex flex-col space-y-8 max-w-7xl mx-auto pt-section">
      <h4 className="xl:text-heading-3 lg:text-heading-4 text-heading-6 font-medium leading-tight text-black">
        {subtitle}
      </h4>
      <p className="text-gray--700 font-manrope lg:text-body-1 text-body-2">
        {description}
      </p>
    </div>
  );
};
