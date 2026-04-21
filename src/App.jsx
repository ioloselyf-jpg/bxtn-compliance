import { useState, useEffect, useCallback, useRef } from "react"
import { supabase } from "./supabase.js"
import { COMPLIANCE_DATA } from "./data.js"

const PRIORITY_CONFIG = {
  critical: { label: "CRITICAL", color: "#E83B2F", bg: "rgba(232,59,47,0.12)", border: "#E83B2F" },
  important: { label: "IMPORTANT", color: "#FFD700", bg: "rgba(255,215,0,0.08)", border: "#FFD700" },
  standard: { label: "STANDARD", color: "#555", bg: "rgba(255,255,255,0.03)", border: "#333" },
}

export default function App() {
  const [activeTab, setActiveTab] = useState("food")
  const [openSections, setOpenSections] = useState({})
  const [checked, setChecked] = useState({})
  const [status, setStatus] = useState("connecting")
  const [lastUpdated, setLastUpdated] = useState(null)
  const channelRef = useRef(null)

  useEffect(() => {
    async function load() {
      try {
        const { data, error } = await supabase
          .from("compliance_checks")
          .select("item_id, is_checked, updated_at")
        if (error) throw error
        const map = {}
        let latest = null
        data.forEach(row => {
          map[row.item_id] = row.is_checked
          if (!latest || row.updated_at > latest) latest = row.updated_at
        })
        setChecked(map)
        if (latest) setLastUpdated(latest)
        setStatus("live")
      } catch (e) {
        console.error(e)
        setStatus("error")
      }
    }
    load()
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel("compliance_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "compliance_checks" },
        (payload) => {
          const { item_id, is_checked, updated_at } = payload.new
          setChecked(prev => ({ ...prev, [item_id]: is_checked }))
          setLastUpdated(updated_at)
        }
      )
      .subscribe()
    channelRef.current = channel
    return () => supabase.removeChannel(channel)
  }, [])

  const toggleCheck = useCallback(async (id) => {
    const newVal = !checked[id]
    setChecked(prev => ({ ...prev, [id]: newVal }))
    const { error } = await supabase
      .from("compliance_checks")
      .upsert({ item_id: id, is_checked: newVal, updated_at: new Date().toISOString() }, { onConflict: "item_id" })
    if (error) {
      console.error(error)
      setChecked(prev => ({ ...prev, [id]: !newVal }))
    }
  }, [checked])

  const resetAll = async () => {
    if (!window.confirm("Reset all checkboxes for everyone? This cannot be undone.")) return
    const allIds = Object.values(COMPLIANCE_DATA).flatMap(t => t.sections.flatMap(s => s.items.map(i => i.id)))
    const rows = allIds.map(id => ({ item_id: id, is_checked: false, updated_at: new Date().toISOString() }))
    setChecked({})
    await supabase.from("compliance_checks").upsert(rows, { onConflict: "item_id" })
  }

  const toggleSection = (id) => setOpenSections(prev => ({ ...prev, [id]: !prev[id] }))

  const allItems = Object.values(COMPLIANCE_DATA).flatMap(t => t.sections.flatMap(s => s.items))
  const totalCount = allItems.length
  const doneCount = allItems.filter(i => checked[i.id]).length
  const pct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0
  const scoreColor = pct >= 80 ? "#2ECC71" : pct >= 50 ? "#FFD700" : "#E83B2F"
  const tabData = COMPLIANCE_DATA[activeTab]

  const formatTime = (iso) => {
    if (!iso) return null
    const d = new Date(iso)
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) + " " + d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
  }

  const statusConfig = {
    connecting: { color: "#FFD700", dot: "◌", label: "CONNECTING..." },
    live: { color: "#2ECC71", dot: "●", label: "LIVE — SYNCING" },
    error: { color: "#E83B2F", dot: "●", label: "CONNECTION ERROR" },
  }
  const sc = statusConfig[status]

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "'DM Sans','Helvetica Neue',sans-serif", color: "#f5f0e8" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #FFD700; }
        .chk:hover { border-color: #FFD700 !important; transform: scale(1.08); }
        .tab-b:hover { background: #2d2d2d !important; color: #f5f0e8 !important; }
        .sec-h:hover { background: #1f1f1f !important; }
        .item-r:hover { background: #161616 !important; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        .fu { animation: fadeUp 0.2s ease; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .pulse { animation: pulse 1.5s infinite; }
        @media(max-width:600px){
          .scores { gap:8px !important; }
          .score-p { min-width:72px !important; padding:10px 12px !important; }
          .tab-b { font-size:0.75rem !important; min-width:80px !important; }
        }
      `}</style>

      <div style={{ background:"#0a0a0a", borderBottom:"3px solid #FFD700", padding:"14px 20px", position:"sticky", top:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
        <div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.7rem", letterSpacing:3, color:"#FFD700", lineHeight:1 }}>HH CHIP SHOP</div>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.55rem", letterSpacing:4, color:"#555", marginTop:2 }}>BRIXTON — COMPLIANCE SYSTEM</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div className={status === "connecting" ? "pulse" : ""} style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.6rem", color:sc.color, letterSpacing:1 }}>
            {sc.dot} {sc.label}
          </div>
          {lastUpdated && <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.5rem", color:"#444", marginTop:3 }}>Last change: {formatTime(lastUpdated)}</div>}
        </div>
      </div>

      <div style={{ maxWidth:960, margin:"0 auto", padding:"28px 14px 80px" }}>
        <div style={{ textAlign:"center", padding:"28px 0 36px", borderBottom:"1px solid #1a1a1a", marginBottom:32 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(2.2rem,7vw,4.5rem)", letterSpacing:5, lineHeight:1 }}>
            STAY <span style={{ color:"#FFD700" }}>LEGAL</span> STAY FRESH
          </div>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.6rem", color:"#444", letterSpacing:3, marginTop:8 }}>
            SHARED COMPLIANCE DASHBOARD — LIVE FOR ALL USERS
          </div>
          <div className="scores" style={{ display:"flex", gap:14, justifyContent:"center", marginTop:24, flexWrap:"wrap" }}>
            {[
              { label:"Total", value:totalCount, color:"#f5f0e8" },
              { label:"Done", value:doneCount, color:"#2ECC71" },
              { label:"Pending", value:totalCount-doneCount, color:"#E83B2F" },
              { label:"Score", value:pct+"%", color:scoreColor },
            ].map(s => (
              <div key={s.label} className="score-p" style={{ background:"#141414", border:"1px solid #222", padding:"12px 20px", minWidth:100, textAlign:"center" }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"2rem", color:s.color, lineHeight:1 }}>{s.value}</div>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.55rem", color:"#444", letterSpacing:2, marginTop:3, textTransform:"uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ maxWidth:380, margin:"16px auto 0", height:3, background:"#1a1a1a", borderRadius:2, overflow:"hidden" }}>
            <div style={{ height:"100%", width:pct+"%", background:scoreColor, transition:"width 0.5s ease, background 0.3s" }} />
          </div>
        </div>

        <div style={{ display:"flex", gap:2, marginBottom:2, flexWrap:"wrap" }}>
          {Object.entries(COMPLIANCE_DATA).map(([key, tab]) => {
            const items = tab.sections.flatMap(s => s.items)
            const done = items.filter(i => checked[i.id]).length
            const active = activeTab === key
            return (
              <button key={key} className="tab-b" onClick={() => setActiveTab(key)}
                style={{ flex:1, minWidth:110, background:active?"#2d2d2d":"#111", color:active?"#FFD700":"#555", border:"none", borderBottom:active?"3px solid #FFD700":"3px solid transparent", padding:"11px 12px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.9rem", letterSpacing:2, cursor:"pointer", transition:"all 0.2s" }}>
                {tab.label}
                <span style={{ display:"block", fontFamily:"'Space Mono',monospace", fontSize:"0.5rem", color:active?"#666":"#333", marginTop:2 }}>{done}/{items.length}</span>
              </button>
            )
          })}
        </div>

        <div className="fu" key={activeTab}>
          {tabData.sections.map(section => {
            const cfg = PRIORITY_CONFIG[section.priority]
            const isOpen = !!openSections[section.id]
            const sDone = section.items.filter(i => checked[i.id]).length
            const sTotal = section.items.length
            const allDone = sDone === sTotal
            return (
              <div key={section.id} style={{ marginBottom:2, borderLeft:`4px solid ${allDone?"#2ECC71":cfg.border}`, background:"#111", transition:"border-color 0.4s" }}>
                <div className="sec-h" onClick={() => toggleSection(section.id)}
                  style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"15px 18px", cursor:"pointer", transition:"background 0.15s" }}>
                  <div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.05rem", letterSpacing:2, color:allDone?"#2ECC71":"#f5f0e8" }}>
                      {section.title}{allDone && <span style={{ marginLeft:8 }}>✓</span>}
                    </div>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.55rem", color:"#444", letterSpacing:2, marginTop:2 }}>{section.meta}</div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ background:cfg.bg, border:`1px solid ${cfg.border}`, color:cfg.color, fontFamily:"'Space Mono',monospace", fontSize:"0.5rem", letterSpacing:1, padding:"3px 7px" }}>
                      {cfg.label}
                    </div>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.6rem", color:"#444" }}>{sDone}/{sTotal}</div>
                    <div style={{ color:"#FFD700", fontSize:"0.65rem", transition:"transform 0.2s", transform:isOpen?"rotate(180deg)":"rotate(0)" }}>▼</div>
                  </div>
                </div>
                {isOpen && (
                  <div style={{ padding:"0 18px 18px" }} className="fu">
                    {section.callout && (
                      <div style={{ borderLeft:`3px solid ${section.callout.type==="red"?"#E83B2F":"#FFD700"}`, padding:"9px 13px", background:section.callout.type==="red"?"rgba(232,59,47,0.06)":"rgba(255,215,0,0.04)", marginBottom:12, fontSize:"0.78rem", color:"#999", lineHeight:1.6 }}>
                        <strong style={{ color:section.callout.type==="red"?"#E83B2F":"#FFD700" }}>⚠️ </strong>
                        {section.callout.text}
                      </div>
                    )}
                    {section.items.map((item, idx) => {
                      const isDone = !!checked[item.id]
                      return (
                        <div key={item.id} className="item-r"
                          style={{ display:"flex", gap:12, padding:"11px 0", borderBottom:idx < section.items.length-1?"1px solid #1a1a1a":"none", transition:"background 0.1s", borderRadius:2 }}>
                          <div className="chk" onClick={() => toggleCheck(item.id)}
                            style={{ width:20, height:20, border:`2px solid ${isDone?"#2ECC71":"#2a2a2a"}`, flexShrink:0, marginTop:2, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", background:isDone?"#2ECC71":"transparent", transition:"all 0.15s", fontSize:"0.65rem", color:"#000", fontWeight:"bold" }}>
                            {isDone?"✓":""}
                          </div>
                          <div style={{ flex:1 }}>
                            <div style={{ fontSize:"0.86rem", color:isDone?"#444":"#ddd", textDecoration:isDone?"line-through":"none", transition:"all 0.2s", fontWeight:500 }}>
                              {item.title}
                            </div>
                            {!isDone && (
                              <>
                                <div style={{ fontSize:"0.76rem", color:"#555", marginTop:3, lineHeight:1.5 }}>{item.detail}</div>
                                {item.law && <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.55rem", color:"#383838", marginTop:4 }}>📜 {item.law}</div>}
                                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.55rem", color:"#FFD700", marginTop:3, letterSpacing:1 }}>{item.freq}</div>
                              </>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div style={{ textAlign:"center", marginTop:44 }}>
          <button onClick={resetAll}
            style={{ background:"none", border:"1px solid #1e1e1e", color:"#333", fontFamily:"'Space Mono',monospace", fontSize:"0.6rem", letterSpacing:2, padding:"7px 18px", cursor:"pointer", transition:"all 0.2s" }}
            onMouseEnter={e=>{e.target.style.borderColor="#E83B2F";e.target.style.color="#E83B2F"}}
            onMouseLeave={e=>{e.target.style.borderColor="#1e1e1e";e.target.style.color="#333"}}>
            RESET ALL PROGRESS
          </button>
        </div>
      </div>
    </div>
  )
}
