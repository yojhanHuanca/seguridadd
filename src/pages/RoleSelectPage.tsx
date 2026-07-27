import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight, ShieldCheck, ClipboardList, Train, ChevronRight, Rocket,
  ScanLine, Eye, Search, Lock, Building2, Users, FileSearch,
  CheckCircle2, Smartphone, QrCode, MapPin, Zap,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { Logo } from "@/design-system/brand/Logo";
import { cn } from "@/lib/utils";

export function RoleSelectPage() {
  const navigate = useNavigate();
  const { setRole } = useStore();
  const [showAdminModal, setShowAdminModal] = useState(false);

  const enter = (role: "reportante" | "seguridad" | "jefe") => {
    setRole(role);
    navigate(role === "reportante" ? "/reportante" : role === "jefe" ? "/jefe" : "/seguridad");
  };

  return (
    <div className="min-h-screen bg-surface relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-mesh opacity-90" />
      <svg className="absolute -bottom-32 -right-32 opacity-[0.07]" width="640" height="640" viewBox="0 0 640 640" fill="none" aria-hidden>
        <circle cx="320" cy="320" r="300" stroke="#0F6B3E" strokeWidth="1.5" />
        <circle cx="320" cy="320" r="230" stroke="#0F6B3E" strokeWidth="1.5" />
        <circle cx="320" cy="320" r="160" stroke="#0F6B3E" strokeWidth="1.5" />
        <circle cx="320" cy="320" r="90" stroke="#0F6B3E" strokeWidth="1.5" />
      </svg>

      <div className="relative max-w-[1280px] mx-auto px-6 py-10">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Logo size={40} />
          <div className="hidden sm:flex items-center gap-2 text-[12px] text-ink-quiet">
            <span className="h-2 w-2 rounded-full bg-brand-500 animate-[pulseSoft_2s_ease-in-out_infinite]" />
            <span>Plataforma operativa · Prototipo de demostración</span>
          </div>
        </div>

        {/* Hero + QR */}
        <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-line text-[11.5px] font-medium text-brand-800 shadow-sm">
              <Train className="h-3.5 w-3.5" />
              Línea 1 · Metro de Lima
            </div>
            <h1 className="mt-5 text-[42px] sm:text-[54px] font-bold tracking-tight leading-[1.02] font-display text-balance">
              Sistema de Gestión de
              <br />
              <span className="text-brand-700">Seguridad Operativa</span>
            </h1>
            <p className="mt-5 text-[15.5px] text-ink-soft max-w-2xl leading-relaxed">
              Una plataforma única que centraliza todo el ciclo de vida de los casos de
              seguridad operativa — desde el reporte del trabajador hasta el cierre por
              el área de Seguridad Operativa.
            </p>

            {/* Quick stats */}
            <div className="mt-7 flex flex-wrap gap-3">
              <StatPill icon={<CheckCircle2 className="h-4 w-4" />} value="26" label="Estaciones" />
              <StatPill icon={<Train className="h-4 w-4" />} value="44" label="Trenes" />
              <StatPill icon={<Zap className="h-4 w-4" />} value="34 km" label="Recorrido" />
              <StatPill icon={<Users className="h-4 w-4" />} value="6" label="Perfiles" />
            </div>
          </div>

          {/* QR Card */}
          <div className="rounded-2xl bg-white border border-line shadow-[var(--shadow-card)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-brand-50 text-brand-700 grid place-items-center">
                <ScanLine className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-ink">Acceso rápido por QR</p>
                <p className="text-[11px] text-ink-quiet">Escanee con su celular</p>
              </div>
            </div>
            {/* QR visual (SVG) */}
            <div className="relative bg-white border-2 border-line rounded-xl p-4 grid place-items-center">
              <QRPattern />
              <div className="absolute inset-0 grid place-items-center pointer-events-none">
                <div className="h-12 w-12 rounded-xl bg-white border-2 border-brand-600 grid place-items-center shadow-sm">
                  <Train className="h-6 w-6 text-brand-700" />
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-[12px] text-ink-soft">
                <Smartphone className="h-4 w-4 text-brand-600 shrink-0" />
                <span>Abra la cámara de su celular</span>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-ink-soft">
                <QrCode className="h-4 w-4 text-brand-600 shrink-0" />
                <span>Apunte al código QR</span>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-ink-soft">
                <ArrowRight className="h-4 w-4 text-brand-600 shrink-0" />
                <span>Registre su incidencia en 1 minuto</span>
              </div>
            </div>
            <button
              onClick={() => enter("reportante")}
              className="mt-4 w-full h-11 rounded-xl bg-brand-700 text-white text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-brand-800 transition-colors"
            >
              <ClipboardList className="h-4.5 w-4.5" />
              Reportar incidencia
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Profiles section */}
        <div className="mt-12">
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <h2 className="text-[22px] font-bold text-ink tracking-tight">Seleccione su perfil</h2>
              <p className="text-[13px] text-ink-quiet mt-1">Cada perfil tiene funciones específicas según el rol en la organización</p>
            </div>
          </div>

          {/* Operational profiles */}
          <div className="grid md:grid-cols-3 gap-5">
            <RoleCard
              tone="reportante"
              icon={<ClipboardList className="h-6 w-6" />}
              label="Portal del Trabajador"
              title="Reportante"
              area="Todos los trabajadores"
              description="Registre una incidencia nueva, consulte sus reportes y el estado de cada caso."
              bullets={["Wizard paso a paso", "Código automático SOP", "Reporte anónimo o identificado"]}
              cta="Ingresar como Reportante"
              onClick={() => enter("reportante")}
            />
            <RoleCard
              tone="seguridad"
              icon={<ShieldCheck className="h-6 w-6" />}
              label="Centro de Control"
              title="Seguridad Operativa"
              area="Área de Seguridad Operativa"
              description="Monitoree el dashboard, gestione expedientes, derive casos y controle el cierre."
              bullets={["Dashboard ejecutivo", "Mapa de incidencias", "Workflow completo de 7 etapas"]}
              cta="Ingresar como Seguridad Operativa"
              onClick={() => enter("seguridad")}
              featured
            />
            <RoleCard
              tone="jefe"
              icon={<Rocket className="h-6 w-6" />}
              label="Ejecución de Plan"
              title="Jefe del Área"
              area="Mantenimiento, Operaciones, MR, Infraestructura..."
              description="Ejecute el Plan de Acción asignado, registre avances y envíe a verificación."
              bullets={["Plan de Acción asignado", "Registro de avances y evidencias", "Solicitar prórrogas"]}
              cta="Ingresar como Jefe del Área"
              onClick={() => enter("jefe")}
            />
          </div>

          {/* Secondary profiles */}
          <div className="mt-5 grid md:grid-cols-3 gap-5">
            <RoleCard
              tone="auditor"
              icon={<FileSearch className="h-6 w-6" />}
              label="Revisión y Trazabilidad"
              title="Auditor"
              area="SSOMA / Auditoría interna"
              description="Revise el cumplimiento de los procesos, trazabilidad y exporte reportes."
              bullets={["Solo lectura", "Trazabilidad completa", "Exportación de reportes"]}
              cta="Ingresar como Auditor"
              onClick={() => enter("seguridad")}
              compact
            />
            <RoleCard
              tone="consulta"
              icon={<Eye className="h-6 w-6" />}
              label="Acceso básico"
              title="Consulta"
              area="Personal autorizado"
              description="Consulte expedientes y reportes generales del sistema (solo lectura)."
              bullets={["Consulta de expedientes", "Estado de casos", "Estadísticas generales"]}
              cta="Ingresar como Consulta"
              onClick={() => enter("seguridad")}
              compact
            />
            <RoleCard
              tone="admin"
              icon={<Lock className="h-6 w-6" />}
              label="Zona Restringida"
              title="Centro de Administración"
              area="Seguridad Operativa — Autorizado"
              description="Gestión de usuarios, roles, áreas, estaciones, catálogos y configuración."
              bullets={["Código maestro de acceso", "Gestión completa del sistema", "Bitácora de auditoría"]}
              cta="Acceder al Centro"
              onClick={() => setShowAdminModal(true)}
              compact
              restricted
            />
          </div>
        </div>

        {/* Areas covered */}
        <div className="mt-12 rounded-2xl bg-white border border-line p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="h-9 w-9 rounded-lg bg-brand-50 text-brand-700 grid place-items-center">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[15px] font-bold text-ink">Áreas operativas de Línea 1</p>
              <p className="text-[12px] text-ink-quiet">Perfiles disponibles para cada área de la organización</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {[
              { name: "Mantenimiento", icon: "🔧" },
              { name: "Operaciones", icon: "🚇" },
              { name: "Material Rodante", icon: "🚃" },
              { name: "Infraestructura", icon: "🏗️" },
              { name: "Seguridad Operativa", icon: "🛡️" },
              { name: "SSOMA", icon: "📋" },
              { name: "Comunicaciones", icon: "📡" },
              { name: "Subestaciones", icon: "⚡" },
              { name: "Limpieza", icon: "🧹" },
              { name: "Seguridad Física", icon: "👮" },
            ].map((a) => (
              <div key={a.name} className="flex items-center gap-2 rounded-lg border border-line-soft px-3 py-2.5 hover:border-brand-300 hover:bg-brand-50/40 transition-colors">
                <span className="text-[16px]">{a.icon}</span>
                <span className="text-[12px] font-medium text-ink-soft truncate">{a.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick demo note */}
        <div className="mt-8 max-w-4xl rounded-xl bg-white border border-line p-4 flex items-start gap-3">
          <div className="h-8 w-8 rounded-lg bg-brand-50 text-brand-700 grid place-items-center shrink-0">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <p className="text-[12.5px] text-ink-soft leading-relaxed">
            <span className="font-semibold text-ink">Demostración interactiva.</span> Todos los
            cambios que realice se guardan automáticamente en este dispositivo. Navegue entre
            pantallas y la información persistirá sin necesidad de un backend real.
          </p>
        </div>
      </div>

      {/* Admin access modal */}
      {showAdminModal && (
        <AdminAccessModal onClose={() => setShowAdminModal(false)} />
      )}
    </div>
  );
}

/* ─── QR Pattern (SVG decorativo) ─── */
function QRPattern() {
  // Patrón QR simulado con módulos
  const modules = 21;
  const cells = [];
  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      // Esquinas de定位
      const isFinder = (r < 7 && c < 7) || (r < 7 && c >= modules - 7) || (r >= modules - 7 && c < 7);
      const isFinderInner = (r < 7 && c < 7 && r > 0 && c > 0 && r < 6 && c < 6) || (r < 7 && c >= modules - 7 && r > 0 && c < modules - 1 && r < 6 && c > modules - 7) || (r >= modules - 7 && c < 7 && r > modules - 7 && r < modules - 1 && c > 0 && c < 6);
      const isFinderCore = (r < 7 && c < 7 && r >= 2 && r <= 4 && c >= 2 && c <= 4) || (r < 7 && c >= modules - 7 && r >= 2 && r <= 4 && c >= modules - 5 && c <= modules - 3) || (r >= modules - 7 && c < 7 && r >= modules - 5 && r <= modules - 3 && c >= 2 && c <= 4);
      // Datos pseudoaleatorios
      const hash = (r * 31 + c * 17 + r * c) % 100;
      const isData = !isFinder && hash > 50;
      if (isFinder) {
        if (isFinderCore) cells.push(<rect key={`${r}-${c}`} x={c * 9} y={r * 9} width={9} height={9} fill="#0c5431" />);
        else if (!isFinderInner) cells.push(<rect key={`${r}-${c}`} x={c * 9} y={r * 9} width={9} height={9} fill="#0c5431" />);
      } else if (isData) {
        cells.push(<rect key={`${r}-${c}`} x={c * 9} y={r * 9} width={9} height={9} fill="#0c5431" />);
      }
    }
  }
  return (
    <svg width="189" height="189" viewBox="0 0 189 189" className="block">
      <rect width="189" height="189" fill="white" />
      {cells}
    </svg>
  );
}

