import {Navigate, Outlet} from "react-router-dom" 
import { State } from "../../context/AuthProvider"


const AdminProtectedRoute=()=>{
    
  const {user}=State()

  return(
      user.is_admin?
          <Outlet />
      :
          <Navigate to="/student" replace />
  )
}
export default AdminProtectedRoute
