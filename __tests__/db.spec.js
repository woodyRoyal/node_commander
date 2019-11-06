const db = require('../db')
const fs = require('fs')
jest.mock('fs')
describe('db', () => {
  afterEach(() => {
    fs.clearMocks()
  })
  it('can read', async () => {
    const data = [{ title: 'test', done: true }]
    fs.setReadMock('/xxx', null, JSON.stringify(data))
    const list = await db.read('/xxx')
    expect(list).toStrictEqual(data)
  })
  it('can write', async () => {
    let fakeFile
    fs.setWriteMocks('/yyy', (path, data, callback) => { fakeFile = data; callback(null) })
    const list = [{ title: '吃包子', done: false }]
    await db.write(list, '/yyy')
    expect(fakeFile).toBe(JSON.stringify(list) + '\n')
  })
})