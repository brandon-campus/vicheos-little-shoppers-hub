import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, Line, LineChart } from "recharts";
import { Package, Layers, Mail, LogOut, AlertCircle, ListChecks } from "lucide-react";
import bicheosLogo from "@/../public/img/bicheoslogo.png";

const sidebarLinks = [
  { to: "/admin-products", label: "Productos", icon: <Package className="w-5 h-5 mr-2" /> },
  { to: "/admin-categorias", label: "Categorías", icon: <Layers className="w-5 h-5 mr-2" /> },
  { to: "/admin-pedidos", label: "Pedidos", icon: <ListChecks className="w-5 h-5 mr-2 text-[#2563eb]" /> },
  { to: "/admin-contactos", label: "Mensajes de contacto", icon: <Mail className="w-5 h-5 mr-2" /> },
  { to: "/admin-reclamos", label: "Reclamos", icon: <AlertCircle className="w-5 h-5 mr-2 text-[#ff9800]" /> },
];

const AdminDashboardPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [contactos, setContactos] = useState([]);
  const [reclamos, setReclamos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      if (!data.user) {
        window.location.href = "/admin-login";
      }
    };
    getUser();
    // Fetch dashboard data
    const fetchData = async () => {
      const { data: prod } = await supabase.from("productos").select("*");
      setProducts(prod || []);
      const { data: cats } = await supabase.from("categories").select("*");
      setCategories(cats || []);
      const { data: msgs } = await supabase.from("contactos").select("*");
      setContactos(msgs || []);
      const { data: recls } = await supabase.from("reclamos").select("*").order("created_at", { ascending: false });
      setReclamos(recls || []);
      const { data: peds } = await supabase.from("pedidos").select("*");
      setPedidos(peds || []);
      setLoading(false);
    };
    fetchData();
    setAnimate(true);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin-login";
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

  // Datos para el gráfico de pedidos e ingresos por mes
  const pedidosPorMes = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (11 - i));
    const year = date.getFullYear();
    const month = date.getMonth();
    const label = date.toLocaleString("es-PE", { month: "short", year: "2-digit" });
    return { year, month, label, pedidos: 0, ingresos: 0 };
  });
  pedidos.forEach(p => {
    if (!p.created_at) return;
    const d = new Date(p.created_at);
    const year = d.getFullYear();
    const month = d.getMonth();
    // Buscar el mes correspondiente en los últimos 12 meses
    const idx = pedidosPorMes.findIndex(m => m.year === year && m.month === month);
    if (idx !== -1) {
      pedidosPorMes[idx].pedidos += 1;
      pedidosPorMes[idx].ingresos += Number(p.total) || 0;
    }
  });

  return (
    <div className="min-h-screen bg-[#F1F0FB] py-12">
      <div className="min-h-screen bg-[#F1F0FB] flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-full bg-white shadow-xl border-r border-[#D3E4FD] flex flex-col py-8 px-6">
          <h2 className="text-xl font-bold text-[#2563eb] mb-10 tracking-tight">Panel Admin</h2>
          <nav className="flex flex-col gap-2 flex-1">
            {sidebarLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200
                  text-gray-700 hover:bg-[#D3E4FD]/60 hover:text-[#2563eb] hover:shadow-md
                  ${window.location.pathname === link.to ? 'bg-[#D3E4FD] text-[#2563eb] shadow' : ''}`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
          <Button
            onClick={handleLogout}
            className="w-full mt-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold rounded-lg py-3 shadow-md transition-all duration-200 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50 flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </Button>
        </aside>
        {/* Main content */}
        <main className="flex-1">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8">
            {/* Header con avatar y saludo (ahora dentro del main) */}
            <div className="flex items-center gap-4 mb-8">
              <img src={bicheosLogo} alt="Logo Bicheos" className="w-12 h-12 rounded-full shadow-md border-2 border-[#2563eb] bg-white object-contain" />
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {user?.user_metadata?.name
                    ? `¡Hola, ${user.user_metadata.name.split(" ")[0]}! 👋`
                    : "¡Bienvenido/a al panel, Admin!"}
                </h2>
                <p className="text-sm text-gray-500">Panel de administración de Bicheos</p>
              </div>
            </div>
            {/* Fin header */}
            <div className={`mb-8 grid grid-cols-1 md:grid-cols-5 gap-6 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Card className="bg-gradient-to-br from-[#D3E4FD] to-[#FEC6A1] shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:from-[#2563eb]/20 hover:to-[#ff9800]/30 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-800">Productos</CardTitle>
                  <Package className="w-7 h-7 text-[#2563eb]" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{products.length}</div>
                  <p className="text-xs text-gray-500 mt-1">Total registrados</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-[#FEC6A1] to-[#D3E4FD] shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:from-[#ff9800]/20 hover:to-[#2563eb]/30 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-800">Categorías</CardTitle>
                  <Layers className="w-7 h-7 text-[#ff9800]" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{categories.length}</div>
                  <p className="text-xs text-gray-500 mt-1">Total registradas</p>
                </CardContent>
              </Card>
              <Card onClick={() => navigate('/admin-pedidos')} className="bg-gradient-to-br from-[#D3E4FD] to-[#FEC6A1] shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:from-[#2563eb]/20 hover:to-[#ff9800]/30 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-800">Pedidos</CardTitle>
                  <ListChecks className="w-7 h-7 text-[#2563eb]" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{pedidos.length}</div>
                  <p className="text-xs text-gray-500 mt-1">Total recibidos</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-[#D3E4FD] to-[#FEC6A1] shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:from-[#2563eb]/20 hover:to-[#ff9800]/30 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-800">Mensajes</CardTitle>
                  <Mail className="w-7 h-7 text-[#2563eb]" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{contactos.length}</div>
                  <p className="text-xs text-gray-500 mt-1">Recibidos</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-[#FEC6A1] to-[#D3E4FD] shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:from-[#ff9800]/20 hover:to-[#2563eb]/30 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-800">Reclamos</CardTitle>
                  <AlertCircle className="w-7 h-7 text-[#ff9800]" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{reclamos.length}</div>
                  <p className="text-xs text-gray-500 mt-1">Libro de Reclamaciones</p>
                </CardContent>
              </Card>
            </div>
            <div className={`bg-white rounded-2xl shadow-md p-4 mt-8 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Pedidos e ingresos por mes</h2>
              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pedidosPorMes} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="label" stroke="#888" />
                    <YAxis yAxisId="left" allowDecimals={false} stroke="#2563eb" />
                    <YAxis yAxisId="right" orientation="right" stroke="#ff9800" tickFormatter={v => `S/ ${v}`}/>
                    <Tooltip formatter={(value, name) => name === 'ingresos' ? `S/ ${value}` : value} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="pedidos" fill="#2563eb" name="Pedidos" radius={[8, 8, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="ingresos" stroke="#ff9800" strokeWidth={3} name="Ingresos" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Tabla de últimos reclamos */}
            <div className="bg-white rounded-2xl shadow-md p-4 mt-8 transition-all duration-700">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Últimos Reclamos</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Tipo</th>
                      <th>Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reclamos.slice(0, 10).map((rec) => (
                      <tr key={rec.id}>
                        <td>{rec.created_at ? new Date(rec.created_at).toLocaleString() : ""}</td>
                        <td>{rec.nombres} {rec.apellidos}</td>
                        <td>{rec.email}</td>
                        <td>{rec.tipo_reclamo}</td>
                        <td className="max-w-xs truncate" title={rec.descripcion}>{rec.descripcion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage; 