import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino/file',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
});

export default logger;
