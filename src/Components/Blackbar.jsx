import React, { useEffect, useState } from "react";


const Blackbar=()=> {
 
  const targetDate = new Date("2025-12-31T23:59:59").getTime();

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="black-bar">
      <div className="black-bar-content  container-fluid">
        {/* Left text */}
        <div className="black-bar-text ">
          <h2>One-Time Only</h2>
          <p>
            Special Offers You Can't Miss: These deals won't last forever!
          </p>
        </div>

        {/* Right countdown */}
        <div className="black-bar-timer">
          <div className="time-box">
            <span className="time">{timeLeft.days}</span>
            <span className="label">DAYS</span>
          </div>
          <div className="time-box">
            <span className="time">{timeLeft.hours}</span>
            <span className="label">HOURS</span>
          </div>
          <div className="time-box">
            <span className="time">{timeLeft.minutes}</span>
            <span className="label">MINS</span>
          </div>
          <div className="time-box">
            <span className="time">{timeLeft.seconds}</span>
            <span className="label">SECS</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blackbar;