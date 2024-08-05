import { FIREBASE_DB_URL } from '../../../constants';

export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;

    const coachData = {
      // id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      areas: data.areas,
      description: data.desc,
      hourlyRate: data.rate,
    };

    const response = await fetch(`${FIREBASE_DB_URL}coaches/${userId}.json`, {
      method: 'PUT',
      body: JSON.stringify(coachData),
    });

    // const responseData = await response.json();

    if (!response.ok) {
      // error...
    }

    context.commit('registerCoach', { ...coachData, id: userId });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(`${FIREBASE_DB_URL}coaches.json`);
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const coaches = Object.entries(responseData).map(([id, coach]) => {
      const coachData = {
        id: id,
        ...coach,
      };
      return coachData;
    });

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp', coaches);
  },
};
