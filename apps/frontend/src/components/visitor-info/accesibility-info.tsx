import { Button } from "@components/ui/button";
import { Container } from "@components/ui/container";
import { AccesibilityInfoProps } from "@lib/@types/visitor-info.types";

export const AccesibilityInfo: React.FC<AccesibilityInfoProps> = ({
  header,
  infos,
  cta,
}) => {
  return (
    <section className="md:py-xxl py-xl | bg-gray--100">
      <Container className="space-y-14">
        <h2 className="text-[32px] font-medium tracking-[-0.02em]">{header}</h2>
        <ul className="grid grid-cols-12 | gap-10">
          {infos.map(({ _key, description, title }) => (
            <li
              className="xl:col-span-4 md:col-span-6 col-span-12 | space-y-2 | font-manrope"
              key={_key}
            >
              <h5 className="text-body-1 font-bold">{title}</h5>
              <p className="text-gray--700 text-body-1">{description}</p>
            </li>
          ))}
        </ul>
        <div className="flex justify-center items-center">
          <Button variant="secondary">{cta.title}</Button>
        </div>
      </Container>
    </section>
  );
};
