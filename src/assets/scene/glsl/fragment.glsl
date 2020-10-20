precision highp float;

varying vec2 vUv;
varying float vWave;
uniform float uTime;
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform vec2 rez;
uniform float speed;


void main() {

  float mouseDist = length(vUv - uMouse);
  float normSpeed = clamp(speed * 20. ,0. ,1.);

  float c = smoothstep(.2, 0., mouseDist);
//   vec2 newUV = (vUv - vec2(.5))*resolution.zw + vec2(0.5);
//   vec4 color = texture2D(uTexture,  newUV)

  float r1 = texture2D(uTexture, vUv + .5  * normSpeed * c).r;
  float g1 = texture2D(uTexture, vUv + .3  *normSpeed *  c).g;
  float b1 = texture2D(uTexture, vUv + .1  * normSpeed *c).b;

//   float wave = vWave * 0.25;
//   float r = texture2D(uTexture, vUv + wave / 3.).r;
//   float g = texture2D(uTexture, vUv + wave / 2.).g;
//   float b = texture2D(uTexture, vUv).b;
  vec3 texture = vec3(r1, g1 ,b1);


  gl_FragColor = vec4(texture, 1.);

}