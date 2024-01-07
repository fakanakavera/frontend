const checkIsAuthenticated = () => {
    const token = localStorage.getItem('access_token');
    console.log(token)
    return !!token; // returns true if token exists, false otherwise
  };

export default checkIsAuthenticated;