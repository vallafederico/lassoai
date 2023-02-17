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
  // pos.y += fract(u_time * .2);


  vec4 m_pos = modelViewMatrix * vec4(pos, 1.0);

  // float ns = cnoise(vec4(
  //   m_pos.x * 4., 
  //   m_pos.y * 5., 
  //   m_pos.z * 3., 
  //   u_time * .002
  // )) * .2;

  // m_pos.x += (ns) ;
  // m_pos.y += (ns) ;
  // m_pos.z += (ns) ;

  // m_pos.y -= fract(m_pos.y * 10. + u_time * .2);
  // m_pos.x += fract(m_pos.x * 10. + u_time * .2);



  gl_PointSize = ((10. * a_random) + .02) * (1. / -m_pos.z);
  gl_Position = projectionMatrix * m_pos;


  v_uv = uv;
  v_random = a_random;
  v_random_color = a_random_color;
  // v_color = a_color;
}

