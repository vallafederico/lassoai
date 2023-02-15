precision mediump float;

const float MPI = 3.141592;

uniform float u_time;
uniform vec3 u_color_base;

varying vec2 v_uv;
varying float v_random;
varying float v_random_color;


uniform vec3 u_col1;
uniform vec3 u_col2;
uniform vec3 u_col3;


void main() {

  // alpha mask
  // float circle = 1. - smoothstep(-.2, .3, length(gl_PointCoord - vec2(.5)));
  float circle = smoothstep(0., 1., sin(gl_PointCoord.y * 3.141592)) * .5;


  // color computing
  vec3 final_color = vec3(.02); // white

  if ( v_random_color > .33 && v_random_color < .66) { // blue
    final_color = u_col1;
  } 

  if (v_random_color > .99) { // yellow
   final_color = u_col2;
  }

  gl_FragColor.rgb = final_color;
  gl_FragColor.a = circle;

  // gl_FragColor = vec4(1., 0., 0., 1.);
}
