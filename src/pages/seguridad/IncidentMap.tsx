import { useState, useMemo } from "react";
import {
  MapPin, Train, AlertOctagon, CheckCircle2, TrendingUp, X,
  Activity, Clock, Building2, Shield, Filter, ChevronRight,
  CircleDot, Zap, Radio,
} from "lucide-react";
import { STATIONS, AREA_LABELS, type Area } from "@/lib/types";
import { cn, relativeTime } from "@/lib/utils";
import { Card } from "@/design-system/primitives/Card";
import { Pill } from "@/design-system/primitives/Pill";

type RiskLevel = "bajo" | "medio" | "alto" | "critico";

interface StationData {
  name: string;
  x: number;
  y: number;
  total: number;
  abiertos: number;
  cerrados: number;
  riesgo: RiskLevel;
  ultimaIncidencia: string;
  area: Area;
  ultimoTipo: string;
}

const RISK_CONFIG: Record<RiskLevel, { color: string; glow: string; label: string; bg: string; text: string; ring: string }> = {
  bajo: { color: "#22c55e", glow: "#22c55e40", label: "Bajo", bg: "bg-green-50", text: "text-green-700", ring: "ring-green-200" },
  medio: { color: "#eab308", glow: "#eab30840", label: "Medio", bg: "bg-yellow-50", text: "text-yellow-700", ring: "ring-yellow-200" },
  alto: { color: "#f97316", glow: "#f9731640", label: "Alto", bg: "bg-orange-50", text: "text-orange-700", ring: "ring-orange-200" },
  critico: { color: "#ef4444", glow: "#ef444440", label: "Crítico", bg: "bg-red-50", text: "text-red-700", ring: "ring-red-200" },
};

const STATION_COORDS: { name: string; x: number; y: number }[] = [
  { name: "San Juan", x: 90, y: 430 },
  { name: "Atocongo", x: 130, y: 390 },
  { name: "Pamplona", x: 170, y: 350 },
  { name: "Matellini", x: 210, y: 315 },
  { name: "Puno", x: 245, y: 285 },
  { name: "Parque Industrial", x: 280, y: 258 },
  { name: "Pueblo Libre", x: 315, y: 232 },
  { name: "Oscar R. Benavides", x: 355, y: 208 },
  { name: "Cabitos", x: 400, y: 185 },
  { name: "Ayacucho", x: 445, y: 165 },
  { name: "Javier Prado", x: 495, y: 145 },
  { name: "El Ángel", x: 545, y: 128 },
  { name: "Gamarra", x: 590, y: 116 },
  { name: "Caja de Agua", x: 635, y: 108 },
  { name: "Pirámide del Sol", x: 680, y: 102 },
  { name: "Estación Central", x: 725, y: 98 },
];

const MOCK_STATIONS: StationData[] = STATION_COORDS.map((s, i) => {
  const riesgo: RiskLevel =
    i === 0 || i === 3 ? "critico" :
    i === 8 || i === 11 || i === 14 ? "alto" :
    i === 1 || i === 4 || i === 7 || i === 10 ? "medio" :
    "bajo";
  const total = riesgo === "critico" ? 12 + i % 5 : riesgo === "alto" ? 7 + i % 3 : riesgo === "medio" ? 4 + i % 2 : 1 + i % 2;
  const abiertos = riesgo === "critico" ? 5 + i % 3 : riesgo === "alto" ? 3 : riesgo === "medio" ? 2 : 0;
  const cerrados = total - abiertos;
  const areas: Area[] = ["mantenimiento", "operaciones", "material_rodante", "infraestructura", "seguridad_fisica", "comunicaciones"];
  const tipos = ["Condición Insegura", "Falla Técnica", "Accidente Laboral", "Incidente Operativo"];
  return {
    ...s,
    total,
    abiertos,
    cerrados,
    riesgo,
    ultimaIncidencia: new Date(Date.now() - (i + 1) * 3600000 * (i % 6 + 1)).toISOString(),
    area: areas[i % areas.length],
    ultimoTipo: tipos[i % tipos.length],
  };
});

