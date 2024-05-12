export const SliderActionTypes = {
  LIST_SLIDER: 'LIST_SLIDER',
  SLIDER: 'SLIDER',
  SET_SLIDER: 'SET_SLIDER',
  CLEAR_SLIDER: 'CLEAR_SLIDER',
  ADD_SLIDER: 'ADD_SLIDER',
  UPDATE_STATUS_SLIDER:'UPDATE_STATUS_SLIDER',

  UPDATE_SLIDER: 'UPDATE_SLIDER',
  DELETE_SLIDER: 'DELETE_SLIDER',
  DELETE_SLIDERS: 'DELETE_SLIDERS',
};

export const sliderActions = {
  listSlider: (items) => ({
    type: SliderActionTypes.LIST_SLIDER,
    payload: items,
  }),

  setSlider: (item) => ({
    type: SliderActionTypes.SET_SLIDER,
    payload: item,
  }),

  clearSlider: () => ({
    type: SliderActionTypes.CLEAR_SLIDER,
  }),

  addSlider: (item) => ({
    type: SliderActionTypes.ADD_SLIDER,
    payload: item,
  }),

  updateSlider: (item) => ({
    type: SliderActionTypes.UPDATE_SLIDER,
    payload: item,
  }),
  updateStatus: (item) => ({
    type: SliderActionTypes.UPDATE_STATUS_SLIDER,
    payload:item,
  }),
  deleteSlider: (slider) => ({
    type: SliderActionTypes.DELETE_SLIDER,
    payload: slider,
  }),

  deleteSliders: (ids) => ({
    type: SliderActionTypes.DELETE_SLIDERS,
    payload: ids,
  }),
};
