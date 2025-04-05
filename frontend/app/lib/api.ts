import axios from 'axios';

// TODO: Replace this with your actual Firebase auth logic
// This function should return the Firebase ID token or throw an error if not authenticated.
async function getAuthToken(): Promise<string> {
  // Example: Replace with your auth context or Firebase auth state listener
  const token = localStorage.getItem('firebaseIdToken'); // Or wherever you store it
  if (!token) {
    throw new Error('User not authenticated');
  }
  return token;
}

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // Adjust if your API prefix is different
});

// Add a request interceptor to include the auth token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getAuthToken();
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.error('Authentication error:', error);
      // Handle auth error, maybe redirect to login or reject the promise
      // Depending on your error handling strategy, you might want to:
      // - throw error; // To stop the request
      // - return Promise.reject(error); // Another way to stop
      // - Or handle it silently and proceed without the token if applicable
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient; 