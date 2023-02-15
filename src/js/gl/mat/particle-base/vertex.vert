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

// attribute vec3 a_color;
// varying vec3 v_color;




void main() {
  vec3 pos = position;
  // pos += a_position;


  vec4 m_pos = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = ((10. * a_random) + .02) * (1. / -m_pos.z);
  gl_Position = projectionMatrix * m_pos;

  v_uv = uv;

  v_random = a_random;
  v_random_color = a_random_color;
  // v_color = a_color;
}

