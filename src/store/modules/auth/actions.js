import {
  FIREBASE_AUTH_LOGIN_URL,
  FIREBASE_AUTH_SIGNUP_URL,
} from '../../../constants';

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },

  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },

  async auth(context, payload) {
    const url =
      payload.mode === 'signup'
        ? FIREBASE_AUTH_SIGNUP_URL
        : FIREBASE_AUTH_LOGIN_URL;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to authenticate');
      throw error;
    }

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);

    context.commit('setUser', {
      token: responseData.idToken,
      tokenExpiration: responseData.expiresIn,
      userId: responseData.localId,
    });
  },

  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      context.commit('setUser', {
        userId: userId,
        token: token,
        tokenExpiration: null,
      });
    }
  },

  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    context.commit('setUser', {
      userId: null,
      token: null,
      tokenExpiration: null,
    });
  },
};
