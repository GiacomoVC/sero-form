import { useState, useMemo } from "react";
import { WORLDS, SUBCATEGORIES, DATES, VENUE, PRICE, YAPE_NUMBER, WHATSAPP_NUMBER, SHEETS_URL, EMO } from "./data";
import "./styles.css";

const STEPS = ["bienvenida", "basico", "mundos", "detalle", "mesa", "edad", "fechas", "comida", "yape", "final"];

export default function App() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    nombre: "", whatsapp: "", referido: "",
    mundos: [],
    subs: {},        // worldId -> [subId]
    titulos: {},     // worldId -> [title]
    obsesion: {},    // worldId -> title (only if 2+ titles)
    otro: {},        // worldId -> string
    otroMundo: "",
    estilo: "",
    edad: "",
    masuno: "",      // "solo" | "amigo"
    nombreMasuno: "",
    fechas: [],
    comida: [],
    alergia: "",
  });

  const update = (patch) => setData((d) => ({ ...d, ...patch }));

  const toggle = (arr, val) => (arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  // worlds chosen, capped at 3
  const chosenWorlds = WORLDS.filter((w) => data.mundos.includes(w.id));
  // detail steps = one per chosen world that isn't "otro"
  const detailWorlds = chosenWorlds.filter((w) => w.id !== "otro");

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  // Build the WhatsApp message on submit
  const waMessage = useMemo(() => {
    // Build compact obsession/taste summary for the DATA line
    const obsParts = [];
    const tasteParts = [];
    chosenWorlds.forEach((w) => {
      if (w.id === "otro") {
        if (data.otroMundo) tasteParts.push(`Otro:${data.otroMundo}`);
        return;
      }
      const subs = (data.subs[w.id] || []).map((sid) => SUBCATEGORIES[w.id].find((s) => s.id === sid)?.label).filter(Boolean);
      const tits = [...(data.titulos[w.id] || [])];
      const otroT = data.otro[w.id];
      if (otroT) tits.push(`${otroT}(otro)`);
      const obs = data.obsesion[w.id];
      // obsession #1: explicit if chosen, else the single title if only one, else first sub
      const single = obs || (tits.length === 1 ? tits[0] : null);
      if (single) obsParts.push(single);
      const blk = subs.length ? `${subs.join("/")}` : "";
      const tlist = tits.length ? `[${tits.join(",")}]` : "";
      if (blk || tlist) tasteParts.push(`${w.label}:${blk}${tlist}`);
    });

    const fechasShort = data.fechas.map((f) => (f.includes("23") ? "Mar23" : f.includes("24") ? "Mie24" : f)).join("+") || "ninguna";
    const mas1 = data.masuno === "amigo" ? `+1:${data.nombreMasuno || "sí"}` : "solo";
    const estiloShort = data.estilo === "Hablo bastante" ? "habla" : data.estilo === "Escucho más" ? "escucha" : "depende";
    const com = [...data.comida];
    if (data.alergia) com.push(`alergia:${data.alergia}`);
    const comShort = com.filter((c) => c !== "Ninguna").join("/") || "ok";

    // === DATA line (goes to Sheets only, for building tables) ===
    const dataLine = `SERO|${data.nombre}|${data.whatsapp}|obs:${obsParts.join("·") || "-"}|${fechasShort}|${mas1}|${estiloShort}|edad:${data.edad}|com:${comShort}`;

    // === short, friendly WhatsApp message (what the person actually sends) ===
    const lines = [];
    lines.push(`Hola, soy ${data.nombre || ""}. Acá va la captura de mi reserva :D`);

    // structured row for Google Sheets (flat, one row per reservation)
    const tasteFull = [];
    chosenWorlds.forEach((w) => {
      if (w.id === "otro") { if (data.otroMundo) tasteFull.push(`Otro mundo: ${data.otroMundo}`); return; }
      const subs = (data.subs[w.id] || []).map((sid) => SUBCATEGORIES[w.id].find((s) => s.id === sid)?.label).filter(Boolean);
      const tits = [...(data.titulos[w.id] || [])];
      if (data.otro[w.id]) tits.push(`${data.otro[w.id]} (otro)`);
      if (subs.length || tits.length) tasteFull.push(`${w.label}: ${subs.join("/")}${tits.length ? " → " + tits.join(", ") : ""}`);
    });
    const row = {
      ts: new Date().toISOString(),
      nombre: data.nombre,
      whatsapp: data.whatsapp,
      referido: data.referido,
      obsesiones: obsParts.join(" · "),
      gustos: tasteFull.join(" | "),
      fechas: data.fechas.join(" / "),
      mas1: data.masuno === "amigo" ? (data.nombreMasuno || "sí") : "",
      estilo: data.estilo,
      edad: data.edad,
      comida: comShort === "ok" ? "" : com.join(", "),
      dataline: dataLine,
    };

    return { encoded: encodeURIComponent(lines.join("\n")), row };
  }, [data, chosenWorlds]);

  const openWhatsApp = () => {
    // fire-and-forget POST to Google Sheets (no-cors so it never blocks the flow)
    if (SHEETS_URL) {
      try {
        fetch(SHEETS_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(waMessage.row),
        });
      } catch (e) { /* never block the user */ }
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage.encoded}`, "_blank");
    goNext();
  };

  // ---- validation per step ----
  const canAdvance = () => {
    const name = STEPS[step];
    if (name === "basico") return data.nombre.trim() && data.whatsapp.trim();
    if (name === "mundos") return data.mundos.length >= 1;
    if (name === "mesa") return !!data.estilo;
    if (name === "edad") return data.edad && (data.masuno === "solo" || data.masuno === "amigo");
    if (name === "fechas") return data.fechas.length >= 1;
    return true;
  };

  return (
    <div className="wrap">
      <header className="topbar">
        <span className="wordmark">sero</span>
        {step > 0 && step < STEPS.length - 1 && <span className="steplabel">Reserva</span>}
      </header>
      <Progress step={step} total={STEPS.length} />

      {STEPS[step] === "bienvenida" && (
        <section className="screen center">
          <div className="badge">{EMO.card}</div>
          <h1>Mismos gustos.<br/>Mejores planes.</h1>
          <p className="lead">Una mesa de gente fan de lo mismo que tú. Llena esto en 2 minutos y te armamos tu plan. {EMO.sparkle}</p>
          <button className="cta" onClick={goNext}>Empezar</button>
        </section>
      )}

      {STEPS[step] === "basico" && (
        <section className="screen">
          <h2>{EMO.wave} Primero, lo básico</h2>
          <label>¿Cómo te llamas?
            <input value={data.nombre} onChange={(e) => update({ nombre: e.target.value })} placeholder="Tu nombre" />
          </label>
          <label>¿Tu WhatsApp?
            <input value={data.whatsapp} onChange={(e) => update({ whatsapp: e.target.value })} placeholder="999 999 999" inputMode="tel" />
          </label>
          <label>¿Quién te pasó el dato?
            <input value={data.referido} onChange={(e) => update({ referido: e.target.value })} placeholder="Nombre del pata (opcional)" />
          </label>
          <Nav onBack={goBack} onNext={goNext} disabled={!canAdvance()} />
        </section>
      )}

      {STEPS[step] === "mundos" && (
        <section className="screen">
          <h2>¿En qué andas metido?</h2>
          <p className="sub">Elige hasta 3 <span className="count">· {data.mundos.length}/3</span></p>
          <div className="grid">
            {WORLDS.map((w) => {
              const on = data.mundos.includes(w.id);
              const blocked = !on && data.mundos.length >= 3;
              return (
                <button key={w.id} className={`chip big ${on ? "on" : ""}`} disabled={blocked}
                  onClick={() => update({ mundos: toggle(data.mundos, w.id) })}>
                  <span className="emoji">{w.emoji}</span>{w.label}
                </button>
              );
            })}
          </div>
          <Nav onBack={goBack} onNext={goNext} disabled={!canAdvance()} />
        </section>
      )}

      {STEPS[step] === "detalle" && (
        <DetailScreens worlds={detailWorlds} data={data} update={update} toggle={toggle} onBack={goBack} onNext={goNext} />
      )}

      {STEPS[step] === "mesa" && (
        <section className="screen">
          <h2>{EMO.speak} ¿Cómo eres en una mesa con gente nueva?</h2>
          {["Hablo bastante", "Escucho más", "Depende de con quién"].map((o) => (
            <button key={o} className={`opt ${data.estilo === o ? "on" : ""}`} onClick={() => update({ estilo: o })}>{o}</button>
          ))}
          <Nav onBack={goBack} onNext={goNext} disabled={!canAdvance()} />
        </section>
      )}

      {STEPS[step] === "edad" && (
        <section className="screen">
          <h2>Tú y tu +1</h2>
          <label>¿Cuántos años tienes?
            <input value={data.edad} onChange={(e) => update({ edad: e.target.value.replace(/\D/g, "") })} placeholder="Edad" inputMode="numeric" />
          </label>
          <p className="sub">¿Vas a caer con un +1?</p>
          <button className={`opt ${data.masuno === "solo" ? "on" : ""}`} onClick={() => update({ masuno: "solo" })}>Voy solo</button>
          <button className={`opt ${data.masuno === "amigo" ? "on" : ""}`} onClick={() => update({ masuno: "amigo" })}>Voy con un amig@ {EMO.pair}</button>
          {data.masuno === "amigo" && (
            <label>¿Cómo se llama tu +1?
              <input value={data.nombreMasuno} onChange={(e) => update({ nombreMasuno: e.target.value })} placeholder="Nombre de tu +1" />
              <span className="hint">Recuérdale que aparte su lugar también.</span>
            </label>
          )}
          <Nav onBack={goBack} onNext={goNext} disabled={!data.edad || !data.masuno} />
        </section>
      )}

      {STEPS[step] === "fechas" && (
        <section className="screen">
          <h2>{EMO.cal} ¿Qué noche te queda?</h2>
          <p className="sub">Marca una o las dos.</p>
          {DATES.map((d) => (
            <button key={d} className={`opt ${data.fechas.includes(d) ? "on" : ""}`} onClick={() => update({ fechas: toggle(data.fechas, d) })}>{d}</button>
          ))}
          <Nav onBack={goBack} onNext={goNext} disabled={!canAdvance()} />
        </section>
      )}

      {STEPS[step] === "comida" && (
        <section className="screen">
          <h2>{EMO.plate} ¿Alguna restricción alimentaria?</h2>
          <div className="grid">
            {["Ninguna", "Vegetariano", "Vegano", "Sin gluten", "Sin lactosa"].map((o) => (
              <button key={o} className={`chip ${data.comida.includes(o) ? "on" : ""}`} onClick={() => update({ comida: toggle(data.comida, o) })}>{o}</button>
            ))}
          </div>
          <label>Alergias
            <input value={data.alergia} onChange={(e) => update({ alergia: e.target.value })} placeholder="Si tienes alguna, escríbela" />
          </label>
          <Nav onBack={goBack} onNext={goNext} />
        </section>
      )}

      {STEPS[step] === "yape" && (
        <section className="screen center">
          <div className="badge">{EMO.card}</div>
          <h2>Casi listo. Aparta tu lugar.</h2>
          <div className="card">
            <p>{EMO.pizza} La cena es en <strong>{VENUE}</strong>.</p>
            <p>{EMO.money} <strong>{PRICE}</strong> — incluye pizza artesanal y bebida.</p>
            <p>Apartas tu lugar con un Yape a <strong>{YAPE_NUMBER}</strong>.</p>
            <p className="hint">Al tocar el botón te abrimos WhatsApp con tus datos. Mándanoslos junto con la captura del Yape y quedas dentro. {EMO.point}</p>
            <p className="hint">Cupos limitados. Si la mesa no se llena, te devolvemos el Yape completo.</p>
          </div>
          <button className="cta" onClick={openWhatsApp}>Enviar mis datos por WhatsApp</button>
          <button className="link" onClick={goBack}>Volver</button>
        </section>
      )}

      {STEPS[step] === "final" && (
        <section className="screen center">
          <div className="badge">{EMO.card}</div>
          <h2>¡Listo!</h2>
          <p className="lead">Te confirmamos tu mesa por WhatsApp. Prepárate para caer a tu plan. {EMO.hands}</p>
        </section>
      )}
    </div>
  );
}

function DetailScreens({ worlds, data, update, toggle, onBack, onNext }) {
  // internal index across detail worlds
  const [i, setI] = useState(0);
  if (worlds.length === 0) { onNext(); return null; }
  const w = worlds[i];
  const subs = SUBCATEGORIES[w.id];
  const chosenSubs = data.subs[w.id] || [];
  const visibleTitles = subs.filter((s) => chosenSubs.includes(s.id)).flatMap((s) => s.titles);
  const uniqTitles = [...new Set(visibleTitles)];
  const chosenTitles = data.titulos[w.id] || [];
  const otroVal = data.otro[w.id] || "";
  // obsession dropdown options = chosen titles + otro (if filled)
  const obsOptions = [...chosenTitles];
  if (otroVal.trim()) obsOptions.push(otroVal.trim());
  const showObsesion = obsOptions.length >= 2;

  const setSubs = (sid) => update({ subs: { ...data.subs, [w.id]: toggle(chosenSubs, sid) } });
  const setTitle = (t) => update({ titulos: { ...data.titulos, [w.id]: toggle(chosenTitles, t) } });
  const setOtro = (v) => update({ otro: { ...data.otro, [w.id]: v } });
  const setObs = (v) => update({ obsesion: { ...data.obsesion, [w.id]: v } });

  const next = () => { if (i < worlds.length - 1) setI(i + 1); else onNext(); };
  const back = () => { if (i > 0) setI(i - 1); else onBack(); };

  return (
    <section className="screen" key={w.id}>
      <h2>{w.emoji} {w.label}</h2>
      <p className="sub">¿Qué te tiene enganchado? Marca todo lo que aplique.</p>
      <div className="grid">
        {subs.map((s) => (
          <button key={s.id} className={`chip ${chosenSubs.includes(s.id) ? "on" : ""}`} onClick={() => setSubs(s.id)}>{s.label}</button>
        ))}
      </div>

      {uniqTitles.length > 0 && (
        <>
          <p className="sub mt">Si armáramos una cena de esto, ¿a cuál caerías?</p>
          <div className="grid">
            {uniqTitles.map((t) => (
              <button key={t} className={`chip ${chosenTitles.includes(t) ? "on" : ""}`} onClick={() => setTitle(t)}>{t}</button>
            ))}
          </div>
        </>
      )}

      <label className="mt">Otro
        <input value={otroVal} onChange={(e) => setOtro(e.target.value)} placeholder="¿Algo que no está en la lista? Escríbelo" />
      </label>

      {showObsesion && (
        <label className="mt">{EMO.fire} De todo lo que marcaste, ¿cuál es tu obsesión #1 ahorita?
          <select value={data.obsesion[w.id] || ""} onChange={(e) => setObs(e.target.value)}>
            <option value="">Elige una</option>
            {obsOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
      )}

      <div className="navrow">
        <button className="link" onClick={back}>Volver</button>
        <span className="counter">{i + 1} / {worlds.length}</span>
        <button className="cta small" onClick={next}>{i < worlds.length - 1 ? "Siguiente mundo" : "Continuar"}</button>
      </div>
    </section>
  );
}

function Nav({ onBack, onNext, disabled }) {
  return (
    <div className="navrow">
      <button className="link" onClick={onBack}>Volver</button>
      <button className="cta small" onClick={onNext} disabled={disabled}>Continuar</button>
    </div>
  );
}

function Progress({ step, total }) {
  const pct = Math.round((step / (total - 1)) * 100);
  return <div className="progress"><div className="bar" style={{ width: `${pct}%` }} /></div>;
}
