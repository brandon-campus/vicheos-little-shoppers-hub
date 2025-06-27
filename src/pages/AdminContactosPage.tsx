import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AdminContactosPage = () => {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchContactos = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("contactos").select("*").order("created_at", { ascending: false });
    if (error) {
      toast.error("Error al obtener mensajes de contacto");
      setContactos([]);
    } else {
      setContactos(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContactos();
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F0FB] py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Mensajes de Contacto</h1>
          <Button variant="outline" className="border-[#D3E4FD] text-gray-800" onClick={() => navigate('/admin')}>
            ← Volver
          </Button>
        </div>
        <Button className="mb-6 bg-[#D3E4FD] hover:bg-[#c1d8f8] text-gray-800" onClick={fetchContactos} disabled={loading}>
          {loading ? "Actualizando..." : "Actualizar lista"}
        </Button>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Mensaje</th>
              </tr>
            </thead>
            <tbody>
              {contactos.map((msg: any) => (
                <tr key={msg.id}>
                  <td>{msg.created_at ? new Date(msg.created_at).toLocaleString() : ""}</td>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminContactosPage; 