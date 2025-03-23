import { BasicScene } from "@/three/scenes/BasicScene";

export default function Page() {
    return (
        <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold">Escena 3D de prueba</h1>
            <BasicScene />
        </div>
    );
}