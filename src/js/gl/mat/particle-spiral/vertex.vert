#define MPI 3.1415926535897932384626433832795
precision mediump float;

attribute vec3 position;
attribute vec3 position2;
attribute vec2 uv;
attribute vec3 a_position;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform float u_time;
varying vec2 v_uv;


attribute float a_random;
attribute float a_random_color;

varying float v_random;
varying float v_random_color;
varying vec3 v_pos;

// #include ../noise.glsl
#include ../rotate.glsl

uniform float u_prog;


void main() {
  float progress = smoothstep(.0, 1., u_prog * 1.02);

  vec3 pos = position;
  pos = rotate(pos, vec3(0., 0., 1.), (u_prog * 2.) + u_time * 3.);



  vec3 pos2 = position2;

  pos2.z = fract(pos2.z - v_random + u_time * 3.); // move with time
  pos2.x *= 0. + (pos2.y + .5) * (pos2.y * .8);
  pos2.y *= 0. + (pos2.x + .5) * (pos2.x * .8);

  pos = mix(pos2, pos, progress);
  pos.z += u_prog * .65;

  // pos.xy -= smoothstep(.5, 1., u_prog) * .4;

  vec4 m_pos = modelViewMatrix * vec4(pos, 1.0);


  gl_Position = projectionMatrix * m_pos;
  gl_PointSize = (((5.) * a_random) + .02) * (1. / -m_pos.z);


  v_uv = uv;
  v_random = a_random;
  v_random_color = a_random_color;
  v_pos = pos;
}