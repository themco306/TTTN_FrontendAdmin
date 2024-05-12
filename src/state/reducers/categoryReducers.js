import { CategoryActionTypes } from "../actions/categoryActions";





const initialState = {
  category:{},
  categories: [],
  parentCate:[],
};

const categoryReducers = (state = initialState, action) => {
  switch (action.type) {
    case CategoryActionTypes.SET_CATEGORY:
        return {
          ...state,
          category: action.payload,
        };
        case CategoryActionTypes.CLEAR_CATEGORY:
          return {
            ...state,
            category: {},
          };
    case CategoryActionTypes.LIST_CATEGORY:
        return {
          ...state,
          categories: action.payload,
        };
    case CategoryActionTypes.LIST_PARENT_CATEGORY:
        return {
          ...state,
          parentCate: action.payload,
        };
    case CategoryActionTypes.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case CategoryActionTypes.UPDATE_CATEGORY:
      const updatedCategories = state.categories.map(category =>
        category.id === action.payload.id ? action.payload : category
      );
      return {
        ...state,
        categories: updatedCategories,
      };
      case CategoryActionTypes.DELETE_CATEGORY:
        return{
            ...state,
            categories : state.categories.filter(cat=> cat.id !== parseInt(action.payload)),
         };
         case CategoryActionTypes.DELETE_CATEGORIES:
          return {
            ...state,
            categories: state.categories.filter(cat => !action.payload.includes(cat.id)),
          };
        
    default:
      return state;
  }
};

export default categoryReducers;
