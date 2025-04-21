// grpcHandlers.js
import { authClient } from 'authClient';
import { RegisterRequest } from '../../proto/sso_pb';

async function registerUser(email, password) {
  const request = new RegisterRequest();
  request.setEmail(email);
  request.setPassword(password);

  return new Promise((resolve, reject) => {
    authClient.register(request, {}, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

// В компоненте React Native
registerUser('test@example.com', 'password123')
  .then(response => {
    console.log('User registered, ID:', response.getUserId());
  })
  .catch(error => {
    console.error('Error registering:', error);
  });
