'use client'

import { Button } from "@/components/ui/button"
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
import { Contact } from "@/types/contact.types"

interface TabContactProps {
    contact: Contact
}

const TabContact: React.FC<TabContactProps> = ({ contact }) => {
    const renderField = (label: string, value: string | number | null | undefined) => (
        <p><span className="font-semibold">{label}:</span> {value || '-'}</p>
    );

    return (
        <div className='h-full p-5'>
            <Tabs defaultValue="data" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="data">Datos personales</TabsTrigger>
                    <TabsTrigger value="task">Tareas</TabsTrigger>
                    <TabsTrigger value="actions">Acciones</TabsTrigger>
                    <TabsTrigger value="relations">Relaciones</TabsTrigger>
                    <TabsTrigger value="documents">Documentos</TabsTrigger>
                </TabsList>
                <TabsContent value="data">
                    <Card>
                        <CardHeader>
                            <CardTitle>Datos personales</CardTitle>
                            <CardDescription>
                                Información del contacto.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="p-4 bg-white rounded shadow">
                                    <h3 className="font-bold text-blue-600">Datos de Contacto</h3>
                                    <div className="">
                                        {renderField('Email', contact.email)}
                                        {renderField('Teléfono', contact.phone)}
                                        {renderField('Móvil', contact.mobile)}
                                        {renderField('Medio de Contacto', contact.contact_medium)}
                                        {renderField('Idioma', contact.language)}
                                    </div>
                                </div>
                                <div className="p-4 bg-white rounded shadow">
                                    <h3 className="font-bold text-blue-600">Información Personal</h3>
                                    {renderField('NIF', contact.nif)}
                                    {renderField('Fecha de Nacimiento', contact.birthday)}
                                    {renderField('Género', contact.gender)}
                                </div>
                                <div className="p-4 bg-white rounded shadow">
                                    <h3 className="font-bold text-blue-600">Profesión</h3>
                                    {renderField('Profesión', contact.profession)}
                                    {renderField('Compañía', contact.company)}
                                </div>
                                <div className="p-4 bg-white rounded shadow">
                                    <h3 className="font-bold text-blue-600">Notas</h3>
                                    {renderField('Notas', contact.notes)}
                                </div>
                                <div className="p-4 bg-white rounded shadow">
                                    <h3 className="font-bold text-blue-600">RGPD</h3>
                                    {renderField('RGPD', contact.rgpd)}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="task">
                    <Card className="bg-gray-50 shadow-md">
                        <CardHeader>
                            <CardTitle>Tareas</CardTitle>
                            <CardDescription>
                                Listado de tareas pendientes.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-white rounded shadow">
                                <ul className="list-disc pl-5">
                                    <li>Tarea 1: Llamar al cliente</li>
                                    <li>Tarea 2: Enviar correo de seguimiento</li>
                                    <li>Tarea 3: Programar reunión</li>
                                    {/* Añade más tareas según sea necesario */}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="actions">
                    <Card className="bg-gray-50 shadow-md">
                        <CardHeader>
                            <CardTitle>Acciones</CardTitle>
                            <CardDescription>
                                Historial de acciones realizadas.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-white rounded shadow">
                                <ul className="list-disc pl-5">
                                    <li>Enviado correo el 01/06/2024</li>
                                    <li>Realizada llamada el 03/06/2024</li>
                                    <li>Programada visita el 05/06/2024</li>
                                    {/* Añade más acciones según sea necesario */}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="relations">
                    <Card className="bg-gray-50 shadow-md">
                        <CardHeader>
                            <CardTitle>Relaciones</CardTitle>
                            <CardDescription>
                                Personas y entidades relacionadas.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-white rounded shadow">
                                <ul className="list-disc pl-5">
                                    <li>Relacionado con: Proyecto A</li>
                                    <li>Contacto: Juan Pérez</li>
                                    <li>Empresa: Tech Solutions</li>
                                    {/* Añade más relaciones según sea necesario */}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="documents">
                    <Card className="bg-gray-50 shadow-md">
                        <CardHeader>
                            <CardTitle>Documentos</CardTitle>
                            <CardDescription>
                                Documentos del contacto.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-white rounded shadow">
                                <ul className="list-disc pl-5">
                                    <li>Contrato firmado</li>
                                    <li>Presupuesto enviado</li>
                                    <li>Informe de seguimiento</li>
                                    {/* Añade más documentos según sea necesario */}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default TabContact
