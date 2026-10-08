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
  const [noEnding, setNoEnding] = useState(false);
  const [toast, setToast] = useState("");
  const [musicOn, setMusicOn] = useState(false);
  const [musicTouched, setMusicTouched] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleNoClick = () => {
    if (noCount >= noButtonLines.length - 1) {
      setNoEnding(true);
    } else {
      setNoCount((count) => count + 1);
    }
    setToast("");
  };

  const handleTryAgain = () => {
    setNoEnding(false);
    setNoCount(0);
    setToast("");
  };

  const handleYesClick = () => {
    if (noCount < 4) {
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

  const yesSize = Math.min(1.6 + noCount * 1.2, 5.3);
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
        ) : noEnding ? (
          <div className="no-ending">
            <h1>Not even snacks?! 💔</h1>
            <img className="yes-gif" src={noReactions[1]} alt="A sad little character" />
            <p>Well, I had to try! 🍓</p>
            <button className="try-again-btn" type="button" onClick={handleTryAgain}>Try again ❤️</button>
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
            <div className="buttons">
              <button
                id="yes-btn"
                type="button"
                onClick={handleYesClick}
                style={{
                  fontSize: `clamp(1.35rem, ${yesSize * 2.2}vw, ${yesSize}rem)`,
                  padding: `${Math.min(18 + noCount * 5, 40)}px ${Math.min(45 + noCount * 9, 78)}px`,
                }}
              >
                Yes
              </button>
              <button id="no-btn" type="button" onClick={handleNoClick}>
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
