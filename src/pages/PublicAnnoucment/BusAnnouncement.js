import React, { useEffect, useMemo, useRef, useState } from "react";

// ===== Minimal SIGN_DICT with 4 announcements =====
const SIGN_DICT = {
  welcome: {
    variants: ["welcome", "swagat hai", "swagat"],
    gifs: ["/signs/welcome.gif"],
  },
  attention: {
    variants: ["attention", "dhyan dein"],
    gifs: ["/signs/attention.gif"],
  },
  change: {
    variants: ["bus route change", "platform change", "bus stand badlaav"],
    gifs: ["/signs/change.jpg"],
  },
  cancelled: {
    variants: ["bus cancelled", "bus radd", "bus cancel", "cancelled"],
    gifs: ["/signs/cancel.jpg"],
  },
};

// ===== Sample timetable (Bus station) =====
const BUS_TIMETABLE = [
  { no: "B001", name: "City Express", time: "10:30", platform: "A1", status: "Arriving" },
  { no: "B002", name: "Metro Shuttle", time: "11:15", platform: "B2", status: "Delayed" },
  { no: "B003", name: "Airport Connect", time: "12:05", platform: "C3", status: "On Time" },
  { no: "B004", name: "Downtown Loop", time: "13:00", platform: "D4", status: "On Time" },
  { no: "B005", name: "Suburban Express", time: "14:30", platform: "E5", status: "Delayed" },
  { no: "B006", name: "Night Rider", time: "15:15", platform: "F6", status: "Arriving" },
];

export default function BusAnnouncement() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [animations, setAnimations] = useState([]);
  const [timedata] = useState(BUS_TIMETABLE);
  const recognitionRef = useRef(null);

  const normalize = (text) =>
    text?.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, "").trim();

  // Precompute all variants sorted by length (prefer multi-word)
  const variantsSorted = useMemo(() => {
    const all = [];
    Object.values(SIGN_DICT).forEach((entry) => {
      entry.variants.forEach((v) => all.push(v));
    });
    return all.sort((a, b) => b.length - a.length);
  }, []);

  // --- Match text against SIGN_DICT (using variants) ---
  const getGifsForText = (text) => {
    if (!text) return [];
    const clean = normalize(text);
    const words = clean.split(/\s+/);
    const gifs = [];

    let i = 0;
    while (i < words.length) {
      let matched = false;
      for (const variant of variantsSorted) {
        const variantWords = variant.split(" ");
        const segment = words.slice(i, i + variantWords.length).join(" ");
        if (segment === variant) {
          const intent = Object.values(SIGN_DICT).find((entry) =>
            entry.variants.includes(variant)
          );
          if (intent) {
            intent.gifs.forEach((g) => {
              if (!gifs.includes(g)) gifs.push(g);
            });
          }
          i += variantWords.length;
          matched = true;
          break;
        }
      }
      if (!matched) i++;
    }

    return gifs;
  };

  const handleAnnouncement = (text) => {
    setTranscript(text);
    // 👉 Only show animation *after listening is completed*
    setTimeout(() => {
      setAnimations(getGifsForText(text));
    }, 300); // short delay so transcript updates first
  };

  // --- Live Speech Recognition ---
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recog = new SpeechRecognition();
    recog.continuous = false; // stop after one utterance
    recog.interimResults = false;
    recog.lang = "en-IN";

    recog.onresult = (ev) => {
      let finalText = "";
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        if (ev.results[i].isFinal) finalText += ev.results[i][0].transcript;
      }
      if (finalText) handleAnnouncement(finalText);
    };

    recog.onend = () => {
      // stop listening after recognition ends
      setListening(false);
    };

    recog.onerror = (e) => console.warn("SpeechRecognition error", e);
    recognitionRef.current = recog;

    return () => {
      try {
        recog.stop();
      } catch {}
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (!listening) {
      setTranscript("");
      setAnimations([]);
      try {
        recognitionRef.current.start();
        setListening(true);
      } catch {}
    } else {
      try {
        recognitionRef.current.stop();
      } catch {}
      setListening(false);
    }
  };

  const manualAnnounce = (text) => handleAnnouncement(text);

  return (
    <div className="page">
      <header className="header">
        <div className="header-left">
          <h1>🚌 Bus ISL Assistant</h1>
          <p className="sub">
            Live speech → Text → Sign animation (for deaf passengers)
          </p>
        </div>
        <div className="header-right">
          <button
            className={`listen ${listening ? "listening" : ""}`}
            onClick={toggleListening}
          >
            {listening ? "Stop Listening" : "Start Listening"}
          </button>
        </div>
      </header>

      <main className="main">
        <section className="left">
          <div className="panel transcript">
            <h2>Live Transcription</h2>
            <div className="transcript-box" aria-live="polite">
              {transcript || <em>Waiting for announcement...</em>}
            </div>
            <div className="controls">
              <button onClick={() => manualAnnounce("welcome")}>
                Test: "welcome"
              </button>
              <button onClick={() => manualAnnounce("attention")}>
                Test: "attention"
              </button>
              <button onClick={() => manualAnnounce("bus route change")}>
                Test: "bus route change"
              </button>
              <button onClick={() => manualAnnounce("bus cancelled")}>
                Test: "bus cancelled"
              </button>
            </div>
          </div>

          <div className="panel animation">
            <h2>Sign Animation</h2>
            <div className="animation-stage" aria-live="polite">
              {animations.length ? (
                animations.map((src, idx) => (
                  <img key={idx} src={src} alt="ISL sign" />
                ))
              ) : (
                <div className="placeholder">Animation will appear here</div>
              )}
            </div>
          </div>
        </section>

        <aside className="right">
          <div className="panel timetable">
            <h2>Bus Station Timetable</h2>
            <table>
              <thead>
                <tr>
                  <th>Bus</th>
                  <th>Name</th>
                  <th>Time</th>
                  <th>Platform</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {timedata.map((r) => (
                  <tr key={r.no}>
                    <td>{r.no}</td>
                    <td>{r.name}</td>
                    <td>{r.time}</td>
                    <td>{r.platform}</td>
                    <td
                      className={
                        r.status === "Delayed"
                          ? "status delayed"
                          : "status ontime"
                      }
                    >
                      {r.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </aside>
      </main>

      <footer className="footer">
        © 2025 Bus Transport — ISL Assistant
      </footer>
    </div>
  );
}
