import { LiquidButtonClass } from "@lib/helpers/liquid-button.helper";
import { ReactNode, useEffect } from "react";

interface LiquidButtonProps {
  children: ReactNode;
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({ children }) => {
  useEffect(() => {
    const buttons = document.getElementsByClassName("liquid-button");
    for (let buttonIndex = 0; buttonIndex < buttons.length; buttonIndex++) {
      const button = buttons[buttonIndex];
      new LiquidButtonClass(button as SVGElement);
    }
  }, []);

  return (
    <svg
      className="m-auto cursor-pointer | liquid-button"
      data-text={children}
      data-force-factor="0.1"
      data-layer-1-viscosity="0.5"
      data-layer-2-viscosity="0.4"
      data-layer-1-mouse-force="400"
      data-layer-2-mouse-force="500"
      data-layer-1-force-limit="1"
      data-layer-2-force-limit="2"
      data-color1="#DE5742"
      data-color2="#000000"
      data-color3="#292221"
    ></svg>
  );
};
