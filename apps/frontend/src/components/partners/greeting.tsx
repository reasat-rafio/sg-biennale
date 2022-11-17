import { PortableText } from "@utils/sanity";

interface GreetingProps {
  greetings: any;
}

export const Greeting: React.FC<GreetingProps> = ({ greetings }) => {
  return (
    <div className="sm:prose prose-lg max-w-full">
      <PortableText blocks={greetings} />
    </div>
  );
};
