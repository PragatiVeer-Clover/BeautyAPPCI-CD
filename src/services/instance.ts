import ky from 'ky';

const prefixUrl = `${process.env.API_URL ?? 'http://192.168.22.107:3000'}/`;

export const instance = ky.extend({
  headers: {
    Accept: 'application/json',
    'User-Agent': '*',
  },
  prefixUrl,
});
