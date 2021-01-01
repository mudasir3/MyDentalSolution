import actions from "./actions";

const initialState = {
  userId: ''
}
log = (msg) => {
  console.log('user_reducer', msg)
}
export default function userReducer(state = initialState, action) {

  this.log(action)
  switch (action.type) {
    case actions.SAVE_ID :
      return {
        userId: action.userId
      };
    case "DECREMENT" :
      return state;
    default:
      return state;
  }

}
