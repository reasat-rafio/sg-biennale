 precision highp float; 

uniform sampler2D uTexture;
uniform float uImageAspectRatio;
uniform float aspectRatio;
uniform float uOpacity;
uniform float uHover;
varying vec2 vUv;

float exponentialInOut(float t) {
    return t == 0.0 || t == 1.0 
    ? t 
    : t < 0.5
        ? +0.5 * pow(2.0, (20.0 * t) - 10.0)
        : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;
} 

void main() {
    vec2 uv = vUv;

    // fix aspectRatio
    float u = uImageAspectRatio/aspectRatio;
    if(uImageAspectRatio > aspectRatio) {
    u = 1. / u;
    }

    // uv.y *= u;
    // uv.y -= (u)/2.-.5;

    // uHover effect
    float zoomLevel = .2;
    float hoverLevel = exponentialInOut(min(1., (distance(vec2(.5), uv) * uHover) + uHover));
    uv *= 1. - zoomLevel * hoverLevel;
    uv += zoomLevel / 2. * hoverLevel;
    uv = clamp(uv, 0., 1.);
    vec4 color = texture2D(uTexture, uv);
    if(hoverLevel > 0.) {
    hoverLevel = 1.-abs(hoverLevel-.5)*2.;
    //Pixel displace
    uv.y += color.r * hoverLevel * .05;
    color = texture2D(uTexture, uv);
    // RGBshift
    color.r = texture2D(uTexture, uv+(hoverLevel)*0.01).r;
    color.g = texture2D(uTexture, uv-(hoverLevel)*0.01).g;
    }

    // gl_FragColor = mix(vec4(1.,1.,1.,uOpacity), color, uOpacity);
    gl_FragColor = texture2D(uTexture, uv);
}