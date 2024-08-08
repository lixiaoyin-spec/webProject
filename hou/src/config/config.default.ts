import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1722860555126_2110',
  koa: {
    port: 7001,
  },
  cors: {
    origin:'*',
  },
} as MidwayConfig;
