"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export function BasicScene() {
    return (
        <div className="w-full max-w-4xl mx-auto border rounded-md shadow p-4 bg-white">
            <Canvas style={{ width: "100%", height: "400px" }}>
                <ambientLight args={[0xffffff, 0.5]} />
                <directionalLight position={[5, 5, 5]} />
                <mesh>
                    <boxGeometry />
                    <meshStandardMaterial args={[{ color: "tomato" }]} />
                </mesh>
                <OrbitControls />
            </Canvas>
        </div>
    );
}