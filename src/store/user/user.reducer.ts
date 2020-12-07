import { SET_USER } from './user.actions'
const initialState = {
  user: null,
}

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER:
      const user = {
        email: action?.user?.email,
        displayName: action?.user?.displayName,
        uid: action?.user?.uid,
      }
      return { ...state, user }
  }
  return state
}
