// @ts-ignore
import glsl from "babel-plugin-glsl/macro";

export const fragmentShader = glsl`
  varying vec2 vUv;
  uniform sampler2D texture;
  uniform sampler2D texture2;
  uniform sampler2D disp;
  uniform float _rot;
  uniform float dispFactor;
  uniform float effectFactor;

  void main() {
    vec2 uv = vUv;
    vec4 disp = texture2D(disp, uv);

    vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
    vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);

    vec4 _texture = texture2D(texture, distortedPosition);
    vec4 _texture2 = texture2D(texture2, distortedPosition);

    vec4 finalTexture = mix(_texture, _texture2, dispFactor);

    gl_FragColor = finalTexture;
  }
  `;
