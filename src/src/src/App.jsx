import { useState } from “react”;

const VIBES = [
{ id: “raw”, label: “Raw & Real”, emoji: “🔥”, desc: “Unfiltered, honest, relatable” },
{ id: “motivational”, label: “Motivational”, emoji: “💪”, desc: “Inspiring, action-driving” },
{ id: “funny”, label: “Funny”, emoji: “😂”, desc: “Witty, playful, shareable” },
{ id: “professional”, label: “Professional”, emoji: “💼”, desc: “Polished, credible, trust-building” },
];

const PLATFORMS = [
{ id: “instagram”, label: “Instagram” },
{ id: “tiktok”, label: “TikTok” },
{ id: “linkedin”, label: “LinkedIn” },
];

export default function CaptionCraft() {
const [step, setStep] = useState(1);
const [business, setBusiness] = useState(””);
const [postIdea, setPostIdea] = useState(””);
const [vibe, setVibe] = useState(””);
const [platform, setPlatform] = useState(“instagram”);
const [loading, setLoading] = useState(false);
const [result, setResult] = useState(null);
const [copied, setCopied] = useState(null);

const canProceed1 = business.trim().length > 5 && postIdea.trim().length > 5;
const canProceed2 = vibe !== “”;

async function generate() {
setLoading(true);
setResult(null);

```
const prompt = `You are an expert social media content creator. Generate content for the following:
```

Business: ${business}
Post idea: ${postIdea}
Vibe/tone: ${vibe}
Platform: ${platform}

Return ONLY a JSON object (no markdown, no backticks) with this exact structure:
{
“hook”: “One killer opening line that stops the scroll (max 12 words)”,
“captions”: [
“Caption 1 — short and punchy (2-4 sentences)”,
“Caption 2 — medium length with a story angle (4-6 sentences)”,
“Caption 3 — call to action focused (2-4 sentences)”
],
“reelScript”: “A complete 60-90 second Reel script with [VISUAL] cues and spoken lines”,
“hashtags”: [“tag1”, “tag2”, “tag3”, “tag4”, “tag5”, “tag6”, “tag7”, “tag8”, “tag9”, “tag10”]
}`;

```
try {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await response.json();
  const text = data.content.map(i => i.text || "").join("");
  const clean = text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(clean);
  setResult(parsed);
  setStep(4);
} catch (err) {
  console.error(err);
  setResult({ error: "Something went wrong. Try again." });
}
setLoading(false);
```

}

function copyText(text, id) {
navigator.clipboard.writeText(text);
setCopied(id);
setTimeout(() => setCopied(null), 2000);
}

function reset() {
setStep(1);
setBusiness(””);
setPostIdea(””);
setVibe(””);
setPlatform(“instagram”);
setResult(null);
}

return (
<div style={{
minHeight: “100vh”,
background: “#0a0a0a”,
fontFamily: “‘Georgia’, serif”,
color: “#f0ede6”,
position: “relative”,
overflow: “hidden”,
}}>
{/* Grain overlay */}
<div style={{
position: “fixed”, inset: 0, pointerEvents: “none”, zIndex: 0,
backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
opacity: 0.5,
}} />

```
  {/* Accent glow */}
  <div style={{
    position: "fixed", top: "-20%", right: "-10%",
    width: "600px", height: "600px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,165,0,0.08) 0%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  }} />

  <div style={{ position: "relative", zIndex: 1, maxWidth: "680px", margin: "0 auto", padding: "40px 24px" }}>

    {/* Header */}
    <div style={{ textAlign: "center", marginBottom: "48px" }}>
      <div style={{
        display: "inline-block",
        background: "linear-gradient(135deg, #ff8c00, #ff4500)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        fontSize: "13px", fontFamily: "'Courier New', monospace",
        letterSpacing: "4px", textTransform: "uppercase", marginBottom: "12px",
      }}>
        ✦ AI Content Generator ✦
      </div>
      <h1 style={{
        fontSize: "clamp(42px, 8vw, 64px)", fontWeight: "400",
        margin: "0 0 8px", letterSpacing: "-2px", lineHeight: 1,
        background: "linear-gradient(180deg, #f0ede6 0%, #8a8070 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>
        CaptionCraft
      </h1>
      <p style={{ color: "#6b6255", fontSize: "16px", margin: 0, fontStyle: "italic" }}>
        Stop staring at a blank screen.
      </p>
    </div>

    {/* Progress bar */}
    {step < 4 && (
      <div style={{ display: "flex", gap: "8px", marginBottom: "40px" }}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{
            flex: 1, height: "3px", borderRadius: "2px",
            background: s <= step ? "linear-gradient(90deg, #ff8c00, #ff4500)" : "#1e1e1e",
            transition: "background 0.4s ease",
          }} />
        ))}
      </div>
    )}

    {/* STEP 1 */}
    {step === 1 && (
      <div style={{ animation: "fadeIn 0.4s ease" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "400", marginBottom: "8px", letterSpacing: "-0.5px" }}>
          Tell us about your business
        </h2>
        <p style={{ color: "#6b6255", fontSize: "14px", marginBottom: "28px", fontStyle: "italic" }}>
          The more specific, the better the output.
        </p>

        <label style={labelStyle}>What's your business?</label>
        <textarea
          value={business}
          onChange={e => setBusiness(e.target.value)}
          placeholder="e.g. Mobile ice cream van serving festivals and events across the UK. Fun, premium flavours, family-friendly."
          style={{ ...inputStyle, height: "100px", resize: "none" }}
        />

        <label style={{ ...labelStyle, marginTop: "20px" }}>What's the post about?</label>
        <textarea
          value={postIdea}
          onChange={e => setPostIdea(e.target.value)}
          placeholder="e.g. Just did our biggest event yet — 400 scoops in 3 hours. Want to share the chaos and the win."
          style={{ ...inputStyle, height: "100px", resize: "none" }}
        />

        <button
          onClick={() => setStep(2)}
          disabled={!canProceed1}
          style={canProceed1 ? btnPrimary : btnDisabled}
        >
          Next →
        </button>
      </div>
    )}

    {/* STEP 2 */}
    {step === 2 && (
      <div style={{ animation: "fadeIn 0.4s ease" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "400", marginBottom: "8px", letterSpacing: "-0.5px" }}>
          Pick your vibe
        </h2>
        <p style={{ color: "#6b6255", fontSize: "14px", marginBottom: "28px", fontStyle: "italic" }}>
          This shapes the tone of everything we generate.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "28px" }}>
          {VIBES.map(v => (
            <button
              key={v.id}
              onClick={() => setVibe(v.id)}
              style={{
                background: vibe === v.id ? "rgba(255,140,0,0.12)" : "#111",
                border: vibe === v.id ? "1px solid rgba(255,140,0,0.5)" : "1px solid #222",
                borderRadius: "12px", padding: "20px 16px", cursor: "pointer",
                textAlign: "left", transition: "all 0.2s ease", color: "#f0ede6",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>{v.emoji}</div>
              <div style={{ fontSize: "15px", fontWeight: "500", marginBottom: "4px" }}>{v.label}</div>
              <div style={{ fontSize: "12px", color: "#6b6255", fontStyle: "italic" }}>{v.desc}</div>
            </button>
          ))}
        </div>

        <label style={labelStyle}>Platform</label>
        <div style={{ display: "flex", gap: "10px", marginBottom: "28px" }}>
          {PLATFORMS.map(p => (
            <button
              key={p.id}
              onClick={() => setPlatform(p.id)}
              style={{
                flex: 1, padding: "10px", borderRadius: "8px", cursor: "pointer",
                fontSize: "13px", fontFamily: "'Courier New', monospace", letterSpacing: "1px",
                background: platform === p.id ? "rgba(255,140,0,0.12)" : "#111",
                border: platform === p.id ? "1px solid rgba(255,140,0,0.5)" : "1px solid #222",
                color: platform === p.id ? "#ff8c00" : "#6b6255", transition: "all 0.2s",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={() => setStep(1)} style={btnSecondary}>← Back</button>
          <button onClick={() => setStep(3)} disabled={!canProceed2} style={canProceed2 ? { ...btnPrimary, flex: 1 } : { ...btnDisabled, flex: 1 }}>
            Next →
          </button>
        </div>
      </div>
    )}

    {/* STEP 3 - Confirm & Generate */}
    {step === 3 && (
      <div style={{ animation: "fadeIn 0.4s ease" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "400", marginBottom: "8px", letterSpacing: "-0.5px" }}>
          Ready to generate
        </h2>
        <p style={{ color: "#6b6255", fontSize: "14px", marginBottom: "28px", fontStyle: "italic" }}>
          Here's what we're working with.
        </p>

        <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "16px", padding: "24px", marginBottom: "28px" }}>
          {[
            { label: "Business", value: business },
            { label: "Post idea", value: postIdea },
            { label: "Vibe", value: VIBES.find(v => v.id === vibe)?.label },
            { label: "Platform", value: platform.charAt(0).toUpperCase() + platform.slice(1) },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#ff8c00", marginBottom: "4px", fontFamily: "'Courier New', monospace" }}>
                {item.label}
              </div>
              <div style={{ fontSize: "15px", color: "#c8c0b0", lineHeight: 1.5 }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={() => setStep(2)} style={btnSecondary}>← Back</button>
          <button onClick={generate} style={{ ...btnPrimary, flex: 1 }}>
            ✦ Generate Content
          </button>
        </div>
      </div>
    )}

    {/* LOADING */}
    {loading && (
      <div style={{ textAlign: "center", padding: "60px 0", animation: "fadeIn 0.3s ease" }}>
        <div style={{ fontSize: "32px", marginBottom: "16px", animation: "spin 2s linear infinite", display: "inline-block" }}>✦</div>
        <p style={{ color: "#6b6255", fontStyle: "italic" }}>Crafting your content...</p>
      </div>
    )}

    {/* RESULTS */}
    {step === 4 && result && !loading && (
      <div style={{ animation: "fadeIn 0.5s ease" }}>
        {result.error ? (
          <div style={{ color: "#ff4500", padding: "20px", background: "#1a0a00", borderRadius: "12px" }}>{result.error}</div>
        ) : (
          <>
            {/* Hook */}
            <div style={cardStyle}>
              <div style={cardLabel}>🎯 Scroll-Stopping Hook</div>
              <p style={{ fontSize: "22px", fontWeight: "400", lineHeight: 1.4, margin: "0 0 16px", letterSpacing: "-0.5px" }}>
                "{result.hook}"
              </p>
              <CopyBtn text={result.hook} id="hook" copied={copied} onCopy={copyText} />
            </div>

            {/* Captions */}
            <div style={cardStyle}>
              <div style={cardLabel}>✍️ 3 Captions</div>
              {result.captions?.map((cap, i) => (
                <div key={i} style={{
                  background: "#0d0d0d", borderRadius: "10px", padding: "16px",
                  marginBottom: "12px", border: "1px solid #1a1a1a",
                }}>
                  <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#ff8c00", marginBottom: "8px", fontFamily: "'Courier New', monospace" }}>
                    OPTION {i + 1}
                  </div>
                  <p style={{ fontSize: "14px", lineHeight: 1.7, margin: "0 0 12px", color: "#c8c0b0" }}>{cap}</p>
                  <CopyBtn text={cap} id={`cap${i}`} copied={copied} onCopy={copyText} />
                </div>
              ))}
            </div>

            {/* Reel Script */}
            <div style={cardStyle}>
              <div style={cardLabel}>🎬 Reel Script</div>
              <pre style={{
                fontSize: "13px", lineHeight: 1.8, color: "#c8c0b0", whiteSpace: "pre-wrap",
                fontFamily: "'Courier New', monospace", margin: "0 0 16px",
              }}>
                {result.reelScript}
              </pre>
              <CopyBtn text={result.reelScript} id="reel" copied={copied} onCopy={copyText} />
            </div>

            {/* Hashtags */}
            <div style={cardStyle}>
              <div style={cardLabel}>🏷️ Hashtags</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                {result.hashtags?.map((tag, i) => (
                  <span key={i} style={{
                    background: "rgba(255,140,0,0.08)", border: "1px solid rgba(255,140,0,0.2)",
                    borderRadius: "20px", padding: "4px 12px", fontSize: "13px",
                    color: "#ff8c00", fontFamily: "'Courier New', monospace",
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>
              <CopyBtn text={result.hashtags?.map(t => `#${t}`).join(" ")} id="tags" copied={copied} onCopy={copyText} />
            </div>

            <button onClick={reset} style={{ ...btnSecondary, width: "100%", marginTop: "8px" }}>
              ← Generate New Content
            </button>
          </>
        )}
      </div>
    )}
  </div>

  <style>{`
    @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    textarea:focus, input:focus { outline: none; border-color: rgba(255,140,0,0.4) !important; }
    textarea::placeholder { color: #3a3530; }
    ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0a0a0a; }
    ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px; }
  `}</style>
