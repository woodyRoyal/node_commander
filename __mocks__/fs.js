// __mocks__/fs.js
'use strict';
const fs = jest.genMockFromModule('fs');
const _fs = jest.requireActual('fs')
// 合并真实fs模块
Object.assign(fs, _fs);
let readMocks = {}
fs.setReadMock = (path, error, data) => {
  readMocks[path] = [error, data]
}
fs.readFile = (path, Option, callback) => {
  if (callback === undefined) {
    callback = Option
  }
  if (path in readMocks) {
    callback(readMocks[path][0], readMocks[path][1])
    // callback(...readMocks[path])
  } else {
    _fs.readFile(path, Option, callback)
  }
}

// 重写写的文件操作
let WriteMocks = {}
fs.setWriteMocks = (path, fn) => {
  WriteMocks[path] = fn
}
fs.writeFile = (path, data, option, callback) => {
  if (callback === undefined) {
    callback = Option
  }
  if (path in WriteMocks) {
    WriteMocks[path](path, data, option, callback)
    // callback(...WriteMocks[path])
  } else {
    _fs.writeFile(path, data, option, callback)
  }
}

fs.clearMocks = () => {
  readMocks = {}
  WriteMocks = {}
}
module.exports = fs;