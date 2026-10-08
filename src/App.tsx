import { useRef, useState } from "react";
import "./App.css";

const noButtonLines = [
  "No",
  "Are you sure? 🤔",
  "Boo Boo please... 🥺",
  "I will be very sad... 😢",
  "Pretty Please??? 💔",
  "Don’t break my heart 💔",
  "One more chance? 🥹",
  "I’ll bring snacks 🍓",
];

const noReactions = [
  "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif",
  "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif",
];

const yesReaction = "https://media.tenor.com/u4kNBmvB9UkAAAAj/hasher-happy-sticker.gif";
const confettiColors = ["#b50924", "#e3273c", "#ff574f", "#ffffff", "#ffd0ad", "#8d071b"];

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [noPosition, setNoPosition] = useState<{ left: number; top: number } | null>(null);
  const [toast, setToast] = useState("");
  const [musicOn, setMusicOn] = useState(false);
  const [musicTouched, setMusicTouched] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const moveNoButton = () => {
    const button = noButtonRef.current;
    if (!button) return;
    const margin = 20;
    const maxX = Math.max(margin, window.innerWidth - button.offsetWidth - margin);
    const maxY = Math.max(margin, window.innerHeight - button.offsetHeight - margin);
    // Put the button somewhere new and comfortably inside the viewport.
    const current = button.getBoundingClientRect();
    let left = margin, top = margin;
    for (let attempt = 0; attempt < 12; attempt++) {
      left = margin + Math.random() * (maxX - margin);
      top = margin + Math.random() * (maxY - margin);
      if (Math.hypot(left - current.left, top - current.top) > 120) break;
    }
    setNoPosition({ left, top });
  };

  const handleNoClick = () => {
    // The fifth No click starts the chase without requiring a new hover event.
    if (noCount >= 4) moveNoButton();
    setNoCount((count) => count + 1);
    setToast("");
  };

  const runAway = () => {
    if (noCount >= 5) moveNoButton();
  };

  const handleYesClick = () => {
    if (noCount < 5) {
      setToast(
        noCount === 0
          ? "try saying no first... I bet you want to know what happens 😏"
          : "go on, hit no... just once 👀",
      );
      return;
    }
    setToast("");
    setYesPressed(true);
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    setMusicTouched(true);
    if (musicOn) {
      audio.pause();
      audio.muted = true;
      setMusicOn(false);
      return;
    }
    audio.muted = false;
    try {
      await audio.play();
      setMusicOn(true);
    } catch {
      audio.muted = true;
      setMusicOn(false);
      setToast("Tap the music button again to start the song.");
    }
  };

  // Avoid covering the No button while the Yes button grows.
  const yesSize = Math.min(1.6 * Math.pow(1.25, noCount), 3.4);
  const reaction = noReactions[Math.min(noCount, noReactions.length - 1)];

  return (
    <main className={`valentine-page${yesPressed ? " is-yes" : ""}`}>
      <div className="hearts-bg" aria-hidden="true" />

      <section className="valentine-content" aria-live="polite">
        {yesPressed ? (
          <div className="yes-scene">
            <div className="confetti" aria-hidden="true">
              {Array.from({ length: 80 }, (_, i) => (
                <span
                  key={i}
                  className="confetti-piece"
                  style={{
                    left: `${(i * 37 + 3) % 100}%`,
                    animationDelay: `${-((i * 17) % 48) / 10}s`,
                    animationDuration: `${3.2 + ((i * 7) % 16) / 10}s`,
                    backgroundColor: confettiColors[i % confettiColors.length],
                    transform: `rotate(${(i * 73) % 360}deg)`,
                  }}
                />
              ))}
            </div>
            <h1 className="yes-title">I knew you loved me! ❤️</h1>
            <img className="yes-gif" src={yesReaction} alt="A character celebrating" />
            <p className="yes-message">You just made my whole heart happy! ❤️</p>
          </div>
        ) : (
          <>
            <h1>Do you Love Me? ❤️</h1>
            <div className="gif-container">
              <img
                key={reaction}
                id="cat-gif"
                src={reaction}
                alt="A cute character asking you to say yes"
              />
            </div>
            <div className={`buttons${noCount >= 4 && noPosition === null ? " no-centered" : ""}`}>
              <button
                id="yes-btn"
                type="button"
                onClick={handleYesClick}
                style={{
                  fontSize: `clamp(1.35rem, ${yesSize * 2.2}vw, ${yesSize}rem)`,
                  padding: `${Math.min(18 + noCount * 4, 38)}px ${Math.min(45 + noCount * 7, 74)}px`,
                }}
              >
                Yes
              </button>
              <button id="no-btn" ref={noButtonRef} type="button" onClick={handleNoClick}
                onMouseEnter={runAway} onTouchStart={(event) => { if (noCount >= 5) { event.preventDefault(); runAway(); } }}
                style={noPosition ? { position: "fixed", left: noPosition.left, top: noPosition.top, zIndex: 50, transform: "none" } : undefined}>
                {noButtonLines[Math.min(noCount, noButtonLines.length - 1)]}
              </button>
            </div>
            <div className={`tease-toast${toast ? " show" : ""}`} role="status" aria-live="polite">
              {toast}
            </div>
          </>
        )}
      </section>

      <audio
        ref={audioRef}
        autoPlay
        loop
        preload="none"
        muted
        src="https://joanpangyarihan.github.io/valentines-day/freepik-love-in-laughter.mp3"
      />
      <button
        className="music-toggle"
        type="button"
        onClick={toggleMusic}
        aria-label={musicOn ? "Turn music off" : "Turn music on"}
        title={musicOn ? "Turn music off" : "Turn music on"}
      >
        {musicOn || !musicTouched ? "🔊" : "🔇"}
      </button>
    </main>
  );
}
