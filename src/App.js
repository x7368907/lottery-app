import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCountdown,
  startCountdown,
  resetCountdown,
  addParticipant,
  selectWinner,
  clearParticipants,
} from "./actions";

function App() {
  const [participantName, setParticipantName] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [winnerSelected, setWinnerSelected] = useState(false);
  const dispatch = useDispatch();

  const countdown = useSelector((state) => state.countdown);
  const participants = useSelector((state) => state.participants);
  const winner = useSelector((state) => state.winner);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (winner !== null) {
      setWinnerSelected(true);
    }
  }, [winner]);

  const handleStartCountdown = () => {
    setTimeLeft(countdown); // 设置倒计时时间为初始值
    dispatch(startCountdown());
    setTimeout(() => {
      dispatch(selectWinner(participants));
      setWinnerSelected(true);
      setTimeLeft(0); // 倒计时结束后将倒计时时间重置为0
    }, countdown * 1000);
  };

  const handleResetCountdown = () => {
    setTimeLeft(0);
    dispatch(resetCountdown());
    setWinnerSelected(false);
  };

  const handleAddParticipant = () => {
    dispatch(addParticipant(participantName));
    setParticipantName("");
  };

  const handleClearParticipants = () => {
    dispatch(clearParticipants());
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <div>
      <h1>抽獎功能</h1>
      <div>
        <label>倒數時間：</label>
        <input
          type="number"
          value={countdown}
          onChange={(e) => dispatch(setCountdown(parseInt(e.target.value)))}
        />
        <button onClick={handleStartCountdown}>執行</button>
        <button onClick={handleResetCountdown}>重置</button>
        {timeLeft > 0 && !winnerSelected && (
          <p>倒數中... {formatTime(timeLeft)}</p>
        )}
      </div>
      <div>
        <h2>參與抽獎人選名單：</h2>
        <ul>
          {participants.map((participant, index) => (
            <li key={index}>{participant}</li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="輸入參與者名稱"
          value={participantName}
          onChange={(e) => setParticipantName(e.target.value)}
        />
        <button onClick={handleAddParticipant}>新增參與者</button>
        <button onClick={handleClearParticipants}>重置參與者名單</button>
      </div>
      <div>
        <h2>抽獎結果：</h2>
        {winnerSelected && participants.length > 0 ? (
          <p>中獎者：{participants[winner]}</p>
        ) : (
          <p>尚未抽獎</p>
        )}
      </div>
    </div>
  );
}

export default App;
