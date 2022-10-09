import { SelectedImageProps } from "@stores/artist-details.store";
import { RefObject } from "react";
import * as THREE from "three";

interface InitialProps {
  delta: number;
  selectedImage: SelectedImageProps | null;
  uniqueIndex: number;
}

interface OpacityControllerProps extends InitialProps {
  imageRef: RefObject<any>;
}
export const opacityController = ({
  imageRef,
  selectedImage,
  delta,
  uniqueIndex,
}: OpacityControllerProps) => {
  if (!selectedImage) {
    imageRef.current.material.opacity = THREE.MathUtils.damp(
      imageRef.current.material.opacity,
      1,
      4,
      delta
    );
  } else {
    imageRef.current.material.opacity = THREE.MathUtils.damp(
      imageRef.current.material.opacity,
      selectedImage?.index === uniqueIndex ? 1 : 0,
      4,
      delta
    );
  }
};

interface PositionControllerProps extends InitialProps {
  groupRef: RefObject<any>;
  imageRef: RefObject<any>;
  position: any;
  animateXTo: number;
  hovered: boolean;
}

function calcZ(
  isSelecterd: boolean,
  isHovered: boolean,
  positionZ: number
): number {
  if (isSelecterd) return 1;
  else if (!isSelecterd && isHovered) return 1;
  else return positionZ;
}

export const positionController = ({
  groupRef,
  imageRef,
  selectedImage,
  uniqueIndex,
  position,
  delta,
  animateXTo,
  hovered,
}: PositionControllerProps) => {
  // ? controlling the z index / Scalling up the image on scroll and hover
  // imageRef.current.position.z = THREE.MathUtils.damp(
  //   imageRef.current.position.z,
  //   calcZ(selectedImage?.index === uniqueIndex, hovered, position[2]),
  //   selectedImage?.index === uniqueIndex ? 5 : 3,
  //   delta
  // );

  // controling the y position
  imageRef.current.position.y = THREE.MathUtils.damp(
    imageRef.current.position.y,
    selectedImage?.index === uniqueIndex ? 0 : position[1],
    2,
    delta
  );

  groupRef.current.position.x = THREE.MathUtils.damp(
    groupRef.current.position.x,
    selectedImage?.index === uniqueIndex ? animateXTo : position[0],
    selectedImage?.index === uniqueIndex ? 2 : 4,
    delta
  );

  imageRef.current.position.x = THREE.MathUtils.damp(
    imageRef.current.position.x,
    selectedImage?.index === uniqueIndex ? -1.5 : 0,
    2,
    delta
  );
};

interface ScalingControllerProps extends InitialProps {
  imageRef: RefObject<any>;
  scale: any;
}
export const scalingController = ({
  imageRef,
  scale,
  delta,
  uniqueIndex,
  selectedImage,
}: ScalingControllerProps) => {
  // sacling x
  imageRef.current.material.scale[0] = imageRef.current.scale.x =
    THREE.MathUtils.damp(
      imageRef.current.scale.x,
      selectedImage?.index === uniqueIndex ? scale[0] * 1.5 : scale[0],
      6,
      delta
    );

  // sacling y
  imageRef.current.material.scale[1] = imageRef.current.scale.y =
    THREE.MathUtils.damp(
      imageRef.current.scale.y,
      selectedImage?.index === uniqueIndex ? scale[1] * 1.5 : scale[1],
      8,
      delta
    );
};
