// /* eslint-env jest */
const path = require('path')
const dockerCompose = require('docker-compose')
const { execSync } = require ('child_process')

module.exports = async () => {
  try {
  await dockerCompose.upAll({
    cwd: path.join(__dirname),
    log: true,
  })


  await dockerCompose.exec(
    'pg_p1_plus_tests',
    ['sh', '-c', 'until pg_isready ; do sleep 1; done'],
    {
      cwd: path.join(__dirname),
    },
  )
    try {
      execSync('npm run test:db:init')
    } catch (e) {
      console.log('======= Jest setup error =========')
      console.log(JSON.stringify(e))
      throw e
    }
  } catch(err) {
    console.log(err)
    throw new Error('TESt')
  }
}
