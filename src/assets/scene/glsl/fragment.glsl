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

//   float wave = vWave * 0.25;
//   float r = texture2D(uTexture, vUv + wave / 3.).r;
//   float g = texture2D(uTexture, vUv + wave / 2.).g;
//   float b = texture2D(uTexture, vUv).b;
  vec3 texture = vec3(r1, g1 ,b1);
//   vec4 color = texture2D(uTexture, vUv);

    // gl_FragColor = color;
    // gl_FragColor = vec4(1.,0.,0.,1.);
  gl_FragColor = vec4(texture, 1.);

}