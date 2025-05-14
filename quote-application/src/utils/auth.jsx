
export function saveToken(token) {
    localStorage.setItem("token", token);
  }
  
  export function getToken() {
    return localStorage.getItem("token");
  }
  
  export function logout() {
    localStorage.removeItem("token");
  }
  
  export function isLoggedIn() {
    return !!getToken();
  }


  export function saveUser(user) {
    localStorage.setItem("user", JSON.stringify(user)); // Save user object including userId
  }
  
  export function getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  
  export function getUserId() {
    const user = getUser();
    return user ? user.id : null;
  }
  