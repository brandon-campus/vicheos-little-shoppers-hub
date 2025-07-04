import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AdminReclamosPage = () => {
  const [reclamos, setReclamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchReclamos = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("reclamos").select("*").order("created_at", { ascending: false });
    if (error) {
      toast.error("Error al obtener reclamos");
      setReclamos([]);
    } else {
      setReclamos(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReclamos();
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F0FB] py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Libro de Reclamaciones</h1>
          <Button variant="outline" className="border-[#D3E4FD] text-gray-800" onClick={() => navigate('/admin')}>
            ← Volver
          </Button>
        </div>
        <Button className="mb-6 bg-[#FEC6A1] hover:bg-[#f9b789] text-gray-800" onClick={fetchReclamos} disabled={loading}>
          {loading ? "Actualizando..." : "Actualizar lista"}
        </Button>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Pedido</th>
                <th>Monto</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {reclamos.map((rec: any) => (
                <tr key={rec.id}>
                  <td>{rec.created_at ? new Date(rec.created_at).toLocaleString() : ""}</td>
                  <td>{rec.nombres} {rec.apellidos}</td>
                  <td>{rec.email}</td>
                  <td>{rec.tipo_reclamo}</td>
                  <td className="max-w-xs truncate" title={rec.descripcion}>{rec.descripcion}</td>
                  <td>{rec.pedido}</td>
                  <td>{rec.monto}</td>
                  <td>{rec.telefono}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReclamosPage; 