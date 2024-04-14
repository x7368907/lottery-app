export const SET_COUNTDOWN = "SET_COUNTDOWN";
export const START_COUNTDOWN = "START_COUNTDOWN";
export const RESET_COUNTDOWN = "RESET_COUNTDOWN";
export const ADD_PARTICIPANT = "ADD_PARTICIPANT";
export const SELECT_WINNER = "SELECT_WINNER";
export const CLEAR_PARTICIPANTS = "CLEAR_PARTICIPANTS";

export const setCountdown = (countdown) => ({
  type: SET_COUNTDOWN,
  payload: countdown,
});

export const startCountdown = () => ({
  type: START_COUNTDOWN,
});

export const resetCountdown = () => ({
  type: RESET_COUNTDOWN,
});

export const addParticipant = (name) => ({
  type: ADD_PARTICIPANT,
  payload: name,
});

export const selectWinner = (participants) => {
  return {
    type: SELECT_WINNER,
    payload: Math.floor(Math.random() * participants.length),
  };
};

export const clearParticipants = () => ({
  type: CLEAR_PARTICIPANTS,
});
