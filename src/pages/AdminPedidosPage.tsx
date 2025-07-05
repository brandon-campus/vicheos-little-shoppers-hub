import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Filter, X, Search, Phone, Mail as MailIcon, MessageCircle } from "lucide-react";

const estados = ["pendiente", "pagado", "enviado", "cancelado"];
const metodosPago = ["yape", "transferencia"];

const AdminPedidosPage = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [detallePedido, setDetallePedido] = useState(null);
  const [itemsPedido, setItemsPedido] = useState([]);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);
  const [mostrarFiltrosAvanzados, setMostrarFiltrosAvanzados] = useState(false);
  const navigate = useNavigate();

  // Filtros avanzados
  const [filtros, setFiltros] = useState({
    fechaDesde: "",
    fechaHasta: "",
    metodoPago: "",
    montoMinimo: "",
    montoMaximo: "",
    estado: ""
  });

  const fetchPedidos = async () => {
    setLoading(true);
    let query = supabase.from("pedidos").select("*").order("created_at", { ascending: false });
    
    // Aplicar filtros
    if (filtros.estado) query = query.eq("estado", filtros.estado);
    if (filtros.metodoPago) query = query.eq("metodo_pago", filtros.metodoPago);
    if (filtros.montoMinimo) query = query.gte("total", parseFloat(filtros.montoMinimo));
    if (filtros.montoMaximo) query = query.lte("total", parseFloat(filtros.montoMaximo));
    if (filtros.fechaDesde) query = query.gte("created_at", filtros.fechaDesde + "T00:00:00");
    if (filtros.fechaHasta) query = query.lte("created_at", filtros.fechaHasta + "T23:59:59");
    
    const { data, error } = await query;
    if (error) {
      toast.error("Error al obtener pedidos");
      setPedidos([]);
    } else {
      setPedidos(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPedidos();
    // eslint-disable-next-line
  }, [filtros]);

  const handleBuscar = (e) => {
    setBusqueda(e.target.value);
  };

  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  const limpiarFiltros = () => {
    setFiltros({
      fechaDesde: "",
      fechaHasta: "",
      metodoPago: "",
      montoMinimo: "",
      montoMaximo: "",
      estado: ""
    });
    setBusqueda("");
  };

  const pedidosFiltrados = pedidos.filter(p =>
    p.id.toString().includes(busqueda) ||
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.email.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.telefono.toLowerCase().includes(busqueda.toLowerCase())
  );

  const verDetalle = async (pedido) => {
    setDetallePedido(pedido);
    setCargandoDetalle(true);
    const { data, error } = await supabase.from("pedido_items").select("*").eq("pedido_id", pedido.id);
    if (error) {
      toast.error("Error al obtener productos del pedido");
      setItemsPedido([]);
    } else {
      setItemsPedido(data);
    }
    setCargandoDetalle(false);
  };

  const cerrarDetalle = () => {
    setDetallePedido(null);
    setItemsPedido([]);
  };

  const cambiarEstado = async (pedido, nuevoEstado) => {
    const { error } = await supabase.from("pedidos").update({ estado: nuevoEstado }).eq("id", pedido.id);
    if (error) {
      toast.error("Error al cambiar estado");
    } else {
      toast.success("Estado actualizado");
      fetchPedidos();
      if (detallePedido && detallePedido.id === pedido.id) {
        setDetallePedido({ ...detallePedido, estado: nuevoEstado });
      }
    }
  };

  const hayFiltrosActivos = Object.values(filtros).some(valor => valor !== "") || busqueda !== "";

  return (
    <div className="min-h-screen bg-[#F1F0FB] py-12">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Gestión de Pedidos</h1>
          <Button variant="outline" className="border-[#D3E4FD] text-gray-800" onClick={() => navigate('/admin')}>
            ← Volver
          </Button>
        </div>

        {/* Búsqueda básica */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar por ID, nombre, email o teléfono..."
              value={busqueda}
              onChange={handleBuscar}
              className="pl-10"
            />
          </div>
          <Button 
            variant="outline" 
            className="border-[#D3E4FD] text-gray-800 flex items-center gap-2"
            onClick={() => setMostrarFiltrosAvanzados(!mostrarFiltrosAvanzados)}
          >
            <Filter className="w-4 h-4" />
            Filtros avanzados
          </Button>
          {hayFiltrosActivos && (
            <Button 
              variant="outline" 
              className="border-red-200 text-red-600 hover:bg-red-50 flex items-center gap-2"
              onClick={limpiarFiltros}
            >
              <X className="w-4 h-4" />
              Limpiar filtros
            </Button>
          )}
          <Button onClick={fetchPedidos} disabled={loading} className="bg-[#D3E4FD] text-gray-800">
            {loading ? "Actualizando..." : "Actualizar lista"}
          </Button>
        </div>

        {/* Filtros avanzados */}
        {mostrarFiltrosAvanzados && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">Filtros avanzados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha desde</label>
                <Input
                  type="date"
                  value={filtros.fechaDesde}
                  onChange={(e) => handleFiltroChange("fechaDesde", e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha hasta</label>
                <Input
                  type="date"
                  value={filtros.fechaHasta}
                  onChange={(e) => handleFiltroChange("fechaHasta", e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  value={filtros.estado}
                  onChange={(e) => handleFiltroChange("estado", e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-gray-700 bg-white shadow-sm"
                >
                  <option value="">Todos los estados</option>
                  {estados.map(e => <option key={e} value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Método de pago</label>
                <select
                  value={filtros.metodoPago}
                  onChange={(e) => handleFiltroChange("metodoPago", e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-gray-700 bg-white shadow-sm"
                >
                  <option value="">Todos los métodos</option>
                  {metodosPago.map(m => <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monto mínimo (S/)</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={filtros.montoMinimo}
                  onChange={(e) => handleFiltroChange("montoMinimo", e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monto máximo (S/)</label>
                <Input
                  type="number"
                  placeholder="9999.99"
                  value={filtros.montoMaximo}
                  onChange={(e) => handleFiltroChange("montoMaximo", e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Contador de resultados */}
        <div className="mb-4 text-sm text-gray-600">
          Mostrando {pedidosFiltrados.length} de {pedidos.length} pedidos
          {hayFiltrosActivos && " (filtrados)"}
        </div>

        <div className="overflow-x-auto">
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Método de pago</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidosFiltrados.map(p => (
                <tr key={p.id} className="hover:bg-[#F1F0FB] transition cursor-pointer">
                  <td>{p.id}</td>
                  <td>{p.created_at ? new Date(p.created_at).toLocaleString() : ""}</td>
                  <td>{p.nombre}</td>
                  <td>{p.email}</td>
                  <td>S/ {p.total}</td>
                  <td>
                    <select
                      value={p.estado}
                      onChange={e => cambiarEstado(p, e.target.value)}
                      className="border rounded-md px-2 py-1 text-gray-700 bg-white"
                    >
                      {estados.map(e => <option key={e} value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</option>)}
                    </select>
                  </td>
                  <td>{p.metodo_pago}</td>
                  <td>
                    <Button size="sm" variant="outline" className="border-[#D3E4FD] text-gray-800" onClick={() => verDetalle(p)}>
                      Ver detalle
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {/* Modal de detalle de pedido */}
        {detallePedido && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
              <button onClick={cerrarDetalle} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
              <h2 className="text-xl font-bold mb-4">Detalle del pedido #{detallePedido.id}</h2>
              <div className="mb-2 text-gray-700 flex items-center gap-2">
                <b>Cliente:</b> {detallePedido.nombre}
                {/* Accesos rápidos */}
                <a
                  href={`https://wa.me/51${detallePedido.telefono.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hola ${detallePedido.nombre}, te contactamos de Bicheos por tu pedido #${detallePedido.id}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp"
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <MessageCircle className="inline w-5 h-5" />
                </a>
                <a
                  href={`tel:${detallePedido.telefono}`}
                  title="Llamar"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Phone className="inline w-5 h-5" />
                </a>
                <a
                  href={`mailto:${detallePedido.email}?subject=Pedido%20Bicheos%20#${detallePedido.id}`}
                  title="Email"
                  className="text-[#2563eb] hover:text-blue-800"
                >
                  <MailIcon className="inline w-5 h-5" />
                </a>
              </div>
              <div className="mb-2 text-gray-700"><b>Email:</b> {detallePedido.email}</div>
              <div className="mb-2 text-gray-700"><b>Teléfono:</b> {detallePedido.telefono}</div>
              <div className="mb-2 text-gray-700"><b>Dirección:</b> {detallePedido.direccion}</div>
              <div className="mb-2 text-gray-700"><b>Método de pago:</b> {detallePedido.metodo_pago}</div>
              <div className="mb-2 text-gray-700"><b>Notas:</b> {detallePedido.notas || "-"}</div>
              <div className="mb-2 text-gray-700"><b>Estado:</b> {detallePedido.estado}</div>
              <div className="mb-4 text-gray-700"><b>Fecha:</b> {detallePedido.created_at ? new Date(detallePedido.created_at).toLocaleString() : ""}</div>
              <h3 className="font-semibold mb-2">Productos:</h3>
              {cargandoDetalle ? (
                <div>Cargando productos...</div>
              ) : (
                <ul className="divide-y divide-gray-100 mb-4">
                  {itemsPedido.map(item => (
                    <li key={item.id} className="py-2 flex justify-between items-center">
                      <span>{item.nombre_producto} <span className="text-xs text-gray-500">x{item.cantidad}</span></span>
                      <span>S/ {item.precio_unitario}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex justify-between items-center font-bold text-lg mt-4">
                <span>Total:</span>
                <span>S/ {detallePedido.total}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPedidosPage; 