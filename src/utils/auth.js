// src/utils/auth.js

export const getToken = () => localStorage.getItem("token");
export const getUserRole = () => localStorage.getItem("role");


// export const isAuthenticated = () => !!getToken();

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("email");
};
// Log out
export const logoutUser = () => {
  localStorage.removeItem('user');
};

export const saveUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  // Get user
  export const getUser = () => {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  };
  
  // Check if logged in
  export const isAuthenticated = () => {
    return !!localStorage.getItem('user');
  };
  
