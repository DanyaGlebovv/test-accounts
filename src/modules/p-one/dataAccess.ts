import config from '@ebdp1/config-lib';
import axios from 'axios';

const partneringOneUrl = config.get('');

export const getPOneUser = (jwt: string) =>
  axios.get(`${partneringOneUrl}/me`, {
    headers: {
      authorization: jwt,
    },
  });

export const getPOneUserEvents = (jwt: string) =>
  axios.get(`${partneringOneUrl}/my-events`, {
    headers: {
      authorization: jwt,
    },
  });
