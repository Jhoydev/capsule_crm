"use client";

import { useGLTF } from '@react-three/drei';

export const PropertyModel = () => {
    const { scene } = useGLTF('/models/low_poly_house_1.glb');
    return <primitive object={scene} scale={1} />;
};
