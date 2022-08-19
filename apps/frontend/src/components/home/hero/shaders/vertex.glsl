varying vec2 vUv;

void main() {
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    vec4 projectedPosition = projectionMatrix * modelViewPosition;
    vUv = uv;
    gl_Position = projectedPosition;
}
