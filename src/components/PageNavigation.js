
const fs = require('fs')


/**
 * Class used to generate the page navigation configuration object
 * @type {[type]}
 */
export default class PageNavigation{
  constructor(config) {
    this.config = config
  }

  /**
   * generates the navigation files for all pages
   * @return {String} directory path to the project root
   */
  install( ){

    // do no install the page navigation when the data is not available
    if( this.config.application === undefined ) return
    if( this.config.application.pages === undefined ) return
    if( this.config.application.pages.enable !== true ) return

    // generates the page navigation file
    this.config.application.pages.names.forEach( page => this.generate(page) )

  }

  /**
   * Returns the string used to generate the page navigation
   * @return {String} project string
   */
  generate(pageName){

    var jsString = ''
    jsString = jsString + `import Example from './views/Example'\n\n`

    const configString = `
var config = {
  Components:[
    {
      menu: 'Application',
      name: '${pageName}',
      path: '/${pageName}',
      component: Example,
      auth: 'public',
      show: true,
    }
  ],
  restapi:{
    host: {},
    url: {}
  }
}
    `

    jsString = jsString + configString + '\n\n'
    jsString = jsString + `export default config;`

    this.store( jsString, pageName)
  }



  /**
   * stores the project js string to the project src directory
   * @return {None}
   */
  store(jsString, pageName){

    fs.writeFile(
      this.config.root + `/src/application/${pageName}/navigation.js`,
      jsString,
      (err) => {
      if (err) console.log('cannot write file', err);
    });

  }


}
