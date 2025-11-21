import React, { useState, useEffect, useRef } from "react";
import './pa.css'

const SIGN_DICT = {
  "welcome": ["/signs/welcomes.jpg"],
  "swagat hai": ["/signs/welcomes.jpg"],
  "attention": ["/signs/attention.gif"],
  "dhyan dein": ["/signs/attention.gif"],
  "delay": ["/signs/delay.gif", "/signs/deri.gif"],
  "deri": ["/signs/delay.gif", "/signs/deri.gif"],
  "late": ["/signs/delay.gif", "/signs/deri.gif"],
  "early": ["/signs/EARLY.gif", "/signs/jaldi.gif"],
  "jaldi": ["/signs/EARLY.gif", "/signs/jaldi.gif"],
  "platform change": ["/signs/pc.gif"],
  "platform badlaav": ["/signs/pc.gif"],
  "bus is arriving": ["/signs/arriving.gif"],
  "bus a rahi hai": ["/signs/arriving.gif"],
  "bus is departing": ["/signs/departing.gif"],
  "bus ja rahi hai": ["/signs/departing.gif"],
  "bus cancelled": ["/signs/cancelled.gif"],
  "bus radd": ["/signs/cancelled.gif"],
  "bus cancel": ["/signs/cancelled.gif"],
  "on time": ["/signs/ontime.gif"],
  "samay par": ["/signs/ontime.gif"],
  "rescheduled": ["/signs/rescheduled.gif"],
  "punah nirdharit": ["/signs/rescheduled.gif"],
  "thank you": ["/signs/tenor.gif"],
  "dhanyvad": ["/signs/tenor.gif"],
  "thanks": ["/signs/tenor.gif"],
};

const KEYWORD_MAP = {
  welcome: ["/signs/welcome.gif"],
  swagat: ["/signs/welcomes.gif"],
  early: ["/signs/arriving.jpg"],
  jaldi: ["/signs/arriving.jpg"],
  platform: ["/signs/change.jpg"],
  badlaav: ["/signs/change.jpg"],
  change: ["/signs/change.jpg"],
  arriving: ["/signs/arriving.jpg"],
  "a rahi": ["/signs/arriving.gif"],
  departing: ["/signs/leaving.jpg"],
  "ja rahi": ["/signs/leaving.jpg"],
  cancelled: ["/signs/cancelled.gif"],
  radd: ["/signs/cancelled.gif"],
  cancel: ["/signs/cancelled.gif"],
  time: ["/signs/ontime.gif"],
  samay: ["/signs/ontime.gif"],
  rescheduled: ["/signs/rescheduled.gif"],
  punah: ["/signs/rescheduled.gif"],
  thank: ["/signs/thank.gif"],
  dhanyvad: ["/signs/thank.gif"],
  thanks: ["/signs/thank.gif"],
};

const TIMETABLE = [
  { no: "B001", name: "City Express", time: "10:30", platform: "A1", status: "Arriving" },
  { no: "B002", name: "Metro Shuttle", time: "11:15", platform: "B2", status: "Delayed" },
  { no: "B003", name: "Airport Connect", time: "12:05", platform: "C3", status: "On Time" },
  { no: "B004", name: "Downtown Loop", time: "13:00", platform: "D4", status: "On Time" },
  { no: "B005", name: "Suburban Express", time: "14:30", platform: "E5", status: "Delayed" },
  { no: "B006", name: "Night Rider", time: "15:15", platform: "F6", status: "Arriving" },
  { no: "B007", name: "Rapid Transit", time: "16:00", platform: "G7", status: "On Time" },
  { no: "B008", name: "Commuter Line", time: "16:45", platform: "H8", status: "Delayed" },
  { no: "B009", name: "Express Service", time: "17:30", platform: "I9", status: "On Time" },
  { no: "B010", name: "City Circular", time: "18:15", platform: "J10", status: "Arriving" },
];

export default function BusAnnouncement() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [animations, setAnimations] = useState([]);
  const [timedata] = useState(TIMETABLE);
  const recognitionRef = useRef(null);

  const normalize = (text) => text?.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, "").trim();

  const getGifsForText = (text) => {
    if (!text) return [];
    const clean = normalize(text);
    const words = clean.split(/\s+/);
    const gifs = [];

    let i = 0;
    while (i < words.length) {
      let matched = false;
      for (const phrase of Object.keys(SIGN_DICT)) {
        const phraseWords = phrase.split(" ");
        const segment = words.slice(i, i + phraseWords.length).join(" ");
        if (segment === phrase) {
          SIGN_DICT[phrase].forEach((g) => {
            if (!gifs.includes(g)) gifs.push(g);
          });
          i += phraseWords.length;
          matched = true;
          break;
        }
      }
      if (!matched) {
        const word = words[i];
        for (const key of Object.keys(KEYWORD_MAP)) {
          if (word.includes(key)) {
            KEYWORD_MAP[key].forEach((g) => {
              if (!gifs.includes(g)) gifs.push(g);
            });
          }
        }
        i += 1;
      }
    }
    return gifs;
  };

  const handleAnnouncement = (text) => {
    setTranscript(text);
    setAnimations(getGifsForText(text));
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recog = new SpeechRecognition();
    recog.continuous = true;
    recog.interimResults = false;
    recog.lang = "en-IN";

    recog.onresult = (ev) => {
      let finalText = "";
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        if (ev.results[i].isFinal) finalText += ev.results[i][0].transcript;
      }
      if (finalText) handleAnnouncement(finalText);
    };

    recog.onerror = (e) => console.warn("SpeechRecognition error", e);
    recognitionRef.current = recog;

    return () => {
      try { recog.stop(); } catch {}
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (!listening) {
      setTranscript(""); setAnimations([]);
      try { recognitionRef.current.start(); setListening(true); } catch {}
    } else {
      try { recognitionRef.current.stop(); } catch {}
      setListening(false);
    }
  };

  const manualAnnounce = (text) => handleAnnouncement(text);
  return (
    <div className="page">
      <header className="header">
        <div className="header-left">
          <h1>🚌 Bus ISL Assistant</h1>
          <p className="sub">Live speech → Text → Sign animation (for deaf passengers)</p>
        </div>
        <div className="header-right">
          <button className={`listen ${listening ? "listening" : ""}`} onClick={toggleListening}>
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
              <button onClick={() => manualAnnounce("thank you")}>Test: "thank you"</button>
              <button onClick={() => manualAnnounce("platform change")}>Test: "platform change"</button>
              <button onClick={() => manualAnnounce("yatrigan kripya dhyan dein bus deri se chal rahi hai")}>
                Test: Attention + Delay
              </button>
            </div>
          </div>

          <div className="panel animation">
            <h2>Sign Animation</h2>
            <div className="animation-stage" aria-live="polite">
              {animations.length
                ? animations.map((src, idx) => <img key={idx} src={src} alt="ISL sign" />)
                : <div className="placeholder">Animation will appear here</div>}
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
                    <td className={r.status === "Delayed" ? "status delayed" : "status ontime"}>{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </aside>
      </main>

      <footer className="footer">© 2025 Bus Transport — ISL Assistant</footer>
    </div>
  );
}
