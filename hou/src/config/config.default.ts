import { MidwayConfig } from '@midwayjs/core';
import { uploadWhiteList } from '@midwayjs/upload';
import { tmpdir } from 'os';
import * as path from 'path';

// const tmdir = path.join(path.tmdir(), 'midway-upload-files');

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1722860555126_2110',
  koa: {
    port: 7001,
  },
  cors: {
    origin:'*',
  },
  uoload: {
    mode: 'file',
    fileSize: '10mb',
    whitelist:uploadWhiteList.filter(ext => ext !== '.pdf'),
    tmpdir: path.join(tmpdir(), 'midway-upload-files'),
    cleanTimeout: 5 * 60 * 1000,
    base64: false,
    match: /\/upload/,
  },
} as MidwayConfig;
