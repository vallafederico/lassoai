#define MPI 3.1415926535897932384626433832795
precision mediump float;

attribute vec3 position;
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

#include ../noise.glsl

void main() {
  vec3 pos = position;

  pos.x = fract(pos.x + v_random + u_time) - .5;
  pos.y = fract(pos.y - v_random - u_time * .3) - .5;

  float ns = cnoise(vec4(
    pos.x * 4., 
    pos.y * 5., 
    pos.z * 3., 
    u_time
  )) * .2;

  // pos.xyz += vec3(ns, ns, ns);
  vec4 m_pos = modelViewMatrix * vec4(pos, 1.0);

  gl_Position = projectionMatrix * m_pos;
  gl_PointSize = (((10. - pos.z) * a_random) + .02) * (1. / -m_pos.z);


  v_uv = uv;
  v_random = a_random;
  v_random_color = a_random_color;
  v_pos = pos;
  // v_color = a_color;
}

