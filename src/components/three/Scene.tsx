"use client";

import { OrbitControls } from "@react-three/drei";
import { PropertyModel } from "@/components/three/models/PropertyModel";

export const Scene = () => {
    return (
        <>
            {/* Luces */}
            <ambientLight args={[0xffffff, 0.5]} />
            <directionalLight position={[5, 5, 5]} />

            {/* Modelo de la propiedad */}
            <PropertyModel />

            {/* Controles de cámara */}
            <OrbitControls />
        </>
    );
};