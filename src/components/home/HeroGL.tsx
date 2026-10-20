'use client';
import { useEffect, useRef, useState } from 'react';
import { reducedMotion } from '@/lib/motion';

// Hover-only soft wavy distortion + warm cursor glow + film grain + vignette.
const FRAG = "precision mediump float;\nuniform sampler2D tex; uniform vec2 r; uniform vec2 m; uniform vec2 ts; uniform float k; uniform float t;\nvec2 cover(vec2 uv){ float ra=r.x/r.y, ta=ts.x/ts.y; vec2 sc = ra>ta ? vec2(1., ta/ra) : vec2(ra/ta, 1.); return clamp((uv-.5)*sc+.5, 0., 1.); }\nfloat h(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }\nvoid main(){\n  vec2 uv=gl_FragCoord.xy/r; uv.y=1.-uv.y;\n  vec2 asp=vec2(r.x/r.y,1.);\n  float d=distance(uv*asp, m*asp);\n  float e=(1.-smoothstep(.0,.55,d))*k;\n  vec2 dir=normalize(uv*asp-m*asp+1e-4);\n  float w=sin(d*22.-t*1.6)*exp(-d*3.2);\n  vec2 flow=vec2(sin(uv.y*6.+t*.7), cos(uv.x*5.-t*.6))*.0025;\n  vec2 suv=uv+(dir*w*.012+flow)*e;\n  vec3 c=texture2D(tex,cover(suv)).rgb;\n  float band=exp(-d*d*9.)*.16*k;\n  vec3 warm=vec3(1.,.8,.5);\n  c=c+(1.-c)*warm*band;\n  float g=h(floor(gl_FragCoord.xy)+fract(t*24.)*91.7)-.5;\n  c+=g*.075;\n  float v=smoothstep(1.25,.35,length((uv-.5)*vec2(1.1,1.3)));\n  c*=mix(.82,1.,v);\n  gl_FragColor=vec4(c,1.);\n}";
const VERT = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';

export function HeroGL({ src }: { src: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const c = ref.current;
    if (!c || reducedMotion()) return;
    const gl = c.getContext('webgl', { antialias: false });
    if (!gl) return;
    const sh = (t: number, s: string) => { const x = gl.createShader(t)!; gl.shaderSource(x, s); gl.compileShader(x); return x; };
    const p = gl.createProgram()!;
    gl.attachShader(p, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(p, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) return;
    gl.useProgram(p);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(p, 'a');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach((k) => gl.texParameteri(gl.TEXTURE_2D, k, gl.CLAMP_TO_EDGE));
    [gl.TEXTURE_MIN_FILTER, gl.TEXTURE_MAG_FILTER].forEach((k) => gl.texParameteri(gl.TEXTURE_2D, k, gl.LINEAR));
    const U = (n: string) => gl.getUniformLocation(p, n);
    const uR = U('r'), uM = U('m'), uTS = U('ts'), uK = U('k'), uT = U('t');
    let size = [1, 1], loaded = false, raf = 0, visible = true, hov = 0;
    const mouse = { x: -1e4, y: -1e4 }, m = { x: 0.5, y: 0.5 };
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      size = [img.naturalWidth, img.naturalHeight];
      loaded = true;
      setReady(true);
    };
    img.src = src;
    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    addEventListener('mousemove', onMove, { passive: true });
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(c);
    const t0 = performance.now();
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!loaded || !visible) return;
      const r = c.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      const w = Math.round(c.offsetWidth * dpr), h = Math.round(c.offsetHeight * dpr);
      if (c.width !== w || c.height !== h) { c.width = w; c.height = h; gl.viewport(0, 0, w, h); }
      const inside = mouse.x >= r.left && mouse.x <= r.right && mouse.y >= r.top && mouse.y <= r.bottom;
      hov += ((inside ? 1 : 0) - hov) * 0.06;
      if (inside) { m.x += ((mouse.x - r.left) / r.width - m.x) * 0.08; m.y += ((mouse.y - r.top) / r.height - m.y) * 0.08; }
      gl.uniform2f(uR, w, h); gl.uniform2f(uM, m.x, m.y); gl.uniform2f(uTS, size[0], size[1]);
      gl.uniform1f(uK, hov); gl.uniform1f(uT, (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); removeEventListener('mousemove', onMove); io.disconnect(); };
  }, [src]);
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: ready ? 1 : 0, transition: 'opacity 1.6s var(--ease)' }}
    />
  );
}
