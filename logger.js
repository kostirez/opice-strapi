const pino = require('pino');



module.exports = pino({
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    target: "@logtail/pino",
    options: { sourceToken: process.env.BETTER_STACK_TOKEN },
  },
});
