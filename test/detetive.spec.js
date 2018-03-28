import detetive from '../lib/detetive.js'
import path from 'path'

test('exists yarn', async () => {
  const pm = await detetive(path.resolve(__dirname, '../'))
  expect(pm).toBe('yarn')
})

test('empty project', async () => {
  const pm = await detetive(path.resolve(__dirname))
  expect(pm).toBe('npm')
})

test('exists cnpm', async () => {
  const pm = await detetive(path.resolve(__dirname, '../example'))
  expect(pm).toBe('cnpm')
})
