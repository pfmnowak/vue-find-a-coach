import {
  FIREBASE_AUTH_LOGIN_URL,
  FIREBASE_AUTH_SIGNUP_URL,
} from '../../../constants';

export default {
  async login(context, payload) {
    const response = await fetch(FIREBASE_AUTH_LOGIN_URL, {
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

    context.commit('setUser', {
      token: responseData.idToken,
      tokenExpiration: responseData.expiresIn,
      userId: responseData.localId,
    });
  },

  async signup(context, payload) {
    const response = await fetch(FIREBASE_AUTH_SIGNUP_URL, {
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

    context.commit('setUser', {
      token: responseData.idToken,
      tokenExpiration: responseData.expiresIn,
      userId: responseData.localId,
    });
  },

  logout(context) {
    context.commit('setUser', {
      userId: null,
      token: null,
      tokenExpiration: null,
    });
  },
};
