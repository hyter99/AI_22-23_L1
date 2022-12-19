import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";

// **Add other imports and bind them to action creators - when it enlarges**
import {
  userActionCreators
} from "../redux";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(Object.assign({},
    userActionCreators
  ), dispatch);
}