/* ─── Stat Pill ─── */
function StatPill({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white border border-line px-3 py-1.5 shadow-sm">
      <span className="text-brand-700">{icon}</span>
      <span className="text-[13px] font-bold text-ink tabular-nums">{value}</span>
      <span className="text-[11.5px] text-ink-quiet">{label}</span>
    </div>
  );
}

/* ─── Role Card ─── */
function RoleCard({
  tone,
  icon,
  label,
  title,
  area,
  description,
  bullets,
  cta,
  onClick,
  featured,
  compact,
  restricted,
}: {
  tone: "reportante" | "seguridad" | "jefe" | "auditor" | "consulta" | "admin";
  icon: React.ReactNode;
  label: string;
  title: string;
  area: string;
  description: string;
  bullets: string[];
  cta: string;
  onClick: () => void;
  featured?: boolean;
  compact?: boolean;
  restricted?: boolean;
}) {
  const tones = {
    reportante: "bg-surface-2 text-ink-soft",
    seguridad: "bg-brand-700 text-white",
    jefe: "bg-brand-600 text-white",
    auditor: "bg-info-soft text-info-ink",
    consulta: "bg-surface-2 text-ink-soft",
    admin: "bg-critical-soft text-critical-ink",
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "group text-left rounded-2xl bg-white border p-6 transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5",
        featured ? "border-brand-200 shadow-[var(--shadow-card)] ring-1 ring-brand-100" : "border-line shadow-[var(--shadow-card)]",
        restricted && "border-critical/20"
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn("h-12 w-12 rounded-xl grid place-items-center", tones[tone])}>
          {icon}
        </div>
        <div className="text-right">
          <span className={cn("text-[10.5px] font-semibold tracking-[0.14em] uppercase block", restricted ? "text-critical" : "text-ink-faint")}>
            {label}
          </span>
          {restricted && (
            <span className="inline-flex items-center gap-1 text-[9.5px] font-semibold px-1.5 py-0.5 rounded-full bg-critical text-white mt-1">
              <Lock className="h-2.5 w-2.5" /> Restringido
            </span>
          )}
        </div>
      </div>
      <h3 className={cn("mt-5 font-bold text-ink tracking-tight", compact ? "text-[18px]" : "text-[22px]")}>{title}</h3>
      <p className="mt-1 text-[11.5px] text-ink-quiet flex items-center gap-1">
        <Building2 className="h-3 w-3" /> {area}
      </p>
      <p className="mt-3 text-[13.5px] text-ink-soft leading-relaxed">{description}</p>
      <ul className="mt-4 space-y-1.5">
        {bullets.map((b) => (
          <li key={b} className="flex items-center gap-2 text-[12.5px] text-ink-soft">
            <ChevronRight className="h-3.5 w-3.5 text-brand-600" />
            {b}
          </li>
        ))}
      </ul>
      <div
        className={cn(
          "mt-6 inline-flex items-center gap-2 text-[13px] font-semibold transition-all",
          restricted ? "text-critical" : "text-brand-700"
        )}
      >
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </button>
  );
}

