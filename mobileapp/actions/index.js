import {
  UPDATE_REGION,
  UPDATE_REPORTS,
  UPDATE_SOCKET,
  START_REPORT,
  CONFIRM_REPORT,
  UPDATE_USER
} from "./actionTypes";

import axios from "axios";

export const updateRegion = region => ({
  type: UPDATE_REGION,
  payload: region
});

export const updateReports = reports => ({
  type: UPDATE_REPORTS,
  payload: reports
});

export const updateSocket = socket => ({
  type: UPDATE_SOCKET,
  payload: socket
});

export const updateBottomState = action => ({
  type: action
});
export const confirmReport = payload => ({
  type: CONFIRM_REPORT,
  payload
});

export const updateUser = user => ({
  type: UPDATE_USER,
  payload: user
});

export function report(
  latitude,
  longitude,
  socket,
  category,
  subcategory,
  extra
) {
  return dispatch => {
    let newReport = {
      userID: "admin",
      latitude: latitude,
      longitude: longitude,
      description: subcategory,
      category: category,
      confirmations: 1,
      extra: extra
    };
    socket.emit("newReport", newReport);
  };
}
