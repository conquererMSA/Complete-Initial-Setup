import { createLogger, transports, format } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
const { combine, timestamp, printf, label } = format
import path from 'path'

//coustomize log format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${date.toDateString()} ${hours}:${minutes}: ${seconds}} [${label}] ${level}: ${message}`
})

const successLogger = createLogger({
  level: 'info', //0. error, 1. warn and 3. info
  format: combine(label({ label: 'WAIS App' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'success',
        '%DATE%-WAIS-success.log',
      ),
      datePattern: 'HH-DD-MM-YYYY',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '4d',
    }),
  ],
})
const errorLogger = createLogger({
  level: 'error', //0. error
  format: combine(label({ label: 'WAIS App' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'error',
        '%DATE%-WAIS-error.log',
      ),
      datePattern: 'HH-DD-MM-YYYY',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '4d',
    }),
  ],
})
export { successLogger, errorLogger }
