/**
 * Product Search
 * ===================
 *
 * Header component used to search for products based on
 * criteria such as fab, technology, factory, etc. This
 * makes it possible so the entire database does not need
 * to be searched when we desired a subset of products
 *
 * @author Nik Sumikawa
 * @date Sept 25, 2020
 */


import React, {useState} from "react";

import { Menu, Dropdown, Button } from 'semantic-ui-react'
import RestFramework from '../../Frameworks/RestApi'
import jsonArray from '../../jsonArray/jsonArray'


/**
 * creates a dropdown menu component
 * @param  {[type]} props [description]
 * @return {[type]}       [description]
 */
function DropdownWrapper( props ){

  var options = []
  for( var i=0; i < props.items.length; i++ ){
    options.push({
      key: props.items[i],
      text: props.items[i],
      value: props.items[i],
    })
  }

  return(
    <Dropdown
      style = {props.style}
      multiple
      onChange={props.onChange}
      placeholder={props.title}
      options={options}
    />
  )
}

/**
 * Set of dropdowns and a search button used to
 * selecting a subset of products
 * @param       {Function} props.fab_options  list of fabs to include in the dropdown
 * @param       {Function} props.tech_options list of technologies to include in the dropdown
 * @param       {Function} props.factory_options list of factories to include in the dropdown
 * @param       {Function} props.callback   callback function executed when the button is selected
 */
export function ProductSearchView( props ){

  // state variables to track selected items
  const [fab, setFab] = useState()
  const [tech, setTech] = useState()
  const [factory, setFactory] = useState()


  // set the onclick function and return the selected
  // options when an onclick function is provided
  var onClick
  if( props.onClick !== undefined ){
    onClick = () => props.onClick({
      fab: fab,
      tech: tech,
      factory: factory
    })
  }


  return (
    <Menu
      style={{width:'500px', padding:0, margin:0}}
      >

      <DropdownWrapper
        items = {props.fab_options}
        onChange = {(value, e) => setFab(e.value)}
        title = {'Fab'}
        />

      <DropdownWrapper
        items = {props.tech_options}
        onChange = {(value, e) => setTech(e.value)}
        title = {'Tech'}
        />

      <DropdownWrapper
        items = {props.factory_options}
        onChange = {(value, e) => setFactory(e.value)}
        title = {'Factory'}
        />


      <Menu.Menu position='right'>
        <Button
          style={{margin:0}}
          primary
          loading={props.loading === true}
          onClick={onClick}
          >
          Search
        </Button>
      </Menu.Menu>
    </Menu>
  )
}



/**
 * Renders the selection menu and queries the database
 * for the product information based on the selection.
 * The product information is returned in a callback
 * function
 * @param       {Function} props.fab_options  list of fabs to include in the dropdown
 * @param       {Function} props.tech_options list of technologies to include in the dropdown
 * @param       {Function} props.factory_options list of factories to include in the dropdown
 * @param       {Function} props.callback   callback function executed when the button is selected
 */
export default class ProductSearchComponent extends RestFramework {

  constructor(props) {
    super(props);
    this.state = {loading: false}
  }


  // routine executes when rerendering
  shouldComponentUpdate( nextProps, nextState ){

    if( this.state.selection !== nextState.selection ){
      // set the callback function when it is provided
      var callback
      if( this.props.callback !== undefined ){
          callback = (value) => {
            this.props.callback(new jsonArray(value))
            this.setState({loading:false})
          }
      }

      // remove elements that are undefined or empty arrays to
      // avoid an error
      const keys = Object.keys(nextState.selection)
      for( var i=0; i < keys.length; i++ ){
        const element = nextState.selection[keys[i]]
        if( element === undefined ){
          delete nextState.selection[keys[i]]
          continue
        }

        if( element.length === 0 ){
          delete nextState.selection[keys[i]]
          continue
        }
      }

      // perform query to retrieve product information
      this.GET({
        key: 'product_info',
        parameters: nextState.selection,
        callback: callback
      })

      // set the loading state to render loading symbol on button
      this.setState({loading: true})
    }


    return true
  }



  render() {

    // set the default dropdown options
    var fab_options = ['ATMC','CHD']
    var tech_options = ['SMOS10HV', 'HIP6MW']
    var factory_options = ['ATTJ','ATKH','ATKL']

    if( this.props.fab_options !== undefined ) fab_options = this.props.fab_options
    if( this.props.tech_options !== undefined ) tech_options = this.props.tech_options
    if( this.props.factory_options !== undefined ) factory_options = this.props.factory_options

    return (
      <ProductSearchView
        fab_options = {fab_options}
        tech_options = {tech_options}
        factory_options = {factory_options}
        loading = {this.state.loading}
        onClick = {(value) => this.setState({selection:value})}
      />

    );
  }
}
