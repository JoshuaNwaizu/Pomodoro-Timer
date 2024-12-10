import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";

interface PomodoroContextType {
  timeLeft: number;
  isRunning: boolean;
  currentSession: string;
  completedSessions: number;
  dispatch: Dispatch<Action>;
  closeModal: boolean;
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  selectFonts: number;
  getFonts: string;
  selectColor: number;
  getColor: string;
}
interface State {
  timeLeft: number;
  isRunning: boolean;
  currentSession: string;
  completedSessions: number;
  closeModal: boolean;
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  selectFonts: number;
  selectColor: number;
  getFonts: string;
  getColor: string;
}

interface Action {
  type: string;
  payload?: any;
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(
  undefined,
);

const initialState: State = {
  timeLeft: 25 * 60,
  isRunning: false,
  currentSession: "work",
  completedSessions: 0,
  closeModal: false,
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  selectFonts: 0,
  getFonts: "font-kumbh",
  selectColor: 0,
  getColor: "#F87070",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "START":
      return { ...state, isRunning: true };
    case "PAUSE":
      return { ...state, isRunning: false };
    case "TICK":
      return { ...state, timeLeft: Math.max(0, state.timeLeft - 1) };
    case "SET_SESSION":
      return {
        ...state,
        currentSession: action.payload.currentSession,
        timeLeft: action.payload.timeLeft,
        completedSessions:
          action.payload.completedSessions ?? state.completedSessions,
      };

    case "INCREMENT_COMPLETED_SESSIONS":
      return { ...state, completedSessions: state.completedSessions + 1 };

    case "TOGGLE_MODAL":
      return { ...state, closeModal: !state.closeModal };
    case "SET_POMODORO":
      return {
        ...state,
        pomodoro: action.payload,
        timeLeft:
          state.currentSession === "work " ? action.payload : state.timeLeft,
      };
    case "SET_SHORT_BREAK":
      return {
        ...state,
        shortBreak: action.payload,

        timeLeft:
          state.currentSession === "shortbreak"
            ? action.payload
            : state.shortBreak,
      };
    case "SET_LONG_BREAK":
      return {
        ...state,
        longBreak: action.payload,

        timeLeft:
          state.currentSession === "longbreak"
            ? action.payload
            : state.longBreak,
      };
    case "SET_SELECT_FONTS":
      return { ...state, selectFonts: action.payload };
    case "GET_FONTS":
      return {
        ...state,
        getFonts: action.payload,
      };

    case "SET_SELECT_COLOR":
      return {
        ...state,
        selectColor: action.payload,
      };

    case "GET_COLOR":
      return {
        ...state,
        getColor: action.payload,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
};

// PomodoroProvider
const PomodoroProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    timeLeft,
    isRunning,
    completedSessions,
    currentSession,
    closeModal,
    pomodoro,
    shortBreak,
    longBreak,
    selectFonts,
    getFonts,
    selectColor,
    getColor,
  } = state;

  return (
    <PomodoroContext.Provider
      value={{
        dispatch,
        timeLeft,
        isRunning,
        completedSessions,
        currentSession,
        closeModal,
        pomodoro,
        shortBreak,
        longBreak,
        selectFonts,
        getFonts,
        selectColor,
        getColor,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

// Custom hook for using Pomodoro context
const usePomodoro = (): PomodoroContextType => {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error("usePomodoro must be used within a PomodoroProvider");
  }
  return context;
};

export { PomodoroProvider, usePomodoro };
