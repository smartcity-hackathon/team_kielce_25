import {
  UPDATE_REGION,
  UPDATE_REPORTS,
  UPDATE_SOCKET,
  UPDATE_USER
} from "../../actions/actionTypes";

const initialState = {
  region: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05
  },
  error: null,
  reports: [],
  socket: null,
  user: {
    username: null,
    points: 0
  }
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_REGION: {
      return {
        ...state,
        region: action.payload
      };
    }

    case UPDATE_REPORTS: {
      return {
        ...state,
        reports: action.payload
      };
    }

    case UPDATE_SOCKET: {
      return {
        ...state,
        socket: action.payload
      };
    }

    case UPDATE_USER: {
      return {
        ...state,
        user: action.payload
      };
    }

    default: {
      return state;
    }
  }
};

export default appReducer;
