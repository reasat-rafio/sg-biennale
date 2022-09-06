
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 uCoords;
uniform sampler2D uTexture;
uniform vec2 uRes;
uniform float uTime;
uniform float uAngle;

varying vec2 vUv;

vec2 rotate(vec2 mt, vec2 st, float angle){
	float cos = cos((angle +  0.015) * PI); // try replacing * 1.0 with * PI
	float sin = sin(angle * 0.0); // try removing the * 0.0
	
	// Uncomment these two lines for realism
	//float cos = cos(angle) * (u_time * 0.3);
	//float sin = sin(angle) * (u_time * 0.3);
	
	float nx = (cos * (st.x - mt.x)) + (sin * (st.y - mt.y)) + mt.x;
	float ny = (cos * (st.y - mt.y)) - (sin * (st.x - mt.x)) + mt.y;
	return vec2(nx, ny);
}


void main() {
    vec2 st = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y)/uRes;
	vec2 mt = vec2((uCoords.x * 2000.) , uRes.y - (uCoords.y * 2000. ))/uRes;

	float dx = st.x - mt.x;
	float dy = st.y - mt.y;

	float dist = sqrt(dx * dx + dy * dy);
	float pull = 0.005 / (dist * dist) ;
	
    vec3 color = vec3(0.0);
	
	vec2 r = rotate(mt,st,pull);
	
	vec4 imgcolor = texture2D(uTexture, r);
	color = vec3(
		(imgcolor.x - (pull * .25)),
		(imgcolor.y - (pull * .25)), 
		(imgcolor.z - (pull * .25))
	);
	

     gl_FragColor = vec4(color,1.);
	// vec4 image = texture2D(uTexture, vUv);
	// gl_FragColor = image;
}
