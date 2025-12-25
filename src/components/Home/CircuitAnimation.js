import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const CircuitAnimation = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Select path elements
        const path1 = anime.path('#circuit-path-1');
        const path2 = anime.path('#circuit-path-2');
        const path3 = anime.path('#circuit-path-3');

        // Create animation timeline
        const tl = anime.timeline({
            loop: true,
            easing: 'linear'
        });

        // Electron 1 animation
        tl.add({
            targets: '.electron-1',
            translateX: path1('x'),
            translateY: path1('y'),
            rotate: path1('angle'),
            duration: 3000,
            opacity: [
                { value: 1, duration: 100 },
                { value: 0, duration: 100, delay: 2800 }
            ]
        }, 0);

        // Electron 2 animation
        tl.add({
            targets: '.electron-2',
            translateX: path2('x'),
            translateY: path2('y'),
            rotate: path2('angle'),
            duration: 4000,
            opacity: [
                { value: 1, duration: 100 },
                { value: 0, duration: 100, delay: 3800 }
            ]
        }, 500);

        // Electron 3 animation
        tl.add({
            targets: '.electron-3',
            translateX: path3('x'),
            translateY: path3('y'),
            rotate: path3('angle'),
            duration: 5000,
            opacity: [
                { value: 1, duration: 100 },
                { value: 0, duration: 100, delay: 4800 }
            ]
        }, 1000);

    }, []);

    return (
        <div className="circuit-container" ref={containerRef} style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            zIndex: 0,
            pointerEvents: 'none',
            opacity: 0.6
        }}>
            <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
                {/* Circuit Path 1 */}
                <path
                    id="circuit-path-1"
                    d="M 50 50 L 250 50 L 250 200 L 500 200 L 500 100"
                    fill="none"
                    stroke="rgba(115, 66, 214, 0.2)"
                    strokeWidth="2"
                />
                {/* Electron 1 */}
                <circle className="electron-1" r="4" fill="#a855f7" />

                {/* Circuit Path 2 */}
                <path
                    id="circuit-path-2"
                    d="M 900 550 L 700 550 L 700 400 L 400 400 L 400 500"
                    fill="none"
                    stroke="rgba(46, 204, 113, 0.2)"
                    strokeWidth="2"
                />
                {/* Electron 2 */}
                <circle className="electron-2" r="4" fill="#2ecc71" />

                {/* Circuit Path 3 (Curved) */}
                <path
                    id="circuit-path-3"
                    d="M 100 500 C 200 500, 200 300, 400 300 S 600 100, 800 100"
                    fill="none"
                    stroke="rgba(52, 152, 219, 0.2)"
                    strokeWidth="2"
                />
                {/* Electron 3 */}
                <circle className="electron-3" r="4" fill="#3498db" />
            </svg>
        </div>
    );
};

export default CircuitAnimation;
