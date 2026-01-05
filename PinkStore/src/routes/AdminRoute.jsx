import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  // sementara hardcode
  const isAdmin = true;

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;
