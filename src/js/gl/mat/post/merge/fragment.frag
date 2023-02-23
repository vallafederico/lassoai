uniform float opacity;
uniform sampler2D diff_0;
uniform sampler2D diff_1;
uniform sampler2D diff_2;    
uniform float switch1;
uniform float switch2;
varying vec2 vUv;

void main() {
    

    vec3 d0 = texture2D( diff_0, vUv ).rgb;
    vec3 d1 = texture2D( diff_1, vUv ).rgb;
    vec3 d2 = texture2D( diff_2, vUv ).rgb;

    vec3 final_scene = mix(d0, d1, switch1);
    final_scene = mix(final_scene, d2, switch2);


    gl_FragColor.rgb = final_scene;
    gl_FragColor.a = 1.;
}