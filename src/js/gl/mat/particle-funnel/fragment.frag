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


// GUI
uniform float u_part_low;
uniform float u_part_high;

// animation
uniform float u_prog;

const float COLOR_VERT_CTRL = .4;


void main() {

  // alpha mask + size
  float circle = 1. - smoothstep(
    u_part_low,
    u_part_high, 
    (distance(gl_PointCoord.xy, vec2(.5)))
  ) * .5;


  // color computing
  vec3 final_color = u_col3; // white


  if ( v_random_color > .33 && v_random_color < .66) { // blue
    final_color = u_col1;
  } 

  if (v_random_color > .99) { // yellow
   final_color = u_col2 * .8;
  }

  final_color = mix(final_color, u_col2, (v_pos.y * -1.) + u_prog );
  if ( v_random_color > .9) { // blue
    final_color = u_col1;
  } 

  // mix based on Y



  

  gl_FragColor.rgb = final_color;
  // gl_FragColor.rgb = vec3(v_pos.y);
  gl_FragColor.a = circle - .8;

  // gl_FragColor = vec4(1., 0., 0., 1.);
}
