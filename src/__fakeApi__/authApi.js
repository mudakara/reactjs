import createResourceId from '../utils/createResourceId';
import { sign, decode, JWT_SECRET, JWT_EXPIRES_IN } from '../utils/jwt';
import wait from '../utils/wait';

const users = [
  {
    id: '1',
    avatar: '/static/mock-images/avatars/avatar-carson_darrin.png',
    email: 'retailer@demo.com',
    name: 'Retailer',
    password: 'password',
    plan: 'Premium'
  },
  {
    id: '2',
    avatar: '/static/mock-images/avatars/avatar-nasimiyu_danai.png',
    email: 'distributor@demo.com',
    name: 'Distributor',
    password: 'password',
    plan: 'Premium'
  },
  {
    id: '3',
    avatar: '/static/mock-images/avatars/avatar-jie_yan_song.png',
    email: 'supplier@demo.com',
    name: 'Supplier',
    password: 'password',
    plan: 'Premium'
  },
  {
    id: '4',
    avatar: '/static/mock-images/avatars/avatar-alcides_antonio.png',
    email: 'admin@demo.com',
    name: 'Admin',
    password: 'password',
    plan: 'Premium'
  }
];

class AuthApi {
  async login({ email, password }) {
    await wait(500);

    return new Promise((resolve, reject) => {
      try {
        // Find the user
        const user = users.find((_user) => _user.email === email);

        if (!user || (user.password !== password)) {
          reject(new Error('Please check your email and password'));
          return;
        }

        // Create the access token
        const accessToken = sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        resolve(accessToken);
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  async register({ email, name, password }) {
    await wait(1000);

    return new Promise((resolve, reject) => {
      try {
        // Check if a user already exists
        let user = users.find((_user) => _user.email === email);

        if (user) {
          reject(new Error('User already exists'));
          return;
        }

        user = {
          id: createResourceId(),
          avatar: null,
          email,
          name,
          password,
          plan: 'Standard'
        };

        users.push(user);

        const accessToken = sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        resolve(accessToken);
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  me(accessToken) {
    return new Promise((resolve, reject) => {
      try {
        // Decode access token
        const { userId } = decode(accessToken);

        // Find the user
        const user = users.find((_user) => _user.id === userId);

        if (!user) {
          reject(new Error('Invalid authorization token'));
          return;
        }

        resolve({
          id: user.id,
          avatar: user.avatar,
          email: user.email,
          name: user.name,
          plan: user.plan
        });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const authApi = new AuthApi();
