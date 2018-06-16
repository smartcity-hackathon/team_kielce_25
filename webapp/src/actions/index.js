import {
  INIT_SOCKET,
  UPDATE_REPORTS,
  SHOW_REPORT_MODAL,
  HIDE_REPORT_MODAL
} from "./actionTypes";

export const initSocket = socket => {
  return {
    type: INIT_SOCKET,
    payload: socket
  };
};

export const updateReports = reports => {
  return {
    type: UPDATE_REPORTS,
    payload: reports
  };
};

export const showReportModal = () => {
  return {
    type: SHOW_REPORT_MODAL
  };
};

export const closeReportModal = () => {
  return {
    type: HIDE_REPORT_MODAL
  };
};
