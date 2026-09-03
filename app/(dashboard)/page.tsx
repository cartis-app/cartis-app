"use client";

import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Store, 
  Edit, 
  Menu, 
  Eye,
  ChevronDown,
  Zap
} from "lucide-react";

// ---------- DONNÉES FICTIVES ----------
const restaurantsData = [
  { id: 1, name: "Le Chalet", canton: "VD", status: "Actif", color: "#D97706" },
  { id: 2, name: "Café Central", canton: "GE", status: "Actif", color: "#2563EB" },
  { id: 3, name: "Auberge de la Plage", canton: "VS", status: "En pause", color: "#16A34A" },
  { id: 4, name: "Bistrot du Lac", canton: "FR", status: "Actif", color: "#7C3AED" },
  { id: 5, name: "Pizzeria Sole", canton: "TI", status: "Actif", color: "#DC2626" },
];

const sampleMenuJSON = {
  restaurantName: "Le Chalet",
  categories: [
    {
      name: "Entrées",
      items: [
        { name: "Salade de chèvre chaud", price: "14.50 CHF", description: "Miel, noix, pain grillé" },
        { name: "Tartare de bœuf", price: "22.00 CHF", description: "Frites maison, salade" },
      ]
    },
    {
      name: "Plats",
      items: [
        { name: "Filet de perche", price: "32.00 CHF", description: "Légumes de saison, sauce citron" },
        { name: "Bœuf bourguignon", price: "28.00 CHF", description: "Pâtes fraîches" },
      ]
    },
    {
      name: "Desserts",
      items: [
        { name: "Meringue à la crème", price: "9.50 CHF", description: "Double crème de la Gruyère" },
        { name: "Tarte au citron", price: "8.00 CHF", description: "Meringue italienne" },
      ]
    }
  ]
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("hall");
  const [period, setPeriod] = useState("today");
  const [scanCount, setScanCount] = useState(247);
  const [jsonInput, setJsonInput] = useState(JSON.stringify(sampleMenuJSON, null, 2));
  const [menuPreview, setMenuPreview] = useState(sampleMenuJSON);
  const [primaryColor, setPrimaryColor] = useState("#D97706");
  const [lang, setLang] = useState("FR");

  useEffect(() => {
    if (period !== "today") return;
    const interval = setInterval(() => {
      setScanCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [period]);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setJsonInput(val);
    try {
      const parsed = JSON.parse(val);
      setMenuPreview(parsed);
    } catch (error) {}
  };

  const getPeriodLabel = () => {
    switch(period) {
      case "today": return "Aujourd'hui (en direct)";
      case "7d": return "7 derniers jours";
      case "30d": return "30 derniers jours";
      case "all": return "Depuis le lancement";
      default: return "Aujourd'hui (en direct)";
    }
  };

  const getCantonData = () => {
    const base = { VD: 120, GE: 85, VS: 45, FR: 30, NE: 20, BE: 15 };
    if (period === "today") return base;
    if (period === "7d") return { VD: 320, GE: 210, VS: 110, FR: 70, NE: 50, BE: 40 };
    if (period === "30d") return { VD: 890, GE: 640, VS: 310, FR: 200, NE: 140, BE: 110 };
    return { VD: 2450, GE: 1800, VS: 920, FR: 580, NE: 390, BE: 280 };
  };

  const cantonData = getCantonData();

  const translations: Record<string, any> = {
    FR: { entree: "Entrées", plat: "Plats", dessert: "Desserts" },
    DE: { entree: "Vorspeisen", plat: "Hauptgerichte", dessert: "Desserts" },
    IT: { entree: "Antipasti", plat: "Secondi", dessert: "Dolci" },
    EN: { entree: "Starters", plat: "Main Courses", dessert: "Desserts" },
  };

  const t = (text: string) => {
    if (lang === "FR") return text;
    const map: Record<string, string> = {
      "Entrées": translations[lang].entree,
      "Plats": translations[lang].plat,
      "Desserts": translations[lang].dessert,
      "Salade de chèvre chaud": lang === "DE" ? "Ziegenkäsesalat" : lang === "IT" ? "Insalata di capra" : "Goat cheese salad",
      "Tartare de bœuf": lang === "DE" ? "Rindertartar" : lang === "IT" ? "Tartare di manzo" : "Beef tartare",
      "Filet de perche": lang === "DE" ? "Egli filet" : lang === "IT" ? "Filetto di persico" : "Perch fillet",
      "Bœuf bourguignon": lang === "DE" ? "Rinderschmorbraten" : lang === "IT" ? "Manzo alla borgognona" : "Burgundy beef",
      "Meringue à la crème": lang === "DE" ? "Meringue mit Rahm" : lang === "IT" ? "Meringa con panna" : "Cream meringue",
      "Tarte au citron": lang === "DE" ? "Zitronentarte" : lang === "IT" ? "Torta al limone" : "Lemon tart",
    };
    return map[text] || text;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-amber-700">CARTIS</h1>
          <p className="text-xs text-gray-500 tracking-wider mt-0.5">L'HÔTEL DES MENUS</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <button onClick={() => setActiveTab("hall")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "hall" ? "bg-amber-50 text-amber-700 border-r-4 border-amber-600" : "text-gray-600 hover:bg-gray-50"}`}>
            <LayoutDashboard size={18} /> Vue d'ensemble
          </button>
          <button onClick={() => setActiveTab("restaurants")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "restaurants" ? "bg-amber-50 text-amber-700 border-r-4 border-amber-600" : "text-gray-600 hover:bg-gray-50"}`}>
            <Store size={18} /> Mes Restaurants
          </button>
          <button onClick={() => setActiveTab("editor")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "editor" ? "bg-amber-50 text-amber-700 border-r-4 border-amber-600" : "text-gray-600 hover:bg-gray-50"}`}>
            <Edit size={18} /> Éditeur de Menu
          </button>
        </nav>
        <div className="p-4 border-t border-gray-100 text-xs text-gray-400"><p>Version 0.1.0 · Suisse</p></div>
      </aside>

      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="md:hidden bg-white p-4 border-b flex items-center justify-between">
          <h1 className="text-xl font-bold text-amber-700">CARTIS</h1>
          <button className="p-2 rounded-lg hover:bg-gray-100"><Menu size={24} className="text-gray-600" /></button>
        </header>

        <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {activeTab === "hall" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div><h2 className="text-2xl font-bold text-gray-800">Vue d'ensemble</h2><p className="text-gray-500 text-sm">Bon retour parmi vos menus. Voici l'activité du jour.</p></div>
                <div className="flex items-center gap-2"><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span><span className="text-sm font-medium text-gray-700">En direct</span></div>
              </div>
              <div className="flex flex-wrap gap-2 bg-white p-2 rounded-xl border shadow-sm">
                {["today", "7d", "30d", "all"].map((p) => (
                  <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${period === p ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                    {p === "today" && "Aujourd'hui"}{p === "7d" && "7 jours"}{p === "30d" && "30 jours"}{p === "all" && "Tout"}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"><p className="text-sm text-gray-500">Scans - {getPeriodLabel()}</p><p className="text-3xl font-bold text-amber-700">{scanCount}</p><p className="text-xs text-green-600 mt-1">↑ 12% vs période précédente</p></div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"><p className="text-sm text-gray-500">Restaurants actifs</p><p className="text-3xl font-bold text-gray-800">4</p><p className="text-xs text-gray-400 mt-1">Sur 5 inscrits</p></div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"><p className="text-sm text-gray-500">Période sélectionnée</p><div className="flex items-center gap-2 mt-1"><span className="text-sm font-medium text-gray-700">{getPeriodLabel()}</span><ChevronDown size={16} className="text-gray-400" /></div></div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-4">Scans par canton</h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {Object.entries(cantonData).map(([c, v]) => (<div key={c} className="bg-amber-50 p-3 rounded-lg text-center"><p className="text-lg font-bold text-amber-800">{v}</p><p className="text-xs font-medium text-amber-600">{c}</p></div>))}
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600"><span className="font-medium">📊 Ce que cela signifie pour vous :</span> Les cantons de Vaud et Genève concentrent le plus de scans. Les pics d'activité se situent entre 12h et 13h, puis entre 19h et 20h.</div>
              </div>
            </div>
          )}

          {activeTab === "restaurants" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div><h2 className="text-2xl font-bold text-gray-800">Mes Restaurants</h2><p className="text-gray-500 text-sm">Gérez vos établissements en un clic.</p></div>
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"><span>+</span> Ajouter un restaurant</button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 border-b"><tr><th className="px-6 py-3 font-semibold text-gray-600">Nom</th><th className="px-6 py-3 font-semibold text-gray-600">Canton</th><th className="px-6 py-3 font-semibold text-gray-600">Statut</th><th className="px-6 py-3 font-semibold text-gray-600 text-right">Actions</th></tr></thead>
                    <tbody>
                      {restaurantsData.map((r) => (
                        <tr key={r.id} className="border-b hover:bg-gray-50 transition">
                          <td className="px-6 py-4"><span className="font-medium" style={{ color: r.color }}>{r.name}</span></td>
                          <td className="px-6 py-4 text-gray-600">{r.canton}</td>
                          <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${r.status === "Actif" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{r.status}</span></td>
                          <td className="px-6 py-4 text-right"><button className="text-amber-600 hover:text-amber-800 font-medium flex items-center justify-end gap-1 ml-auto"><Eye size={16} /> Voir le menu</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-xs text-gray-400 italic">Activez ou mettez en pause votre menu en un clic. Partagez le QR avec vos équipes.</p>
            </div>
          )}

          {activeTab === "editor" && (
            <div className="space-y-6">
              <div><h2 className="text-2xl font-bold text-gray-800">Éditeur de Menu</h2><p className="text-gray-500 text-sm">Collez le JSON de votre menu et prévisualisez-le en direct.</p></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div><label className="text-sm font-medium text-gray-700">Données JSON</label><textarea className="w-full h-[400px] p-4 bg-gray-50 border border-gray-300 rounded-xl font-mono text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" value={jsonInput} onChange={handleJsonChange} spellCheck={false} /><p className="text-xs text-gray-400 mt-1">Collez ici le JSON extrait par l'IA. Chaque catégorie contient une liste de plats avec nom, prix et description.</p></div>
                  <div className="flex items-center gap-4"><label className="text-sm font-medium text-gray-700">Couleur principale</label><input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer" /><span className="text-xs text-gray-400">Change la couleur du thème du menu</span></div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center"><label className="text-sm font-medium text-gray-700">Aperçu en direct</label><div className="flex gap-1">{["FR","DE","IT","EN"].map((l) => (<button key={l} onClick={() => setLang(l)} className={`px-2 py-0.5 rounded text-xs font-medium border transition ${lang === l ? "bg-amber-100 text-amber-800 border-amber-300" : "bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200"}`}>{l}</button>))}</div></div>
                  <div className="border border-gray-200 rounded-xl bg-white p-6 h-[450px] overflow-y-auto shadow-inner" style={{ borderColor: primaryColor }}>
                    {menuPreview && menuPreview.restaurantName ? (
                      <div>
                        <h3 className="text-2xl font-bold border-b pb-2 mb-4" style={{ color: primaryColor, borderColor: primaryColor }}>{menuPreview.restaurantName}</h3>
                        {menuPreview.categories.map((cat, idx) => (
                          <div key={idx} className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-700 border-l-4 pl-3 mb-2" style={{ borderColor: primaryColor }}>{t(cat.name)}</h4>
                            {cat.items.map((item, i) => (
                              <div key={i} className="flex justify-between items-start py-1.5 border-b border-dashed border-gray-100">
                                <div><p className="font-medium text-gray-800">{t(item.name)}</p>{item.description && <p className="text-xs text-gray-400">{t(item.description)}</p>}</div>
                                <span className="text-sm font-semibold text-amber-700 whitespace-nowrap ml-4">{item.price}</span>
                              </div>
                            ))}
                          </div>
                        ))}
                        <div className="mt-4 text-center text-xs text-gray-400 border-t pt-2">🥄 Service à table · Menu digital CARTIS</div>
                      </div>
                    ) : (
                      <div className="text-gray-400 flex items-center justify-center h-full text-center"><div><p className="font-medium">Aperçu non disponible</p><p className="text-sm">Vérifiez le format de votre JSON</p></div></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
