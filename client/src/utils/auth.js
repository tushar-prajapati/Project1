// src/utils/auth.js

const checkAccessToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiration = payload.exp * 1000; // Convert to milliseconds
      return expiration > Date.now(); // Check if token has expired
    } catch (error) {
      return false; // In case of an error, the token is invalid
    }
  };
  
  export default checkAccessToken;
  