

export const TopicActionTypes = {
  LIST_TOPIC: 'LIST_TOPIC',
  LIST_PARENT_TOPIC: 'LIST_PARENT_TOPIC',
  TOPIC: 'TOPIC',
  SET_TOPIC: 'SET_TOPIC',
  CLEAR_TOPIC: 'CLEAR_TOPIC',
  ADD_TOPIC: 'ADD_TOPIC',
  UPDATE_TOPIC: 'UPDATE_TOPIC',
  UPDATE_STATUS_TOPIC:'UPDATE_STATUS_TOPIC',
  DELETE_TOPIC: 'DELETE_TOPIC',
  DELETE_TOPICS: 'DELETE_TOPICS',
};

export const topicActions = {
  listTopic: (items) => ({
    type: TopicActionTypes.LIST_TOPIC,
    payload: items,
  }),

  listParentTopic: (items) => ({
    type: TopicActionTypes.LIST_PARENT_TOPIC,
    payload: items,
  }),

  setTopic: (item) => ({
    type: TopicActionTypes.SET_TOPIC,
    payload: item,
  }),

  clearTopic: () => ({
    type: TopicActionTypes.CLEAR_TOPIC,
  }),

  addTopic: (item) => ({
    type: TopicActionTypes.ADD_TOPIC,
    payload: item,
  }),
  updateStatusTopic: (item) => ({
    type: TopicActionTypes.UPDATE_STATUS_TOPIC,
    payload:item,
  }),
  updateTopic: (item) => ({
    type: TopicActionTypes.UPDATE_TOPIC,
    payload: item,
  }),

  deleteTopic: (category) => ({
    type: TopicActionTypes.DELETE_TOPIC,
    payload: category,
  }),

  deleteTopics: (ids) => ({
    type: TopicActionTypes.DELETE_TOPICS,
    payload: ids,
  }),
};
