import { combineReducers } from "redux";
import {
  SET_COUNTDOWN,
  START_COUNTDOWN,
  RESET_COUNTDOWN,
  ADD_PARTICIPANT,
  SELECT_WINNER,
  CLEAR_PARTICIPANTS,
} from "../actions";

const countdownReducer = (state = 0, action) => {
  switch (action.type) {
    case SET_COUNTDOWN:
      return action.payload;
    case START_COUNTDOWN:
      return state;
    case RESET_COUNTDOWN:
      return 0; // 只重置倒计时，不影响中奖者状态
    case SELECT_WINNER:
      return state;
    default:
      return state;
  }
};

const participantsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_PARTICIPANT:
      return [...state, action.payload];
    case SELECT_WINNER:
      return state; // 不改變參與者名單
    case CLEAR_PARTICIPANTS:
      return [];
    case RESET_COUNTDOWN:
      return state.map((participant) => participant.replace(" (中獎)", ""));
    default:
      return state;
  }
};

const winnerReducer = (state = null, action) => {
  switch (action.type) {
    case SELECT_WINNER:
      return action.payload; // 儲存中獎者的索引
    case RESET_COUNTDOWN:
      return null; // 重置中獎者
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  countdown: countdownReducer,
  participants: participantsReducer,
  winner: winnerReducer,
});

export default rootReducer;
