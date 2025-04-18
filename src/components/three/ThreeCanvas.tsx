'use client'; // Necesario para Next.js

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

interface ThreeCanvasProps {
    children: React.ReactNode;
    enableOrbitControls?: boolean;
    backgroundColor?: string;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
    children,
    enableOrbitControls = true,
    backgroundColor = '#ffffff',
}) => {
    return (
        <Canvas camera={{ position: [0, 0, 10], fov: 50}} style={{ background: backgroundColor }}>
            <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
    );
};
