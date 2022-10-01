import { convertSectionTypeName } from "@lib/helpers/global.helpers";
import { useIntersection } from "@lib/hooks";
import React, {
  createRef,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface AnchorWrapperProps {
  setActiveAnchor: Dispatch<SetStateAction<string>>;
  children: ReactNode;
}

export const AnchorWrapper: React.FC<AnchorWrapperProps> = (props) => {
  let children: any = React.Children.toArray(props.children);
  const [onViewArtistRefs, onViewArtistRef] = useState([]);

  useEffect(() => {
    onViewArtistRef((onViewRef) =>
      Array.from({ length: children.length }).map(
        (_, i) => onViewRef[i] || createRef()
      )
    );
  }, [children.length]);

  return (
    <div>
      {onViewArtistRefs.length &&
        children.map((child: string, index: number) => {
          return (
            <Section
              setActiveAnchor={props.setActiveAnchor}
              sectionRef={onViewArtistRefs[index]}
            >
              {child}
            </Section>
          );
        })}
    </div>
  );
};

const Section: React.FC<{
  sectionRef: RefObject<any>;
  setActiveAnchor: any;
  children: React.ReactNode;
}> = ({ children, sectionRef, setActiveAnchor }) => {
  const sectionOnview = useIntersection(sectionRef, { threshold: 0.2 });
  const anchorName = convertSectionTypeName((children as any)?.props.id);

  useEffect(() => {
    if (sectionOnview?.isIntersecting) {
      setActiveAnchor(anchorName);
    }
  }, [sectionOnview?.isIntersecting, anchorName, setActiveAnchor]);

  return (
    <div
      className="lg:scroll-mt-40 scroll-mt-24 first:scroll-mt-40 first:lg:scroll-mt-52"
      id={`anchor-${anchorName}`}
      ref={sectionRef}
    >
      {children}
    </div>
  );
};
