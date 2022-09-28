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
      setActiveAnchor(`anchor-${anchorName}`);
    }
  }, [sectionOnview?.isIntersecting, anchorName, setActiveAnchor]);

  return (
    <div className="" id={`anchor-${anchorName}`} ref={sectionRef}>
      {children}
    </div>
  );
};
