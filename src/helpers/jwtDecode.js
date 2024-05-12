import jwtDecode from 'jwt-decode';

export function decodeJWT(token) {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error('Error decoding JWT:', error.message);
    return null;
  }
}