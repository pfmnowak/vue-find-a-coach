import { FIREBASE_DB_URL } from '../../../constants';

export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };
    const response = await fetch(
      `${FIREBASE_DB_URL}requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to send request!'
      );
      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const response = await fetch(
      `${FIREBASE_DB_URL}requests/${coachId}.json?auth=${token}`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch request!'
      );
      throw error;
    }

    const requests = Object.entries(responseData).map(([key, requestValue]) => {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: requestValue.userEmail,
        message: requestValue.message,
      };

      return request;
    });

    context.commit('setRequests', requests);
  },
};