</div>
```

);
}

function CopyBtn({ text, id, copied, onCopy }) {
return (
<button
onClick={() => onCopy(text, id)}
style={{
background: “transparent”, border: “1px solid #2a2a2a”, borderRadius: “6px”,
padding: “6px 14px”, fontSize: “12px”, cursor: “pointer”, fontFamily: “‘Courier New’, monospace”,
color: copied === id ? “#ff8c00” : “#6b6255”, letterSpacing: “1px”, transition: “all 0.2s”,
}}
>
{copied === id ? “✓ COPIED” : “COPY”}
</button>
);
}

const labelStyle = {
display: “block”, fontSize: “11px”, letterSpacing: “2px”,
textTransform: “uppercase”, color: “#ff8c00”, marginBottom: “10px”,
fontFamily: “‘Courier New’, monospace”,
};

const inputStyle = {
width: “100%”, background: “#0d0d0d”, border: “1px solid #1e1e1e”,
borderRadius: “10px”, padding: “14px 16px”, fontSize: “14px”,
color: “#f0ede6”, fontFamily: “‘Georgia’, serif”, lineHeight: 1.6,
boxSizing: “border-box”, transition: “border-color 0.2s”,
};

const btnPrimary = {
width: “100%”, padding: “16px”, borderRadius: “10px”, cursor: “pointer”,
fontSize: “14px”, fontFamily: “‘Courier New’, monospace”, letterSpacing: “2px”,
textTransform: “uppercase”, border: “none”,
background: “linear-gradient(135deg, #ff8c00, #ff4500)”,
color: “#fff”, fontWeight: “600”, transition: “opacity 0.2s”,
};

const btnDisabled = {
…btnPrimary, opacity: 0.3, cursor: “not-allowed”,
};

const btnSecondary = {
padding: “14px 20px”, borderRadius: “10px”, cursor: “pointer”,
fontSize: “13px”, fontFamily: “‘Courier New’, monospace”, letterSpacing: “1px”,
background: “transparent”, border: “1px solid #2a2a2a”, color: “#6b6255”,
transition: “all 0.2s”,
};

const cardStyle = {
background: “#0d0d0d”, border: “1px solid #1a1a1a”, borderRadius: “16px”,
padding: “24px”, marginBottom: “16px”,
};

const cardLabel = {
fontSize: “11px”, letterSpacing: “2px”, textTransform: “uppercase”,
color: “#ff8c00”, marginBottom: “16px”, fontFamily: “‘Courier New’, monospace”,
};
