import { ThreeCanvas } from "@/components/three/ThreeCanvas";
import { Scene } from "@/components/three/Scene";

export default function Property3DView() {
    return (
        <ThreeCanvas backgroundColor="#e0e0e0">
            <Scene />
        </ThreeCanvas>
    );
}