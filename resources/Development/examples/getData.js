
// retrieves data from the data repository. modularizing the data this way, makes
// it possible to easily offload the data to an external location to reduce the
// overall build size thus improving build and loading times
export default function getData( path ){
  return require('./data/' + path)
}
