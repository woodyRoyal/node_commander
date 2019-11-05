//拼路径
// 获取当前系统home目录
const homedir = require('os').homedir()
// 获取当前系统home环境变量
const home = process.env.HOME || homedir
const p = require('path')
const dbPath = p.join(home, '.todo')
const fs = require('fs')
const db = {
  read (path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: 'a+' }, (error, data) => {
        if (error) {
          reject(error)
        } else {
          let list
          try {
            list = JSON.parse(data.toString())
          } catch (error2) {
            list = []
          }
          resolve(list)
        }
      })
    })

  },
  write (list, path = dbPath) {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(list)
      fs.writeFile(path, string + '\n', (error3) => {
        if (error3) {
          reject(error3)
        } else {
          resolve()
        }
      })
    })

  },
}
module.exports = db