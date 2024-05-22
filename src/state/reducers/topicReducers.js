import { TopicActionTypes } from "../actions/topicActions";






const initialState = {
  topic:{},
  topics: [],
  parentTopic:[],
};

const topicReducers = (state = initialState, action) => {
  switch (action.type) {
    case TopicActionTypes.SET_TOPIC:
        return {
          ...state,
          topic: action.payload,
        };
        case TopicActionTypes.CLEAR_TOPIC:
          return {
            ...state,
            topic: {},
          };
    case TopicActionTypes.LIST_TOPIC:
        return {
          ...state,
          topics: action.payload,
        };
    case TopicActionTypes.LIST_PARENT_TOPIC:
        return {
          ...state,
          parentTopic: action.payload,
        };
    case TopicActionTypes.ADD_TOPIC:
      return {
        ...state,
        topics: [...state.topics, action.payload],
      };
    case TopicActionTypes.UPDATE_TOPIC:
      const updatedCategories = state.topics.map(topic =>
        topic.id === action.payload.id ? action.payload : topic
      );
      return {
        ...state,
        topics: updatedCategories,
      };
      case TopicActionTypes.DELETE_TOPIC:
        return{
            ...state,
            topics : state.topics.filter(cat=> cat.id !== parseInt(action.payload)),
         };
         case TopicActionTypes.DELETE_TOPICS:
          return {
            ...state,
            topics: state.topics.filter(cat => !action.payload.includes(cat.id)),
          };
          case TopicActionTypes.UPDATE_STATUS_TOPIC:
            const userIdToUpdate = action.payload;
      
            // Tìm người dùng trong danh sách users
            const updatedUsers = state.topics.map((user) =>
              user.id === userIdToUpdate
                ? { ...user, status: user.status==1?0:1 } // Đảo ngược trạng thái emailConfirmed
                : user
            );
            return {
              ...state,
              topics: updatedUsers,
            };
    default:
      return state;
  }
};

export default topicReducers;
