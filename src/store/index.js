import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  User: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, User: action.payload }
    default:
      return state;

  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store