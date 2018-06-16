import {
  START_REPORT,
  REPORT_INFORMACJA,
  REPORT_USTERKA,
  REPORT_NIEBEZPIECZENSTWO,
  DELETE_REPORT,
  CONFIRM_REPORT
} from "../../actions/actionTypes";
const initState = {
  level: 0,
  bottomText: "",
  buttons: [],
  modalVisible: false,
  height: 56,
  buttonSize: 64,
  category: "",
  subcategory: ""
};
const uiReducer = (state = initState, action) => {
  switch (action.type) {
    case DELETE_REPORT: {
      return initState;
    }
    case START_REPORT: {
      return {
        ...state,
        bottomText: "Wybierz rodzaj zdarzenia",
        level: 1,
        height: 175,
        buttonSize: 0,
        buttons: [
          {
            text: "Zagrozenie",
            color: "#E53935",
            icon: "warning",
            payload: REPORT_NIEBEZPIECZENSTWO
          },
          {
            text: "Usterka",
            color: "#FDD835",
            icon: "wrench",
            payload: REPORT_USTERKA
          },
          {
            text: "Informacja",
            color: "#039BE5",
            icon: "lightbulb-o",
            payload: REPORT_INFORMACJA
          }
        ]
      };
    }
    case CONFIRM_REPORT: {
      return {
        ...state,
        level: 3,
        height: 500,
        buttons: [],
        bottomText: "Potwierdz zgloszenie",
        category: action.payload.category,
        subcategory: action.payload.subcategory
      };
    }
    case REPORT_NIEBEZPIECZENSTWO: {
      return {
        ...state,
        bottomText: "O czym chcesz ostrzec?",
        level: 2,
        height: 175,
        buttons: [
          {
            text: "Wypadek",
            color: "#E53935",
            icon: "car",
            payload: {
              category: REPORT_NIEBEZPIECZENSTWO,
              subcategory: "Wypadek"
            }
          },
          {
            text: "Przemoc",
            color: "#E53935",
            icon: "hand-rock-o",
            payload: {
              category: REPORT_NIEBEZPIECZENSTWO,
              subcategory: "Przemoc"
            }
          },
          {
            text: "Awaria",
            color: "#E53935",
            icon: "flash",
            payload: {
              category: REPORT_NIEBEZPIECZENSTWO,
              subcategory: "Awaria"
            }
          }
        ]
      };
    }
    case REPORT_USTERKA: {
      return {
        ...state,
        bottomText: "Jaka usterke chcesz zglosic?",
        level: 2,
        height: 175,
        buttons: [
          {
            text: "Infrastruktura",
            color: "#FDD835",
            icon: "road",
            payload: { category: REPORT_USTERKA, subcategory: "Infrastruktura" }
          },
          {
            text: "Usługi",
            color: "#FDD835",
            icon: "wrench",
            payload: { category: REPORT_USTERKA, subcategory: "Usługi" }
          },
          {
            text: "Inne",
            color: "#FDD835",
            icon: "question",
            payload: { category: REPORT_USTERKA, subcategory: "Inne" }
          }
        ]
      };
    }
    case REPORT_INFORMACJA: {
      return {
        ...state,
        bottomText: "Jaka usterke chcesz zglosic?",
        level: 2,
        height: 175,
        buttons: [
          {
            text: "Event",
            color: "#039BE5",
            icon: "calendar",
            payload: { category: REPORT_INFORMACJA, subcategory: "Event" }
          },
          {
            text: "Inne",
            color: "#039BE5",
            icon: "question",
            payload: { category: REPORT_INFORMACJA, subcategory: "Inne" }
          },
          {
            text: "Inne2",
            color: "#039BE5",
            icon: "question",
            payload: { category: REPORT_INFORMACJA, subcategory: "Inne2" }
          }
        ]
      };
    }

    default: {
      return state;
    }
  }
};
export default uiReducer;
