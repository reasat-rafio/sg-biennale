// @ts-ignore
import glsl from "babel-plugin-glsl/macro";

export const vertexShader = glsl`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
