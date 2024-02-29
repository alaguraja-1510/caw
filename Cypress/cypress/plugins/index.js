/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
//plugin file
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {

  let startTime = getUTC()

  function getUTC() {
    const now = new Date()
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
    // 2023-05-23T13:37:54.161Z
    return localISOTime
  }

  on('task', {
    beforeTest() {
      let splitStartTime = startTime.split('T')[1].split('Z')[0]
      console.log(`----------------------------------------------------------------------------------------\n`)
      console.log(`Start time ${splitStartTime}`)
      return null
    },
    afterTest() {
      let endTime = getUTC()
      let scriptEndTime = Date.parse(endTime)
      let scriptStartTime = Date.parse(startTime)
      let splitEndTime = endTime.split('T')[1].split('Z')[0]
      let sum = (scriptEndTime - scriptStartTime) / 1000
      console.log(`END TIME: === ${splitEndTime} `)
      console.log(`RUN TIME ${sum} sec`)
      console.log(`----------------------------------------------------------------------------------------\n`)
      return null
    }

  })
}