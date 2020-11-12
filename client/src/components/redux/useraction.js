import {USER_ADD} from './userconstants';

const getUser = (data) => async (dispatch) => {
    try {
    dispatch({ type: USER_ADD, payload: data });
  } catch (err) {
    console.error(err.message)
  }
};


export { getUser };