
// retrieves data from the browser cache
export function getBrowserCache( key ){
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(key)) || {};
    } catch (e) {
      /*Ignore*/
      console.log( 'Load Layout: throw an error')
    }
  }

  return ls
}


// pushes content into the browser cache. This makes it possible
// to persist information across sessions such as storing user names
export function setBrowserCache( key, object ){

  if (global.localStorage) {
    global.localStorage.setItem( key, JSON.stringify(object) );
  }
}








export function getUserProfile( key ){
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(key)) || {};
    } catch (e) {
      /*Ignore*/
      console.log( 'Load Layout: throw an error')
    }
  }

  return ls
}

export function setUserProfile( key, object ){

  if (global.localStorage) {
    global.localStorage.setItem( key, JSON.stringify(object) );
  }
}
