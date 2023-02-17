uniform float opacity;
uniform sampler2D diff_0;
uniform sampler2D diff_1;
varying vec2 vUv;

void main() {

    vec3 d0 = texture2D( diff_0, vUv ).rgb;
    vec3 d1 = texture2D( diff_1, vUv ).rgb;


    gl_FragColor.rgb = d0;
    gl_FragColor.a = 1.;
}