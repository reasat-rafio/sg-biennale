import clsx from "clsx";

interface HeaderProps {
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  className,
  children,
  type = "h6",
  variant = "primary",
}) => {
  const Component = type;

  const styles: { primary: string; secondary: string } = {
    primary: "py-2 | lg:text-2xl text-lg font-medium",
    secondary: "",
  };

  return (
    <Component className={clsx(className, styles[`${variant}`])}>
      {children}
    </Component>
  );
};
