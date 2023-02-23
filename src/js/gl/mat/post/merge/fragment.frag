uniform float opacity;
uniform sampler2D diff_0;
uniform sampler2D diff_1;
uniform float scene_switch;
varying vec2 vUv;

void main() {

    vec3 d0 = texture2D( diff_0, vUv ).rgb;
    vec3 d1 = texture2D( diff_1, vUv ).rgb;

    vec3 final_scene = mix(d0, d1, scene_switch);


    gl_FragColor.rgb = final_scene;
    gl_FragColor.a = 1.;
}