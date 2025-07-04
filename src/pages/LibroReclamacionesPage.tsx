import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, AlertCircle, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/lib/supabaseClient";

interface ReclamoForm {
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  direccion: string;
  departamento: string;
  provincia: string;
  distrito: string;
  tipoReclamo: string;
  descripcion: string;
  pedido?: string;
  monto?: string;
  fechaCompra?: string;
}

const LibroReclamacionesPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ReclamoForm>();

  const tipoReclamo = watch('tipoReclamo');

  const onSubmit = async (data: ReclamoForm) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Insertar en Supabase
      const { error } = await supabase
        .from('reclamos')
        .insert([{
          tipo_documento: data.tipoDocumento,
          numero_documento: data.numeroDocumento,
          nombres: data.nombres,
          apellidos: data.apellidos,
          email: data.email,
          telefono: data.telefono,
          direccion: data.direccion,
          departamento: data.departamento,
          provincia: data.provincia,
          distrito: data.distrito,
          tipo_reclamo: data.tipoReclamo,
          descripcion: data.descripcion,
          pedido: data.pedido,
          monto: data.monto,
          fecha_compra: data.fechaCompra
        }]);

      if (error) {
        console.error('Error al guardar reclamo:', error);
        setSubmitStatus('error');
      } else {
        setSubmitStatus('success');
        reset();
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Libro de Reclamaciones</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              En Bicheos nos comprometemos a brindarte la mejor atención. Si tienes alguna queja o reclamo, 
              puedes registrarlo aquí y nos pondremos en contacto contigo en un plazo máximo de 15 días hábiles.
            </p>
          </div>

          {/* Información de contacto */}
          <div className="bg-[#D3E4FD]/20 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Información de Contacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-[#D3E4FD] mr-3" />
                <span className="text-gray-700">bicheosb@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-[#D3E4FD] mr-3" />
                <span className="text-gray-700">+51 947 154 677</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-[#D3E4FD] mr-3" />
                <span className="text-gray-700">Arequipa, Perú</span>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Datos personales */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Datos Personales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tipoDocumento">Tipo de Documento *</Label>
                    <Select onValueChange={(value) => setValue('tipoDocumento', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu documento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dni">DNI</SelectItem>
                        <SelectItem value="ce">Carné de Extranjería</SelectItem>
                        <SelectItem value="pasaporte">Pasaporte</SelectItem>
                        <SelectItem value="ruc">RUC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="numeroDocumento">Número de Documento *</Label>
                    <Input
                      id="numeroDocumento"
                      {...register('numeroDocumento', { required: 'Este campo es obligatorio' })}
                      placeholder="Ingresa tu número de documento"
                    />
                    {errors.numeroDocumento && (
                      <p className="text-red-500 text-sm mt-1">{errors.numeroDocumento.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="nombres">Nombres *</Label>
                    <Input
                      id="nombres"
                      {...register('nombres', { required: 'Este campo es obligatorio' })}
                      placeholder="Ingresa tus nombres"
                    />
                    {errors.nombres && (
                      <p className="text-red-500 text-sm mt-1">{errors.nombres.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="apellidos">Apellidos *</Label>
                    <Input
                      id="apellidos"
                      {...register('apellidos', { required: 'Este campo es obligatorio' })}
                      placeholder="Ingresa tus apellidos"
                    />
                    {errors.apellidos && (
                      <p className="text-red-500 text-sm mt-1">{errors.apellidos.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Correo Electrónico *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email', { 
                        required: 'Este campo es obligatorio',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Ingresa un email válido'
                        }
                      })}
                      placeholder="tu@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="telefono">Teléfono *</Label>
                    <Input
                      id="telefono"
                      {...register('telefono', { required: 'Este campo es obligatorio' })}
                      placeholder="+51 999 999 999"
                    />
                    {errors.telefono && (
                      <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Dirección */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Dirección</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="departamento">Departamento *</Label>
                    <Select onValueChange={(value) => setValue('departamento', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="arequipa">Arequipa</SelectItem>
                        <SelectItem value="lima">Lima</SelectItem>
                        <SelectItem value="cusco">Cusco</SelectItem>
                        <SelectItem value="trujillo">Trujillo</SelectItem>
                        <SelectItem value="piura">Piura</SelectItem>
                        <SelectItem value="chiclayo">Chiclayo</SelectItem>
                        <SelectItem value="tacna">Tacna</SelectItem>
                        <SelectItem value="puno">Puno</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="provincia">Provincia *</Label>
                    <Input
                      id="provincia"
                      {...register('provincia', { required: 'Este campo es obligatorio' })}
                      placeholder="Ingresa la provincia"
                    />
                    {errors.provincia && (
                      <p className="text-red-500 text-sm mt-1">{errors.provincia.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="distrito">Distrito *</Label>
                    <Input
                      id="distrito"
                      {...register('distrito', { required: 'Este campo es obligatorio' })}
                      placeholder="Ingresa el distrito"
                    />
                    {errors.distrito && (
                      <p className="text-red-500 text-sm mt-1">{errors.distrito.message}</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input
                      id="direccion"
                      {...register('direccion')}
                      placeholder="Ingresa tu dirección completa"
                    />
                  </div>
                </div>
              </div>

              {/* Detalles del reclamo */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Detalles del Reclamo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tipoReclamo">Tipo de Reclamo *</Label>
                    <Select onValueChange={(value) => setValue('tipoReclamo', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de reclamo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="producto-defectuoso">Producto Defectuoso</SelectItem>
                        <SelectItem value="no-recibido">Producto No Recibido</SelectItem>
                        <SelectItem value="producto-diferente">Producto Diferente al Solicitado</SelectItem>
                        <SelectItem value="mal-servicio">Mal Servicio de Atención</SelectItem>
                        <SelectItem value="demora-entrega">Demora en la Entrega</SelectItem>
                        <SelectItem value="problema-pago">Problema con el Pago</SelectItem>
                        <SelectItem value="garantia">Problema con Garantía</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {tipoReclamo && tipoReclamo !== 'mal-servicio' && (
                    <>
                      <div>
                        <Label htmlFor="pedido">Número de Pedido</Label>
                        <Input
                          id="pedido"
                          {...register('pedido')}
                          placeholder="Ej: PED-2024-001"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="monto">Monto del Pedido (S/)</Label>
                        <Input
                          id="monto"
                          type="number"
                          {...register('monto')}
                          placeholder="0.00"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="fechaCompra">Fecha de Compra</Label>
                        <Input
                          id="fechaCompra"
                          type="date"
                          {...register('fechaCompra')}
                        />
                      </div>
                    </>
                  )}
                </div>
                
                <div className="mt-4">
                  <Label htmlFor="descripcion">Descripción Detallada del Reclamo *</Label>
                  <Textarea
                    id="descripcion"
                    {...register('descripcion', { 
                      required: 'Este campo es obligatorio',
                      minLength: {
                        value: 20,
                        message: 'La descripción debe tener al menos 20 caracteres'
                      }
                    })}
                    placeholder="Describe detalladamente tu reclamo, incluyendo fechas, nombres de productos, y cualquier información relevante..."
                    rows={6}
                  />
                  {errors.descripcion && (
                    <p className="text-red-500 text-sm mt-1">{errors.descripcion.message}</p>
                  )}
                </div>
              </div>

              {/* Alertas */}
              {submitStatus === 'success' && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Tu reclamo ha sido registrado exitosamente. Nos pondremos en contacto contigo en un plazo máximo de 15 días hábiles.
                  </AlertDescription>
                </Alert>
              )}

              {submitStatus === 'error' && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    Hubo un error al enviar tu reclamo. Por favor, intenta nuevamente o contáctanos directamente.
                  </AlertDescription>
                </Alert>
              )}

              {/* Botón de envío */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#D3E4FD] hover:bg-[#c1d8f8] text-gray-800 px-8 py-3 text-lg"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Reclamo'}
                </Button>
              </div>
            </form>
          </div>

          {/* Información adicional */}
          <div className="mt-8 bg-gray-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Importante</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Los reclamos serán atendidos en un plazo máximo de 15 días hábiles.</li>
              <li>• Es obligatorio completar todos los campos marcados con *.</li>
              <li>• Mantén un respaldo de tu número de reclamo para seguimiento.</li>
              <li>• Para casos urgentes, contáctanos directamente por teléfono o email.</li>
              <li>• Este formulario cumple con las regulaciones del Libro de Reclamaciones del Perú.</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LibroReclamacionesPage; 