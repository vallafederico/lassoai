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

#include ../noise.glsl

// attribute vec3 a_color;
// varying vec3 v_color;




void main() {
  vec3 pos = position;
  // pos += a_position;


  // pos += vec3(
  //   cnoise(vec4(atan(pos.x * 20.), cos(pos.y * 20.), sin(pos.z * 30.),  u_time * .2))
  // ) ;

  // pos.xy += vec2(cnoise(vec4(sin(pos.z * 200.) + u_time * .2)));

  vec4 m_pos = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = ((10. * a_random) + .02) * (1. / -m_pos.z);
  gl_Position = projectionMatrix * m_pos;

  v_uv = uv;

  v_random = a_random;
  v_random_color = a_random_color;
  // v_color = a_color;
}

