import { useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';


const Logout = ({ history}) => {
  const dispatch = useDispatch();

  dispatch(logout());
  history.push("/");

  return null;
}


export default Logout;