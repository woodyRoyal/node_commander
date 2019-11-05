// 获取当前系统home目录
const homedir = require('os').homedir()
// 获取当前系统home环境变量
const home = process.env.HOME || homedir
const fs = require('fs')
//拼路径
const p = require('path')
const dbPath = p.join(home, '.todo')
module.exports.add = (title) => {
  // 读取本地任务 
  fs.readFile(dbPath, { flag: 'a+' }, (error, data) => {
    if (error) return console.log(error)
    let list
    try {
      list = JSON.parse(data.toString())
    } catch (error2) {
      list = []
    }
    console.log(list)
    const task = {
      title: title,
      done: false
    }
    list.push(task)
    const string = JSON.stringify(list)
    fs.writeFile(dbPath, string + '\n', (error3) => {
      if (error3) {
        console.log(error3)
      }
    })
  })
  // 添加任务
  //存储任务到文件
}