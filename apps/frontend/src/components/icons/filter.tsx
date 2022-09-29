import clsx from "clsx";

interface FilterProps {
  className?: string;
}

export const FilterIcon: React.FC<FilterProps> = ({ className }) => {
  return (
    <svg
      className={clsx(className)}
      width="23"
      height="21"
      viewBox="0 0 23 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        r="2.23334"
        transform="matrix(-1 0 0 1 15 3.25)"
        stroke="black"
        strokeWidth="1.53332"
      />
      <path d="M0 3.25H13" stroke="black" strokeWidth="2.3" />
      <path d="M17 3.25L23 3.25" stroke="black" strokeWidth="2.3" />
      <circle
        r="2.23334"
        transform="matrix(-1 0 0 1 8 10.25)"
        stroke="black"
        strokeWidth="1.53332"
      />
      <path d="M23 10.25L10 10.25" stroke="black" strokeWidth="2.3" />
      <path
        d="M6.38867 10.2495L-0.000179052 10.2495"
        stroke="black"
        strokeWidth="2.3"
      />
      <circle
        r="2.23334"
        transform="matrix(-1 0 0 1 15 17.25)"
        stroke="black"
        strokeWidth="1.53332"
      />
      <path d="M0 17.25H13" stroke="black" strokeWidth="2.3" />
      <path d="M17 17.25L23 17.25" stroke="black" strokeWidth="2.3" />
    </svg>
  );
};
