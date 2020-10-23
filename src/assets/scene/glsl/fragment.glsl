precision highp float;

varying vec2 vUv;
varying float vWave;
uniform vec2 uRes;
varying vec4 vPosition;
uniform float uTime;
uniform float progress;
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float PR;
uniform float speed;


float circle(in vec2 _st, in float _radius, in float blurriness){
    vec2 dist = _st;
    return 1.-smoothstep(_radius-(_radius*blurriness), _radius+(_radius*blurriness), dot(dist,dist)*4.0);
}

void main() {
	vec2 res = uRes * PR;
	vec2 st = gl_FragCoord.xy / res.xy - vec2(0.5);
	st.y *= uRes.y /uRes.x;
    float normSpeed = clamp(speed * 50. ,0. ,1.); 

	vec2 mouse = uMouse * -.5;
	
	vec2 circlePos = st + mouse;
	float c = circle(circlePos, .01, 2.);

    float r1 = texture2D(uTexture, vUv + .3  * normSpeed * c / 6.).r;
  float g1 = texture2D(uTexture, vUv + .2  *normSpeed *  c / 6.).g;
  float b1 = texture2D(uTexture, vUv + .1  * normSpeed *c / 6.).b;


  vec3 texture = vec3(r1, g1 ,b1);

	gl_FragColor = vec4(texture, 1.);
}