'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Property } from "@/types/property.types"
import PropertyDetails from "@/app/(app)/properties/components/propertyDetails";
import LocationDetails from "@/app/(app)/properties/components/locationDetails";
import React from "react";
import dynamic from 'next/dynamic';


//Esto es útil para componentes que dependen de objetos o propiedades disponibles solo en el navegador, como window o document, que no existen en el entorno de servidor.
//porl o que con la siguiente intruccion le decimos que cargue el componente mapa de forma dinamica y le indicamos con el ssr false que no lo haga en el lado del servidor.
const MapDetails = dynamic(() => import('./mapDetails'), {
    ssr: false
});

interface TabPropertyProps {
    property: Property
}

const TabProperty: React.FC<TabPropertyProps> = ({ property }) => {
    const renderField = (label: string, value: string | number | null | undefined) => (
        <p className="mr-20"><span className="font-semibold">{label}:</span> {value || '-'}</p>
    );

    return (
        <div className='flex p-5'>
            <Tabs defaultValue="data" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="data">Datos principales</TabsTrigger>
                    <TabsTrigger value="task">Tareas</TabsTrigger>
                    <TabsTrigger value="actions">Acciones</TabsTrigger>
                    <TabsTrigger value="relations">Relaciones</TabsTrigger>
                    <TabsTrigger value="documents">Documentos</TabsTrigger>
                </TabsList>
                <TabsContent value="data">
                    <Card>
                        <CardHeader>
                            <CardTitle>Datos principales</CardTitle>
                            <CardDescription>
                                Información de la propiedad.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 h-[calc(100vh-350px)] overflow-auto">
                            <div className="grid grid-cols-1 gap-4">
                                <PropertyDetails data={property}/>
                                <div className="flex w-full">
                                    <LocationDetails/>
                                    <MapDetails/>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="task">
                    <Card className="overflow-auto">
                        <CardHeader>
                            <CardTitle>Tareas</CardTitle>
                            <CardDescription>
                                Listado de tareas pendientes.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 h-[calc(100vh-350px)] overflow-auto">
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 1: Llamar al cliente</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 2: Enviar correo de seguimiento</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 3: Programar reunió</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 1: Llamar al cliente</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 2: Enviar correo de seguimiento</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 3: Programar reunió</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 1: Llamar al cliente</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 2: Enviar correo de seguimiento</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 3: Programar reunió</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 1: Llamar al cliente</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 2: Enviar correo de seguimiento</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 3: Programar reunió</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 1: Llamar al cliente</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 2: Enviar correo de seguimiento</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 3: Programar reunió</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 1: Llamar al cliente</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 2: Enviar correo de seguimiento</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 3: Programar reunió</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 1: Llamar al cliente</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 2: Enviar correo de seguimiento</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 3: Programar reunió</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 1: Llamar al cliente</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 2: Enviar correo de seguimiento</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 3: Programar reunió</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 1: Llamar al cliente</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 2: Enviar correo de seguimiento</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Tarea 3: Programar reunió</span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="actions">
                    <Card>
                        <CardHeader>
                            <CardTitle>Acciones</CardTitle>
                            <CardDescription>
                                Historial de acciones realizadas.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 h-[calc(100vh-350px)] overflow-auto">
                            <div className="p-4 bg-white rounded shadow">
                                <span>Enviado correo el 01/06/2024</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Realizada llamada el 03/06/2024</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Programada visita el 05/06/2024</span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="relations">
                    <Card>
                        <CardHeader>
                            <CardTitle>Relaciones</CardTitle>
                            <CardDescription>
                                Personas y entidades relacionadas.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 h-[calc(100vh-350px)] overflow-auto">
                        <div className="p-4 bg-white rounded shadow">
                                <span>Relacionado con: Proyecto A</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Contacto: Juan Pérez</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Empresa: Tech Solutions</span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="documents">
                    <Card>
                        <CardHeader>
                            <CardTitle>Documentos</CardTitle>
                            <CardDescription>
                                Documentos del contacto.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 h-[calc(100vh-350px)] overflow-auto">
                        <div className="p-4 bg-white rounded shadow">
                                <span>Contrato firmado</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Presupuesto enviado</span>
                            </div>
                            <div className="p-4 bg-white rounded shadow">
                                <span>Informe de seguimient</span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default TabProperty