/* ─── Admin Access Modal ─── */
function AdminAccessModal({ onClose }: { onClose: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { setRole } = useStore();

  const handleAccess = () => {
    if (code === "ADMIN-SIGMA-2026") {
      setError(false);
      setRole("seguridad");
      navigate("/seguridad");
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 animate-[fadeIn_0.2s_var(--ease-out)]" onClick={onClose}>
      <div className="w-[400px] max-w-[90vw] rounded-2xl bg-white shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-5">
          <div className="h-11 w-11 rounded-xl bg-critical-soft text-critical-ink grid place-items-center">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[15px] font-bold text-ink">Acceso Seguro</p>
            <p className="text-[12px] text-ink-quiet">Centro de Administración Institucional</p>
          </div>
        </div>
        <p className="text-[13px] text-ink-soft mb-4">
          Ingrese el <strong className="text-ink">Código Maestro de Administración</strong> para acceder al panel de configuración del sistema.
        </p>
        <input
          type="password"
          value={code}
          onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(false); }}
          onKeyDown={(e) => e.key === "Enter" && handleAccess()}
          placeholder="ADMIN-SIGMA-2026"
          className="w-full h-11 rounded-lg border border-line px-3 font-mono tracking-wider text-center text-[15px] focus:border-brand-600 focus:outline-none"
          autoFocus
        />
        {error && <p className="text-[12px] text-critical mt-2">Código incorrecto. Intente nuevamente.</p>}
        <div className="mt-5 flex items-center justify-end gap-2">
          <button onClick={onClose} className="h-10 px-4 rounded-lg text-[13px] font-medium text-ink-soft border border-line hover:bg-surface transition-colors">Cancelar</button>
          <button onClick={handleAccess} disabled={!code.trim()} className="h-10 px-4 rounded-lg text-[13px] font-semibold text-white bg-critical hover:bg-critical/90 transition-colors disabled:opacity-50">Ingresar</button>
        </div>
      </div>
    </div>
  );
}
