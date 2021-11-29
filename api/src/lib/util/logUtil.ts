import fs from 'fs'

export const logToLogFile = (message: string) => {
  fs.writeFile(
    'C:/email_logs.txt',
    `${Date.now().toString()}: ${message}\n`,
    { flag: 'a+' },
    (err) => {
      if (err) {
        console.error(err)
        return
      }
    }
  )
}
