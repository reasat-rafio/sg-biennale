
varying vec2 vUv;
varying float vWave;

uniform float uTime;
uniform vec3 uColor;
uniform sampler2D uTexture;


void main() {
    // vec3 texture = texture2D(uTexture, vUv + vWave * .1).rgb;

  float r = texture2D(uTexture, vUv + vWave * -.05).r;
  float g = texture2D(uTexture, vUv).g;
  float b = texture2D(uTexture, vUv + vWave * .05).b;

  gl_FragColor = vec4(r,g,b, 1.);
}