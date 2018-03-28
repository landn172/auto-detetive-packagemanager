import path from 'path'
import fs from 'fs'

const checklist = [
  {
    pm: 'yarn',
    check: checkYarnInstallFeature
  },
  {
    pm: 'cnpm',
    check: checkCnpmInstallFeature
  }
]

export default async function(dir) {
  // check directory not null
  if (dir) {
    let index = 0
    const len = checklist.length
    while (index < len) {
      const { pm, check } = checklist[index]
      const isExist = await check(dir)
      if (isExist) return pm
      index++
    }
  }
  // default
  return 'npm'
}

async function checkYarnInstallFeature(dir) {
  // node_modules contains .yarn-integrity
  // https://github.com/yarnpkg/yarn/blob/eab88b8268f15851b817fafe554b653a301a6747/src/constants.js#L84:35
  return existFile(path.resolve(dir, 'node_modules/.yarn-integrity'))
}

async function checkCnpmInstallFeature(dir) {
  // node_modules contains .npminstall.done
  // https://github.com/cnpm/npminstall/blob/68164eac6ea31b61ce683ea5aa23f4c47e9d584e/lib/download/npm.js#L138
  return existFile(path.resolve(dir, 'node_modules/.npminstall.done'))
}

function existFile(filePath) {
  return fs.existsSync(filePath)
}
