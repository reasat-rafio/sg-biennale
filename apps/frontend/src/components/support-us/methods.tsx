import { Cta } from "@lib/@types/global.types";
import Link from "next/link";

interface MethodsProps {
  methods: {
    _key: string;
    title: string;
    description: string;
    cta: Cta;
  }[];
}

export const Methods: React.FC<MethodsProps> = ({ methods }) => {
  return (
    <div className="grid grid-cols-12 gap-7 | my-7">
      {methods.map(({ _key, title, description, cta }) => (
        <div
          key={_key}
          className="flex flex-col items-start space-y-6 col-span-12 lg:col-span-6"
        >
          <h5 className="text-xl font-medium">{title}</h5>
          <p className="font-medium">{description}</p>
          <button className="px-4 py-1 | text-xl | border-2 border-black | rounded-3xl">
            <Link href={cta.href}>
              <a>{cta.title}</a>
            </Link>
          </button>
        </div>
      ))}
    </div>
  );
};