const MAP_W = 800;
const MAP_H = 480;

export function IncidentMap() {
  const [selected, setSelected] = useState<StationData | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const kpis = useMemo(() => {
    const activas = MOCK_STATIONS.reduce((s, st) => s + st.abiertos, 0);
    const criticos = MOCK_STATIONS.filter((s) => s.riesgo === "critico" && s.abiertos > 0).length;
    const cerradasHoy = MOCK_STATIONS.reduce((s, st) => s + st.cerrados, 0);
    const topStation = [...MOCK_STATIONS].sort((a, b) => b.total - a.total)[0];
    return { activas, criticos, cerradasHoy, topStation };
  }, []);

  const linePath = useMemo(() => {
    const pts = STATION_COORDS;
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cx = (prev.x + curr.x) / 2;
      const cy = (prev.y + curr.y) / 2;
      d += ` Q ${prev.x} ${prev.y} ${cx} ${cy}`;
    }
    d += ` T ${pts[pts.length - 1].x} ${pts[pts.length - 1].y}`;
    return d;
  }, []);

  return (
    <div className="space-y-4">
      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MapKpi icon={<Activity className="h-4.5 w-4.5" />} label="Incidencias Activas" value={kpis.activas} tone="info" sub="En tiempo real" />
        <MapKpi icon={<AlertOctagon className="h-4.5 w-4.5" />} label="Casos Críticos" value={kpis.criticos} tone="critical" sub="Requieren acción" />
        <MapKpi icon={<CheckCircle2 className="h-4.5 w-4.5" />} label="Cerrados Hoy" value={kpis.cerradasHoy} tone="brand" sub="Resueltas" />
        <MapKpi icon={<TrendingUp className="h-4.5 w-4.5" />} label="Estación Crítica" value={kpis.topStation.name} tone="warning" sub={`${kpis.topStation.total} incidencias`} isText />
      </div>

      {/* Filters bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-[11.5px] font-semibold text-ink-quiet mr-1">
          <Filter className="h-3.5 w-3.5" /> Filtros:
        </div>
        <FilterGroup label="Estado" options={["Todos", "Abiertos", "Cerrados"]} />
        <FilterGroup label="Tipo" options={["Todos", "Accidente", "Falla", "Condición"]} />
        <FilterGroup label="Riesgo" options={["Todos", "Bajo", "Medio", "Alto", "Crítico"]} />
        <FilterGroup label="Estación" options={["Todas", ...STATIONS.slice(0, 4)]} />
      </div>

      {/* Map + side panel */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-4">
        {/* Map */}
        <Card padded={false} className="overflow-hidden">
          <div className="relative bg-[#0a1929]">
            {/* Map header */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-[#0a1929]/95 to-transparent">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-brand-600/20 border border-brand-500/30 grid place-items-center">
                  <Radio className="h-4 w-4 text-brand-400" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white tracking-tight">Centro de Monitoreo · Línea 1</p>
                  <p className="text-[10.5px] text-slate-400">Seguridad Operativa · Tiempo real</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10.5px] font-medium text-slate-300">EN LÍNEA</span>
              </div>
            </div>

            {/* SVG Map */}
            <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="w-full h-auto block" style={{ minHeight: 380 }}>
              <defs>
                <linearGradient id="lineGradL1" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#14814a" />
                  <stop offset="50%" stopColor="#1f9d52" />
                  <stop offset="100%" stopColor="#38a860" />
                </linearGradient>
                <radialGradient id="critGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </radialGradient>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e3a5f" strokeWidth="0.5" opacity="0.3" />
                </pattern>
                <filter id="markerShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
                </filter>
              </defs>

              {/* Grid background */}
              <rect width={MAP_W} height={MAP_H} fill="url(#grid)" />

              {/* Geographic context — Rímac river approximation */}
              <path d="M 0 220 Q 200 240 400 200 T 800 180" stroke="#1e3a5f" strokeWidth="14" fill="none" opacity="0.25" strokeLinecap="round" />
              <path d="M 0 220 Q 200 240 400 200 T 800 180" stroke="#2a5a8a" strokeWidth="1" fill="none" opacity="0.15" strokeDasharray="6 4" />

              {/* District labels */}
              <text x="70" y="465" fontSize="9" fill="#3a5a7a" fontWeight="600" letterSpacing="1">VILLA EL SALVADOR</text>
              <text x="330" y="270" fontSize="9" fill="#3a5a7a" fontWeight="600" letterSpacing="1">SURCO · SAN BORJA</text>
              <text x="560" y="80" fontSize="9" fill="#3a5a7a" fontWeight="600" letterSpacing="1">S.J. DE LURIGANCHO</text>

              {/* Line path — glowing track */}
              <path d={linePath} stroke="#14814a" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.15" />
              <path d={linePath} stroke="url(#lineGradL1)" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d={linePath} stroke="#fff" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.2" strokeDasharray="3 6" className="track-dash" />

              {/* Station markers */}
              {MOCK_STATIONS.map((s) => {
                const risk = RISK_CONFIG[s.riesgo];
                const isHovered = hovered === s.name;
                const isSelected = selected?.name === s.name;
                const hasActive = s.abiertos > 0;
                const r = hasActive ? 7 + Math.min(s.abiertos, 5) : 5;
                return (
                  <g
                    key={s.name}
                    onClick={() => setSelected(s)}
                    onMouseEnter={() => setHovered(s.name)}
                    onMouseLeave={() => setHovered(null)}
                    className="cursor-pointer"
                  >
                    {/* Pulse for critical active */}
                    {s.riesgo === "critico" && hasActive && (
                      <circle cx={s.x} cy={s.y} r={r + 6} fill={risk.color} opacity="0.15">
                        <animate attributeName="r" values={`${r + 4};${r + 12};${r + 4}`} dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.25;0.05;0.25" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}
                    {/* Glow */}
                    <circle cx={s.x} cy={s.y} r={r + 4} fill={risk.color} opacity="0.12" />
                    {/* Station marker */}
                    <circle
                      cx={s.x}
                      cy={s.y}
                      r={r}
                      fill={hasActive ? risk.color : "#0a1929"}
                      stroke={risk.color}
                      strokeWidth="2.5"
                      filter="url(#markerShadow)"
                      className="transition-all duration-200"
                      style={{
                        transform: isHovered || isSelected ? `scale(1.25)` : undefined,
                        transformOrigin: `${s.x}px ${s.y}px`,
                      }}
                    />
                    {/* Inner dot */}
                    <circle cx={s.x} cy={s.y} r={2} fill="#fff" opacity={hasActive ? 0.9 : 0.5} />
                    {/* Count badge */}
                    {hasActive && (
                      <g>
                        <rect x={s.x + r + 2} y={s.y - 8} width={20} height={16} rx={4} fill={risk.color} opacity="0.95" />
                        <text x={s.x + r + 12} y={s.y + 3} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff">{s.abiertos}</text>
                      </g>
                    )}
                    {/* Label on hover/selected */}
                    {(isHovered || isSelected) && (
                      <g style={{ pointerEvents: "none" }}>
                        <rect
                          x={s.x - s.name.length * 3.2 - 6}
                          y={s.y - r - 22}
                          width={s.name.length * 6.4 + 12}
                          height={16}
                          rx={4}
                          fill="#0a1929"
                          stroke={risk.color}
                          strokeWidth="0.5"
                          opacity="0.95"
                        />
                        <text x={s.x} y={s.y - r - 11} textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">{s.name}</text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="flex items-center gap-4 px-4 py-3 bg-[#0a1929] border-t border-[#1e3a5f]">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Nivel de Riesgo</span>
              {(Object.keys(RISK_CONFIG) as RiskLevel[]).map((k) => (
                <div key={k} className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: RISK_CONFIG[k].color }} />
                  <span className="text-[11px] text-slate-300">{RISK_CONFIG[k].label}</span>
                </div>
              ))}
              <div className="ml-auto flex items-center gap-1.5">
                <Train className="h-3.5 w-3.5 text-brand-400" />
                <span className="text-[11px] text-slate-400">Línea 1 · {STATIONS.length} estaciones</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Side panel — station detail */}
        {selected ? (
          <StationPanel station={selected} onClose={() => setSelected(null)} />
        ) : (
          <Card className="flex flex-col items-center justify-center p-8 text-center min-h-[380px]">
            <div className="h-14 w-14 rounded-2xl bg-brand-50 text-brand-700 grid place-items-center mb-4">
              <MapPin className="h-7 w-7" />
            </div>
            <p className="text-[14px] font-bold text-ink">Seleccione una estación</p>
            <p className="text-[12.5px] text-ink-quiet mt-1.5 max-w-[220px]">
              Haga clic en cualquier marcador del mapa para ver el detalle de incidencias de la estación.
            </p>
            <div className="mt-6 w-full space-y-2">
              <div className="flex items-center justify-between text-[11.5px] px-3 py-2 rounded-lg bg-surface">
                <span className="text-ink-quiet flex items-center gap-1.5"><CircleDot className="h-3.5 w-3.5" /> Estaciones monitoreadas</span>
                <span className="font-bold text-ink tabular-nums">{STATIONS.length}</span>
              </div>
              <div className="flex items-center justify-between text-[11.5px] px-3 py-2 rounded-lg bg-surface">
                <span className="text-ink-quiet flex items-center gap-1.5"><AlertOctagon className="h-3.5 w-3.5" /> Con incidencias activas</span>
                <span className="font-bold text-critical tabular-nums">{MOCK_STATIONS.filter(s => s.abiertos > 0).length}</span>
              </div>
              <div className="flex items-center justify-between text-[11.5px] px-3 py-2 rounded-lg bg-surface">
                <span className="text-ink-quiet flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> Bajo control</span>
                <span className="font-bold text-brand-700 tabular-nums">{MOCK_STATIONS.filter(s => s.riesgo === "bajo").length}</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

/* ─── Station Side Panel ─── */
function StationPanel({ station, onClose }: { station: StationData; onClose: () => void }) {
  const risk = RISK_CONFIG[station.riesgo];
  return (
    <Card padded={false} className="overflow-hidden animate-[fadeIn_0.2s_var(--ease-out)]">
      {/* Header */}
      <div className={cn("relative px-5 py-4", risk.bg)}>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 h-7 w-7 rounded-lg grid place-items-center text-ink-quiet hover:bg-white/60 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-3">
          <div className={cn("h-11 w-11 rounded-xl grid place-items-center shrink-0", risk.bg, risk.text, "ring-2", risk.ring)}>
            <Train className="h-5.5 w-5.5" />
          </div>
          <div className="min-w-0">
            <p className="text-[15px] font-bold text-ink tracking-tight">{station.name}</p>
            <p className="text-[11.5px] text-ink-quiet mt-0.5">Estación · Línea 1 Metro de Lima</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold", risk.bg, risk.text, "border-current/20")}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: risk.color }} />
            Riesgo {risk.label}
          </span>
          <Pill tone="neutral">Área {AREA_LABELS[station.area]}</Pill>
        </div>
      </div>

      {/* Stats grid */}
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-3 gap-2.5">
          <StatBox label="Total" value={station.total} icon={<Activity className="h-3.5 w-3.5" />} />
          <StatBox label="Abiertos" value={station.abiertos} icon={<AlertOctagon className="h-3.5 w-3.5" />} tone="critical" />
          <StatBox label="Cerrados" value={station.cerrados} icon={<CheckCircle2 className="h-3.5 w-3.5" />} tone="brand" />
        </div>

        {/* Risk bar */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-ink-quiet uppercase tracking-wider">Nivel de Riesgo</span>
            <span className={cn("text-[11px] font-bold", risk.text)}>{risk.label}</span>
          </div>
          <div className="h-2 rounded-full bg-surface-2 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${station.riesgo === "critico" ? 95 : station.riesgo === "alto" ? 70 : station.riesgo === "medio" ? 45 : 15}%`,
                background: risk.color,
              }}
            />
          </div>
        </div>

        {/* Last incident */}
        <div className="rounded-xl border border-line-soft p-3.5 space-y-2.5">
          <p className="text-[11px] font-semibold text-ink-quiet uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-warning" /> Última Incidencia Registrada
          </p>
          <div className="space-y-2">
            <InfoRow icon={<CircleDot className="h-3.5 w-3.5" />} label="Tipo" value={station.ultimoTipo} />
            <InfoRow icon={<Clock className="h-3.5 w-3.5" />} label="Fecha" value={relativeTime(station.ultimaIncidencia)} />
            <InfoRow icon={<Building2 className="h-3.5 w-3.5" />} label="Área responsable" value={AREA_LABELS[station.area]} />
          </div>
        </div>

        {/* Action button */}
        <button className="w-full h-10 rounded-xl bg-brand-700 text-white text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-brand-800 transition-colors">
          Ver expedientes de la estación
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
}

/* ─── Sub-components ─── */
function MapKpi({ icon, label, value, tone, sub, isText }: {
  icon: React.ReactNode; label: string; value: number | string; tone: "info" | "critical" | "brand" | "warning"; sub: string; isText?: boolean;
}) {
  const tones = {
    info: "bg-info-soft text-info-ink",
    critical: "bg-critical-soft text-critical-ink",
    brand: "bg-brand-50 text-brand-700",
    warning: "bg-warning-soft text-warning-ink",
  };
  return (
    <Card className="p-4 flex items-center gap-3.5">
      <div className={cn("h-11 w-11 rounded-xl grid place-items-center shrink-0", tones[tone])}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10.5px] font-semibold text-ink-quiet uppercase tracking-wider">{label}</p>
        <p className={cn("font-bold text-ink leading-tight truncate", isText ? "text-[14px]" : "text-[22px] tabular-nums")}>{value}</p>
        <p className="text-[10.5px] text-ink-faint mt-0.5">{sub}</p>
      </div>
    </Card>
  );
}

function FilterGroup({ label, options }: { label: string; options: string[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-white border border-line">
      <span className="px-2 text-[10.5px] font-semibold text-ink-faint uppercase tracking-wide">{label}</span>
      {options.map((opt, i) => (
        <button
          key={opt}
          onClick={() => setActive(i)}
          className={cn(
            "h-7 px-2.5 rounded-md text-[11.5px] font-medium transition-colors whitespace-nowrap",
            active === i ? "bg-brand-700 text-white" : "text-ink-soft hover:bg-surface"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function StatBox({ label, value, icon, tone }: { label: string; value: number; icon: React.ReactNode; tone?: "critical" | "brand" }) {
  const tones = {
    critical: "text-critical",
    brand: "text-brand-700",
  };
  return (
    <div className="rounded-xl border border-line-soft p-3 text-center">
      <div className={cn("flex items-center justify-center gap-1 text-ink-faint mb-1", tone && tones[tone])}>
        {icon}
      </div>
      <p className={cn("text-[20px] font-bold tabular-nums leading-none", tone ? tones[tone] : "text-ink")}>{value}</p>
      <p className="text-[10.5px] text-ink-quiet mt-1">{label}</p>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-[12px]">
      <span className="text-ink-faint shrink-0">{icon}</span>
      <span className="text-ink-quiet">{label}:</span>
      <span className="text-ink font-medium truncate">{value}</span>
    </div>
  );
}
