// 获取当前系统home目录
// const homedir = require('os').homedir()
// 获取当前系统home环境变量
// const home = process.env.HOME || homedir
// const fs = require('fs')
//拼路径
// const p = require('path')
// const dbPath = p.join(home, '.todo')

const db = require('./db.js')
module.exports.add = async (title) => {
  // 读取本地任务
  const list = await db.read()
  // 添加任务
  list.push({ title, done: false })
  //存储任务到文件
  await db.write(list)
}







  // fs.readFile(dbPath, { flag: 'a+' }, (error, data) => {
  //   if (error) return console.log(error)
  //   let list
  //   try {
  //     list = JSON.parse(data.toString())
  //   } catch (error2) {
  //     list = []
  //   }
  //   console.log(list)
  //   const task = {
  //     title: title,
  //     done: false
  //   }
  //   list.push(task)
  //   const string = JSON.stringify(list)
  //   fs.writeFile(dbPath, string + '\n', (error3) => {
  //     if (error3) {
  //       console.log(error3)
  //     }
  //   })
  // })