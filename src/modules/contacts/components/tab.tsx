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
        <p className="mr-20"><span className="font-semibold">{label}:</span> {value || '-'}</p>
    );

    return (
        <div className='flex p-5'>
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
                        <CardContent className="space-y-4 h-[calc(100vh-350px)] overflow-auto">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="p-4 bg-white rounded shadow">
                                    <h3 className="font-bold text-blue-600">Datos de Contacto</h3>
                                    <div className="flex flex-wrap min-h-[80px] p-5">
                                        {renderField('Email', contact.email)}
                                        {renderField('Teléfono', contact.phone)}
                                        {renderField('Móvil', contact.mobile)}
                                        {renderField('Medio de Contacto', contact.contact_medium)}
                                        {renderField('Idioma', contact.language)}
                                    </div>
                                </div>
                                <div className="p-4 bg-white rounded shadow">
                                    <h3 className="font-bold text-blue-600">Información Personal</h3>
                                    <div className="flex flex-wrap min-h-[80px] p-5">
                                        {renderField('NIF', contact.nif)}
                                        {renderField('Fecha de Nacimiento', contact.birthday)}
                                        {renderField('Género', contact.gender)}
                                    </div>
                                </div>
                                <div className="p-4 bg-white rounded shadow">
                                    <h3 className="font-bold text-blue-600">Profesión</h3>
                                    <div className="flex flex-wrap  min-h-[80px] p-5">
                                        {renderField('Profesión', contact.profession)}
                                        {renderField('Compañía', contact.company)}
                                    </div>
                                </div>
                                <div className="p-4 bg-white rounded shadow">
                                    <h3 className="font-bold text-blue-600">Notas</h3>
                                    <div className="flex flex-wrap  min-h-[80px] p-5">
                                        {renderField('Notas', contact.notes)}
                                    </div>
                                </div>
                                <div className="p-4 bg-white rounded shadow">
                                    <h3 className="font-bold text-blue-600">RGPD</h3>
                                    <div className="flex flex-wrap min-h-[200px] p-5">
                                        {renderField('RGPD', contact.rgpd)}
                                    </div>
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

export default TabContact
