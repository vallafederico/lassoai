uniform float opacity;
uniform sampler2D diff_0;
uniform sampler2D diff_1;
uniform sampler2D diff_2;    
uniform float switch1;
uniform float switch2;
varying vec2 vUv;

uniform float u_start;

// transition params
const vec2 direction = vec2(-0.2, 1.);

const float smoothness = 0.05;
const vec2 center = vec2(.5, 0.5);

vec3 transition (vec2 uv, float progress, sampler2D t1, sampler2D t2) {
  vec2 v = normalize(direction);
  v /= abs(v.x) + abs(v.y);
  float d = v.x * center.x + v.y * center.y;
  float m = 1.0 - smoothstep(-smoothness, 0.0, v.x * uv.x + v.y * uv.y - (d - 0.5 + progress * (1.0 + smoothness)));
  return mix(
    texture2D(t1, ((uv - 0.5) * (1.0 - m) + 0.5)), 
    texture2D(t2, ((uv - 0.5) * m + 0.5)), m
  ).rgb;
}

void main() {

    
    vec3 d0 = texture2D(diff_0, vUv).rgb;
    vec3 d1 = texture2D(diff_1, vUv).rgb;
    vec3 d2 = texture2D(diff_2, vUv).rgb;

    vec3 final_scene = transition(vUv, switch1, diff_0, diff_1);
    

    if (switch1 > .9999) {
        final_scene = transition(vUv, switch2, diff_1, diff_2);
    }

    final_scene = mix(vec3(0.), final_scene, u_start);

    gl_FragColor.rgb = final_scene;
    // gl_FragColor.rgb = vec3(dist);
    gl_FragColor.a = 1.;
}



/*

uniform vec2 direction; // = vec2(-1.0, 1.0)

const float smoothness = 0.5;
const vec2 center = vec2(0.5, 0.5);

vec4 transition (vec2 uv) {
  vec2 v = normalize(direction);
  v /= abs(v.x) + abs(v.y);
  float d = v.x * center.x + v.y * center.y;
  float m = 1.0 - smoothstep(-smoothness, 0.0, v.x * uv.x + v.y * uv.y - (d - 0.5 + progress * (1.0 + smoothness)));
  return mix(getFromColor((uv - 0.5) * (1.0 - m) + 0.5), getToColor((uv - 0.5) * m + 0.5), m);
}

*/