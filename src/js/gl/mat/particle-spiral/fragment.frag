precision mediump float;

const float MPI = 3.141592;

uniform float u_time;
uniform vec3 u_color_base;

varying vec2 v_uv;
varying vec3 v_pos;
varying float v_random;
varying float v_random_color;


uniform vec3 u_col1;
uniform vec3 u_col2;
uniform vec3 u_col3;

uniform float u_prog;


// GUI
uniform float u_part_low;
uniform float u_part_high;


void main() {

  // alpha mask + size
  float circle = 1. - smoothstep(
    u_part_low,
    u_part_high, 
    (distance(gl_PointCoord.xy, vec2(.5)))
  ) * .5;


  // color computing
  vec3 final_color = u_col2; 

  if ( v_random_color > .53) { // blue
    final_color = u_col3;
  } 

  if (v_random_color > .99) { // yellow
   final_color = u_col2;
  }

  if (v_random_color < (u_prog * .6) ) { // yellow
   final_color = u_col2;
  }



  

  gl_FragColor.rgb = final_color;
  gl_FragColor.a = circle - .8;

  // gl_FragColor = vec4(1., 0., 0., 1.);
}
