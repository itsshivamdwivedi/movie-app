import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import PropTypes from "prop-types";

// Importing useAuth and making simple if user 
// if user is available give access to children
const Protected = ({ children }) => {
  const { user,isLoading } = useAuth();

  if(isLoading){
    return null;
  }
  return (
      <>
      {user ? children : <Navigate to={'/'} />}
      </>
   
  );
};

// navigate is a react router which is use to navigate 
export default Protected;

Protected.propTypes = {
  children: PropTypes.node.isRequired,
};
