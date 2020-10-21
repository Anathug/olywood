precision highp float;

varying vec2 vUv;
varying float vWave;
varying vec4 resolution;
varying vec4 vPosition;
uniform float uTime;
uniform float progress;
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform vec2 rez;
uniform float speed;


void main() {

  float mouseDist = length(vUv - uMouse);
  float normSpeed = clamp(speed * 20. ,0. ,1.);

  float c = smoothstep(.2, 0., mouseDist);
  float r1 = texture2D(uTexture, vUv + .5  * normSpeed * c).r;
  float g1 = texture2D(uTexture, vUv + .3  *normSpeed *  c).g;
  float b1 = texture2D(uTexture, vUv + .1  * normSpeed *c).b;

  vec3 texture = vec3(r1, g1 ,b1);

//   float wave = vWave * 0.25;
//   float r = texture2D(uTexture, vUv + wave / 3.).r;
//   float g = texture2D(uTexture, vUv + wave / 2.).g;
//   float b = texture2D(uTexture, vUv).b;


  
//   vec3 color1 = vec3(0.886, 0.501, 0.643);
//   vec3 color2 = vec3(0.749, 0.411, 0.537); 

//   float mixValue = distance(vUv, vec2(0.,1.));

//   vec3 finalColor = mix(color1, color2, mixValue);

//   float r2 = finalColor.r + .5 * c * normSpeed + vUv.x;
//   float g2 = finalColor.g  + .3 * c * normSpeed;
//   float b2 = finalColor.b  + .1  * c * normSpeed;

//   vec3 finalColorDistorted = vec3(r2,g2, b2);

  gl_FragColor = vec4(texture, 1.);

}