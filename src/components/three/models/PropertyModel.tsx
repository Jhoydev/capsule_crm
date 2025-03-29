'use client';

import { OrbitControls, TransformControls, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const PropertyModel = () => {
    const { scene } = useGLTF('/models/low_poly_house_1.glb');
    const modelRef = useRef<THREE.Object3D>(null);
    const { camera } = useThree(); // ✅ obtenemos la cámara

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && modelRef.current) {
                if (camera) {
                    const pos = camera.position;
                    const rot = camera.rotation;

                    console.log(
                        `📸 Cámara - Posición: [${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)}]`,
                        `Rotación: [${rot.x.toFixed(2)}, ${rot.y.toFixed(2)}, ${rot.z.toFixed(2)}]`
                    );
                }
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    return (
        <>
            <axesHelper args={[3]} />
            <gridHelper args={[10, 10]} />
            <OrbitControls />
            <TransformControls mode="translate" showX showY showZ attachArray={undefined} attachObject={undefined}>
                <primitive
                    ref={modelRef}
                    object={scene}
                    scale={1}
                    rotation={[0, Math.PI * 1.5, 0]}
                    position={[0, -1, 0]}
                />
            </TransformControls>
        </>
    );
};
