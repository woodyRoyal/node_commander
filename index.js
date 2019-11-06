// 获取当前系统home目录
// const homedir = require('os').homedir()
// 获取当前系统home环境变量
// const home = process.env.HOME || homedir
// const fs = require('fs')
//拼路径
// const p = require('path')
// const dbPath = p.join(home, '.todo')
const inquirer = require('inquirer');
const db = require('./db.js')
module.exports.add = async (title) => {
  // 读取本地任务
  const list = await db.read()
  // 添加任务
  list.push({ title, done: false })
  //存储任务到文件
  await db.write(list)
}


module.exports.clear = async (title) => {
  const list = await db.read()
  list.push({ title, done: false })
  //清空
  await db.write([])
}


module.exports.showAll = async () => {
  const list = await db.read()
  // list.forEach((element, index) => {
  //   console.log(`${element.done ? '[√]' : '[x]'} ${index + 1} - ${element.title}`)
  // })

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'index',
        message: 'What size do you need?',
        choices: [{ name: '退出', value: '-1' }, ...list.map((element, index) => {
          return { name: `${element.done ? '[√]' : '[x]'} ${index + 1} - ${element.title}`, value: index.toString() }
        }), { name: '+ 新建任务', value: '-2' }]
      }
    ])
    .then(answers => {
      const index = parseInt(answers.index)
      if (index >= 0) {
        inquirer.prompt([{
          type: 'list',
          name: 'action',
          message: '请选择操作',
          choices: [
            { name: '退出', value: 'quit' },
            { name: '已完成', value: 'markAsDone' },
            { name: '未完成', value: 'markAsUnDone' },
            { name: '改标题', value: 'updateTitle' },
            { name: '删除', value: 'remove' },
          ]
        }]).then(answers2 => {
          switch (answers2.action) {
            case 'quit':
              break
            case 'markAsDone':
              list[index].done = true
              db.write(list)
              break
            case 'markAsUnDone':
              list[index].done = false
              db.write(list)
              break
            case 'updateTitle':
              inquirer.prompt({
                type: 'input',
                name: 'title',
                message: '请填写新的标题',
                default: list[index].title
              }).then((data) => {
                list[index].title = data.title
                db.write(list)
              })
              break
            case 'remove':
              list.splice(index, 1)
              db.write(list)
              break
          }
        })
      } else if (index === -2) {
        //新建任务
        inquirer.prompt({
          type: 'input',
          name: 'title',
          message: '请输入新的任务标题',
        }).then((data) => {
          list.push({
            title: data.title,
            done: false
          })
          db.write(list)
        })
      }
    });


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