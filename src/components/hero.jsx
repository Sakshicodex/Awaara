import React,{useEffect,useState } from 'react';
import Homee from './home';
import styles from './Hero.module.css';
import gsap from 'gsap';

function Hero() {
    const [animationFinished, setAnimationFinished] = useState(false);

    useEffect(() => {
        console.clear();

        console.clear();

        const svg = document.querySelector('#Scene');
          const tl = gsap.timeline({
      onComplete: () => {
        // Animation has finished, set the state to indicate it's done
        setAnimationFinished(true);
      },
      defaults: {
        transformOrigin: 'center',
        autoRound: false,
      },
    });

        /* ===================== */
        /* ==== TIME STAMPS ==== */
        /* =============== ===== */
        const T_SHOOTING_STAR = 1.88 + 0.32;
        tl.add('shooting-star', T_SHOOTING_STAR);

        /* =============== */
        /* ==== SCENE ==== */
        /* =============== */
        tl.from('.Scene', {
            scale: 1.12,
            duration: T_SHOOTING_STAR,
            ease: 'linear',
            svgOrigin: '1280 800'
        }, 0);
        tl.to('.Scene', {
            scale: 0.8,
            duration: 2.5,
            ease: 'power2.out',
            svgOrigin: '1280 800'
        }, 'shooting-star');

        /* ============== */
        /* ==== GRID ==== */
        /* ============== */
        const tlOutlines = gsap.timeline({
            defaults: {
                strokeDashoffset: 674.43 * 2,
                duration: 1,
                ease: 'power2.inOut'
            }
        });
        tl.set('#Grid > line', {
            strokeDasharray: 674.43,
            strokeDashoffset: 674.43
        }, 0);
        tlOutlines.to('#Grid > line:nth-child(1)', {
            strokeDashoffset: 674.43 * 2
        }, 0.92);
        tlOutlines.to('#Grid > line:nth-child(2)', {
            strokeDashoffset: 674.43 * 2
        }, 1.72);
        tlOutlines.to('#Grid > line:nth-child(4)', {
            strokeDashoffset: 674.43 * 2
        }, 1);
        tlOutlines.to('#Grid > line:nth-child(3)', {
            strokeDashoffset: 674.43 * 2
        }, 1.8);

        // Make the grid shrink
        tlOutlines.to('#Grid > line:nth-child(1)', {
            scaleY: 0,
            duration: 1.2,
            ease: 'power2.in'
        }, 4);
        tlOutlines.to('#Grid > line:nth-child(2)', {
            scaleY: 0,
            duration: 1.2,
            ease: 'power2.in'
        }, 4);
        tlOutlines.to('#Grid > line:nth-child(4)', {
            scaleX: 0,
            duration: 1.2,
            ease: 'power2.in'
        }, 4);
        tlOutlines.to('#Grid > line:nth-child(3)', {
            scaleX: 0,
            duration: 1.2,
            ease: 'power2.in'
        }, 4);


        const tlInside = gsap.timeline({
            defaults: {
                stagger: -0.1,
                duration: 1,
                ease: 'power1.out'
            }
        });
        tl.set('#Inner line:nth-child(-n+5)', {
            x: -572.71
        }, 0);
        tl.set('#Inner line:nth-child(n+6)', {
            y: 572.71
        }, 0);
        tlInside.to('#Inner line:nth-child(-n+5)', {
            x: 0
        }, 1.04);
        tlInside.to('#Inner line:nth-child(n+6)', {
            y: 0
        }, 1.08);


        tlInside.to('#Inner line:nth-child(-n+5)', {
            scaleX: 0
        }, 4);
        tlInside.to('#Inner line:nth-child(n+6)', {
            scaleY: 0
        }, 4);


        /* =================== */
        /* ==== PARTICLES ==== */
        /* =================== */
        const tlParticles = gsap.timeline({
            defaults: {}
        });
        const elParticles = document.querySelectorAll('#Particles circle');
        elParticles.forEach(p => {
            let start = parseFloat(p.getAttribute('start'));
            let x0 = parseFloat(p.getAttribute('x0'));
            let y0 = parseFloat(p.getAttribute('y0'));
            let simpleFade = (x0 === 0 && y0 === 0) ? true : false;
            if (simpleFade) {
                start = Math.random() * 1.3 + 0.2
            }
            tlParticles.from(p, {
                opacity: 0,
                duration: 0.3,
                ease: simpleFade ? 'power2.out' : 'power2.inOut'
            }, start);
            if (!simpleFade) {
                tlParticles.from(p, {
                    x: x0 * 96.7,
                    y: y0 * 96.7,
                    duration: simpleFade ? 0.3 : 1,
                    ease: simpleFade ? 'power2.out' : 'power2.inOut'
                }, start + 0.1);
            }

            // Create a trail for the particle
            if (!simpleFade) {
                let trail = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                trail.setAttribute('stroke', 'white');
                if (p.getAttribute('trail')) {
                    trail.setAttribute('stroke', '#386364');
                }
                let cx = parseFloat(p.getAttribute('cx'));
                let cy = parseFloat(p.getAttribute('cy'));
                trail.setAttribute('x1', cx);
                trail.setAttribute('y1', cy);
                trail.setAttribute('x2', cx + x0 * 96.7);
                trail.setAttribute('y2', cy + y0 * 96.7);
                svg.appendChild(trail);
                const length = trail.getTotalLength();
                trail.setAttribute('stroke-dasharray', `${length * 0.5} ${length}`);
                trail.setAttribute('stroke-dashoffset', length * 0.5);
                tlParticles.to(trail, {
                    strokeDashoffset: (length * 0.5 + length),
                    duration: 1,
                    ease: 'power2.inOut'
                }, start + 0.1);
                tlParticles.to(trail, {
                    strokeDashoffset: (length * 0.5 * 2) + length,
                    duration: 0.8,
                    ease: 'power1.inOut'
                }, start + 0.9);
            }
            /* Explosion */
            let x = gsap.utils.random(300, 1500) * gsap.utils.random([-1, 1]);
            let y = gsap.utils.random(300, 1500) * gsap.utils.random([-1, 1]);
            tlParticles.to(p, {
                x,
                y,
                duration: Math.random() * 2 + 2,
                ease: 'expo.out'
            }, 2.2);
        });
        /* Particle leaving */

        /* ======================= */
        /* ==== SHOOTING STAR ==== */
        /* ======================= */
        tl.from('#ShootingStar', {
            x: 1100,
            y: -1100,
            duration: .32,
            ease: 'none'
        }, 1.88);
        tl.from('#ShootingStarTrail1', {
            x: 50,
            y: -50,
            duration: .32,
            ease: 'none'
        }, 1.88);
        tl.from('#ShootingStarTrail2', {
            attr: {
                x2: 1516.79 + 500,
                y2: 955.83 - 500
            },
            duration: .32,
            ease: 'none'
        }, 1.88);
        tl.to('#ShootingStar', {
            scale: 0,
            duration: .02,
            ease: 'none'
        }, 'shooting-star');
        tl.from('#Blink', {
            scale: 0,
            duration: 0.08,
            ease: 'power2.out'
        }, 'shooting-star');
        tl.to('#Blink', {
            scale: 0,
            duration: 0.08,
            ease: 'power2.in'
        }, 'shooting-star+=0.08');

        /* Out Circle after shooting star */
        const outCircle1 = document.querySelector('#outCircle1');
        tl.set(outCircle1, {
            strokeDasharray: outCircle1.getTotalLength(),
            strokeDashoffset: outCircle1.getTotalLength()
        }, 0);
        tl.to(outCircle1, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power3.out'
        }, 'shooting-star');
        const outCircle2 = document.querySelector('#outCircle2');
        tl.set(outCircle2, {
            strokeDasharray: outCircle2.getTotalLength(),
            strokeDashoffset: outCircle2.getTotalLength()
        }, 0);
        tl.to(outCircle2, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power3.out'
        }, 'shooting-star+=0.5');
        const outCircle3 = document.querySelector('#outCircle3');
        tl.set(outCircle3, {
            strokeDasharray: outCircle3.getTotalLength(),
            strokeDashoffset: outCircle3.getTotalLength()
        }, 0);
        tl.to(outCircle3, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power3.out'
        }, 'shooting-star+=0.8');


        const fillCircle1 = document.querySelector('#fillCircle1');
        tl.set(fillCircle1, {
            strokeDasharray: fillCircle1.getTotalLength() + 2,
            strokeDashoffset: fillCircle1.getTotalLength() + 2
        }, 0);
        tl.to(fillCircle1, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power3.out'
        }, 'shooting-star+=0.64');
        const fillCircle2 = document.querySelector('#fillCircle2');
        tl.set(fillCircle2, {
            strokeDasharray: fillCircle2.getTotalLength() + 5,
            strokeDashoffset: fillCircle2.getTotalLength() + 5
        }, 0);
        tl.to(fillCircle2, {
            strokeDashoffset: 0,
            duration: 2.5,
            ease: 'power1.out'
        }, 'shooting-star+=1.1');

        const fillCircle3 = document.querySelector('#fillCircle3');
        tl.from(fillCircle3, {
            x: 300,
            y: 300,
            duration: 2.5,
            ease: 'power1.out'
        }, 'shooting-star+=1.1');

        /* RING */

        document.querySelectorAll('#Ring path').forEach(ring => {
            tl.set(ring, {
                strokeDasharray: ring.getTotalLength() + 10,
                strokeDashoffset: ring.getTotalLength() + 10
            }, 0);
            tl.to(ring, {
                strokeDashoffset: 0,
                duration: 2.8,
                ease: 'power2.out'
            }, 'shooting-star+=1.4');
        });


        /* Push all timelines on the main one */
        tl.add(tlOutlines, 0);
        tl.add(tlInside, 0);
        tl.add(tlParticles, 0);

       

        /* MAMBOLEOO */
        const mamboTl = gsap.timeline({
            id: 'Timeline'
        });
        mamboTl.set('svg', { opacity: 1 });

        let colors = ['#c5163d', '#287ad8', '#f5f0f0'];

        function strokes(node) {
            let path = node;
            const reversed = node.getAttribute('reversed') !== null;
            const delay = Math.random() * 0.5;
            const length = path.getTotalLength();
            let end = 0;
            if (reversed) {
                end = length * 2 + 0.5
            }
            for (let i = 0; i < 3; i++) {
                if (i !== 0) {
                    path = path.cloneNode();
                    node.parentNode.appendChild(path);
                }
                path.setAttribute('stroke', colors[i]);
                mamboTl.set(path, {
                    strokeDasharray: length + 0.5,
                    strokeDashoffset: length + 0.6,
                    autoRound: false
                }, 0);
                mamboTl.to(path, {
                    strokeDashoffset: end,
                    autoRound: false,
                    duration: 1.3,
                    ease: `power${3 - i}.out`
                }, i * 0.2 + delay);
                if (i !== 2) {
                    mamboTl.to(path, {
                        opacity: 0,
                        duration: 0.2
                    }, i * 0.2 + delay + 1.35);
                }
            }
        }

        document.querySelectorAll('.mamboleoo path').forEach(p => strokes(p));

        tl.add(mamboTl, 4);

    }, []);

    if (animationFinished) {
        return (
           <Homee></Homee>
        );
    }
    return (
        <div className={styles.hero}>

            {/* Other content */}

            {/* SVG 1 */}
            <div>
                <svg className="space" viewBox="0 0 2560 1600">
                    <defs>
                        <mask id="ringMask">
                            <rect x="730" y="400" width="1000" height="800" fill="white" />
                            <g fill="none" stroke="#000" strokeWidth="58" strokeLinecap="round">
                                <path d="M1208.87,728.66C1311,629.58,1425.47,582,1464.64,622.33s-11.84,153.39-113.93,252.48" />
                                <path d="M1208.87,728.66c-102.09,99.08-153.1,212.12-113.94,252.48s153.69-7.25,255.78-106.33" />
                            </g>
                        </mask>
                    </defs>
                    <g className="Scene">
                        <g stroke="white" fill="none" strokeWidth="4">
                            <path id="outCircle1" d="M1485.4,1006.87a289.22,289.22,0,0,1-205.13,85c-160.22,0-290.1-129.88-290.1-290.1s129.88-290.1,290.1-290.1,290.1,129.89,290.1,290.1a289.21,289.21,0,0,1-85,205.14" />
                            <path id="outCircle2" d="M1074.4,855.3a213.13,213.13,0,0,1-6.8-53.57c0-117.45,95.21-212.67,212.67-212.67s212.67,95.22,212.67,212.67a212.67,212.67,0,0,1-212.67,212.68c-99,0-182.12-67.59-205.87-159.11" />
                            <path id="outCircle3" d="M1143.48,801.73a136.79,136.79,0,1,1,136.79,136.79,136.78,136.78,0,0,1-136.79-136.79" />
                        </g>
                        <g mask="url(#ringMask)">
                            <circle id="fillCircle1" cx="1280.27" cy="801.73" r="252" fill="none" stroke="white" strokeWidth="75.5" transform="rotate(-30 1280.27 801.73)" />
                        </g>
                        <g clipPath="url(#innerCircleClip2)">
                            <circle id="fillCircle3" cx="1280.27" cy="801.73" r="133" fill="white" />
                        </g>
                    </g>
                </svg>
            </div>

            {/* SVG 2 */}
            <div>
                <svg className="space" viewBox="0 0 2560 1600">
                    <g className="Scene">
                        <circle id="fillCircle2" cx="1280.27" cy="801.73" r="172" fill="none" stroke="#c5163d" strokeWidth="78" transform="rotate(210 1280.27 801.73)" />
                        <g id="Ring" fill="none" stroke="#287ad8" strokeWidth="58" strokeLinecap="round" mask="url(#innerCircleClip)">
                            <path d="M1208.87,728.66C1311,629.58,1425.47,582,1464.64,622.33s-11.84,153.39-113.93,252.48" />
                            <path d="M1208.87,728.66c-102.09,99.08-153.1,212.12-113.94,252.48s153.69-7.25,255.78-106.33" />
                        </g>
                    </g>
                </svg>
            </div>

            {/* SVG 3 */}
            <div>
                <svg className="space" viewBox="0 0 2560 1600">
                    <defs>
                        <clipPath id="innerClip">
                            <rect x="993.16" y="514.63" width="572.71" height="572.71" />
                        </clipPath>
                        <mask id="innerCircleClip">
                            <rect x="730" y="400" width="1000" height="800" fill="white" />
                            <circle cx="1280.27" cy="801.73" r="133" fill="black" />
                            <circle cx="1360" cy="870" r="133" fill="white" />
                        </mask>
                        <clipPath id="innerCircleClip2">
                            <circle cx="1280.27" cy="801.73" r="133" fill="black" />
                        </clipPath>
                    </defs>
                    <g className="Scene" id="Scene">
                        <g id="Grid" fill="none" stroke="#7eced6" strokeWidth="2">
                            <line x1="990.17" y1="464.52" x2="990.17" y2="1138.95" />
                            <line x1="1570.37" y1="464.52" x2="1570.37" y2="1138.95" />
                            <line x1="1617.49" y1="511.63" x2="943.05" y2="511.63" />
                            <line x1="1617.49" y1="1091.83" x2="943.05" y2="1091.83" />
                            <g id="Inner" fill="none" stroke="#7eced6" strokeDasharray="3" clipPath="url(#innerClip)">
                                <line x1="1565.88" y1="608.33" x2="993.16" y2="608.33" />
                                <line x1="1565.88" y1="705.03" x2="993.16" y2="705.03" />
                                <line x1="1565.88" y1="801.73" x2="993.16" y2="801.73" />
                                <line x1="1565.88" y1="898.43" x2="993.16" y2="898.43" />
                                <line x1="1565.88" y1="995.13" x2="993.16" y2="995.13" />
                                <line x1="1473.67" y1="1087.34" x2="1473.67" y2="514.63" />
                                <line x1="1376.97" y1="1087.34" x2="1376.97" y2="514.63" />
                                <line x1="1280.27" y1="1087.34" x2="1280.27" y2="514.63" />
                                <line x1="1183.57" y1="1087.34" x2="1183.57" y2="514.63" />
                                <line x1="1086.87" y1="1087.34" x2="1086.87" y2="514.63" />
                            </g>
                        </g>
                        <g id="Particles" fill="#fff">
                            {/* Particle circles */}
                            {/* Add your circles here */}
                        </g>
                        <g id="ShootingStar">
                            <line id="ShootingStarTrail2" x1="1476.29" y1="995.13" x2="1516.79" y2="955.83" fill="none" stroke="#878787" strokeWidth="2" strokeDasharray="10" />
                            <line id="ShootingStarTrail1" x1="1476.29" y1="995.13" x2="1516.79" y2="955.83" fill="none" stroke="#878787" strokeWidth="3" />
                            <line x1="1476.29" y1="995.13" x2="1516.79" y2="955.83" fill="none" stroke="#fff" strokeWidth="5" />
                        </g>
                        <path id="Blink" d="M1453,974.13s14.43,10.31,22.16,10.82,24.23-12.37,24.23-12.37-10.82,10.31-10.57,22.55,10.57,26.67,10.57,26.67-14.28-11.59-23.12-11.59-19.92,7.21-19.92,7.21,7.22-10.56,7.48-17.78S1453,974.13,1453,974.13Z" fill="#fff" />
                    </g>
                </svg>
            </div>

            {/* SVG 4 */}
            <div>
                <svg className="mamboleoo" viewBox="-5 -5 88.14 21.58">
                    <path d="M4.59,10.49C3.39,7.39,2.19,4.19,1,1v9.5" reversed />
                    <path d="M8.19,10.49V1c-1.2,3.2-2.4,6.3-3.6,9.5" />
                    <path d="M20.49,4.19v6.4" reversed />
                    <path d="M20.49,6c.9-1,1.9-2.1,3.4-1.8,1.1,0,1.4.9,1.6,1.8v4.5" reversed />
                    <path d="M25.49,6c.9-1,1.9-2.1,3.4-1.8,1.1,0,1.4.9,1.6,1.8v4.5" reversed />
                    <path class="a" d="M16.89,4.19v6.4m0-5.1a3.13,3.13,0,0,0-3.1-1.4,3.34,3.34,0,0,0-2.1,4.5,2.78,2.78,0,0,0,3.1,1.8c.9,0,1.5-.8,2.1-1.4" />
                    <path d="M34.09,1v9.5" reversed />
                    <path d="M34.09,5.49a3.13,3.13,0,0,1,3.1-1.4,3.34,3.34,0,0,1,2.1,4.5,2.78,2.78,0,0,1-3.1,1.8c-.9,0-1.5-.8-2.1-1.4" />
                    <path d="M47.2,9.63a3.27,3.27,0,0,0,.69-3.54,2.92,2.92,0,0,0-3.1-2l-.3.1a3.29,3.29,0,0,0-.87.46" reversed />
                    <path d="M43.62,4.65a3.37,3.37,0,0,0-1.13,4,2.78,2.78,0,0,0,3.1,1.8,2.83,2.83,0,0,0,1.61-.86" />
                    <path class="l" d="M51.29,1v9.5" reversed />
                    <path class="e" id="path283" d="M54.49,6.89h5.4A2.41,2.41,0,0,0,57,4.19a3.2,3.2,0,0,0-2.2,4.5,2.78,2.78,0,0,0,3.1,1.8c.9,0,1.5-.8,2.1-1.4" />
                    <path id="path285" d="M67.55,4.91a2.83,2.83,0,0,0-2.36-.82l-.3.1a3.39,3.39,0,0,0-2,4.5A3.45,3.45,0,0,0,63,9" reversed />
                    <path id="path285-2" d="M63,9a2.79,2.79,0,0,0,3,1.46,3.24,3.24,0,0,0,2.3-4.4,2.76,2.76,0,0,0-.74-1.18" />
                    <path d="M76.75,8.85a3.18,3.18,0,0,0,.14-2.76,2.92,2.92,0,0,0-3.1-2l-.3.1a3.43,3.43,0,0,0-2.16,2.36" />
                    <path d="M71.33,6.55a3.11,3.11,0,0,0,.16,2.14,2.78,2.78,0,0,0,3.1,1.8,3,3,0,0,0,2.16-1.64" reversed />
                </svg>
            </div>
        </div>
    );
}

export default Hero;
