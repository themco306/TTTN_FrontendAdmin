import { SliderActionTypes } from "../actions/sliderActions";

const initialState = {
  slider: {},
  sliders: [],
};

const sliderReducers = (state = initialState, action) => {
  switch (action.type) {
    case SliderActionTypes.SET_SLIDER:
      return {
        ...state,
        slider: action.payload,
      };
    case SliderActionTypes.CLEAR_SLIDER:
      return {
        ...state,
        slider: {},
      };
    case SliderActionTypes.LIST_SLIDER:
      return {
        ...state,
        sliders: action.payload,
      };
      case SliderActionTypes.ADD_SLIDER:
        return {
          ...state,
          sliders: [action.payload, ...state.sliders],
        };
      
    case SliderActionTypes.UPDATE_SLIDER:
      const updatedSliders = state.sliders.map(slider =>
        slider.id === action.payload.id ? action.payload : slider
      );
      return {
        ...state,
        sliders: updatedSliders,
      };
      case SliderActionTypes.UPDATE_STATUS_SLIDER:
        const idToUpdate = action.payload;
        const updated = state.sliders.map((i) =>
          i.id === idToUpdate
            ? { ...i, status: i.status==1?0:1 } 
            : i
        );
        return {
          ...state,
          sliders: updated,
        };
    case SliderActionTypes.DELETE_SLIDER:
      return {
        ...state,
        sliders: state.sliders.filter(slider => slider.id !== parseInt(action.payload)),
      };
    case SliderActionTypes.DELETE_SLIDERS:
      return {
        ...state,
        sliders: state.sliders.filter(slider => !action.payload.includes(slider.id)),
      };
    default:
      return state;
  }
};

export default sliderReducers;
