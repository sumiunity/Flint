/**
 * Mask Select
 * ===========
 *
 * Description
 * -----------
 * Retrieve the list of available masks and executes the provided function during
 * a state change
 *
 * Author : Nik Sumikawa
 * Date : Aug 14, 2019
 */


import React from "react";

import { Grid, Dropdown, Checkbox } from 'semantic-ui-react'

import RestFramework from '../../Frameworks/RestApi'

import {getJwt} from "../../Core/components/Jwt"




export function ProductFilterView( props ){
  return(
    <ProductSelect />
  )
}



export default class ProductSelect extends RestFramework {

 constructor(props) {
   super(props);

   this.state = {
         allProduct: props.allProduct,
         userFilter: props.userFilter,
         app: (props.app === undefined) ? 'edt': this.props.app,
         mask: (props.mask === undefined) ? 'ALL' : props.mask,
         tech: (props.tech === undefined) ? 'ALL' : props.tech,
         fab: (props.fab === undefined) ? 'ALL' : props.fab,
         name: (props.name === undefined) ? 'ALL' : props.name,
         facility: (props.facility === undefined) ? 'ALL' : props.facility,

         };


   // retrieve the user core id from the cache and push results into the cache
   const user = getJwt()
   this.state.core_id = (Object.keys(user).length === 0 ) ? undefined : user.username

   // when an initial condition is not provided, set based on the presence of a user
   if( this.state.allProduct === undefined ){
     this.state.allProduct = (Object.keys(user).length === 0 ) ? true : false
   }

 }


 /**
  * When the components mounts, attempt to access the database to pull the list of mask names
  * @return {none}
  */
 async componentDidMount() {

   // when the user filter is disabled, force all products on
   if( this.state.userFilter === false){
     this.setState({allProduct: true})
   }

   if( (this.state.core_id === undefined) ){
     this.setState({
       allProduct: true,
       // userFilter: false,
     })

     // get all products associated with the current product
     this.GET({
       key: 'products',
       parameters: {},
     })

   }else{
     this.setState({
       allProduct: false,
       // userFilter: true,
     })

     this.GET({
       key: 'user_products',
       parameters: {
         core_id: this.state.core_id,
         app: this.state.app,
       },
       callback: this.userProductsCallback.bind(this)
     })
   }

 }


 shouldComponentUpdate(nextProps, nextState){

    if(
    (nextState.products === undefined) &
    (nextState.user_products !== undefined) &
    (nextState.core_id !== undefined) ){
      // get all products associated with the current product
      this.GET({
        key: 'products',
        parameters: {},
      })
    }

    // only perform the callback function when products are available
    if( nextState.products !== undefined ){

    // perform the callback when there is a change to the products,
    // user defined products or the all product flag
    if( (this.state.products !== nextState.products)|
      (this.state.user_products !== nextState.user_products)|
      (this.state.allProduct !== nextState.allProduct) ){

        var products = nextState.products

        // select the products assigned to the user when the user info is defined
        products = this.filter_user_products(
          products,
          nextState.user_products,
          nextState.allProduct
        )

        // select products basedon the filter criteria
        products = this.filtered_products(products)

        this.callback( products )
     }


   }

   return true
 }


  // callback function when retrieving the list of user selected products
  userProductsCallback( user_products ){

    // disable user product selection feature when no products are selected
    if( user_products.length === 0 ){
      this.setState({
        allProduct: true,
        userFilter: false,
      })
    }

    this.setState({user_products: user_products})
  }


  // filters the product list based on the provided category. When the
  // ALL tag is selected, no filters are applied
  category_filter( product_list, category ){

    // do not perform filtering when the ALL tag is selected
    if((this.state[category] === 'ALL')|(this.state[category] === undefined )) return product_list

    return product_list.filter( row => row[category] === this.state[category] )
  }

  // returns a list of products after applying the product filters
  filtered_products( products ){


    products = this.category_filter( products, 'tech' )
    products = this.category_filter( products, 'fab' )
    products = this.category_filter( products, 'mask' )
    products = this.category_filter( products, 'name' )
    products = this.category_filter( products, 'facility' )

    return products
  }

  // filter the products to include only those assigned to the user
  filter_user_products( products, user_products, allProduct ){

    if( products === undefined ) return []

    // select only the products belonging to the user product array
    if( (user_products !== undefined)&(allProduct === false)){
      const index_list = user_products.map( row => row.index )
      products = products.filter( row => index_list.includes(row.id) )
    }

    return products
  }


  // returns a list of json objects used to populate the dropdown menu
  dropdown_options( category ){

    var products = this.state.products

    // select the products assigned to the user when the user info is defined
    products = this.filter_user_products(
      products,
      this.state.user_products,
      this.state.allProduct
    )

    // select products basedon the filter criteria
    products = this.filtered_products(products)


    // select the unique values for the specified category
    var cat = ['ALL']
    cat = cat.concat( [...new Set(products.map(row => row[category]))] )

    // sort the list in chronological order
    cat = cat.sort((a, b) => a > b ? 1 : -1 )

    // format to adhere to the dropdown menu standard
    var options = []
    for( var i=0; i < cat.length; i++ ){
      options.push({
        key: cat[i],
        text: cat[i],
        value: cat[i],
      })
    }

    return options
  }

  // function executed when the dropdown menu contents change
  onChange( category, data ){

    this.setState({[category]: data.value})


    var products = this.state.products

    // select the products assigned to the user when the user info is defined
    products = this.filter_user_products(
      products,
      this.state.user_products,
      this.state.allProduct
    )

    const category_list = ['tech', 'fab', 'mask', 'name', 'facility']

    // filter the products based on the category selection
    for( var i=0; i < category_list.length; i++ ){
      // filter based on the current selection
      if( category === category_list[i] ){
        // do not perform filtering when 'ALL' is selected
        if(data.value === 'ALL') continue

        products = products.filter( row => row[category] === data.value )
      }else{
        //filter based on the current state
        products = this.category_filter( products, category_list[i] )
      }
    }

    this.callback(products)


  }



  // Performs callback function when provided
  callback( products ){

    const category_list = ['tech', 'fab', 'mask', 'name', 'facility']

    var values = {}

    // extract the unique values for each category
    for( var i=0; i < category_list.length; i++ ){
      const category = category_list[i]
      values[category_list[i]] = [...new Set(products.map(row => row[category]))]
    }

    // console.log( 'callback', values)
    // console.log( this.props)

    // return the unique values for the specified callback functions
    if( this.props.callback_tech !== undefined ) this.props.callback_tech(values['tech'])
    if( this.props.callback_fab !== undefined ) this.props.callback_fab(values['fab'])
    if( this.props.callback_mask !== undefined ) this.props.callback_mask(values['mask'])
    if( this.props.callback_name !== undefined ) this.props.callback_name(values['name'])
    if( this.props.callback !== undefined ) this.props.callback(values)

  }





 render() {


   const colStyle ={
     padding : '0',
     paddingLeft:'2px',
     paddingRight:'2px',

   }

   var filter_checkbox
   if( this.state.userFilter !== false ){
     filter_checkbox = (
       <Grid.Row style={{paddingTop:'5px', paddingLeft: '5px'}}>
         <Checkbox
           toggle
           checked={this.state.allProduct}
           label='Show All Products'
           onClick={() => {this.setState({allProduct: !this.state.allProduct})}}
           />
       </Grid.Row>
     )
   }

   return (
     <Grid>

       <Grid.Row >
         <Grid.Column
           width={4}
           style={colStyle}>
           <h3 for="fab_select" style={{margin:'1px'}}>Tech</h3>
           <Dropdown
             fluid
             search
             selection
             defaultValue={this.state.tech}
             onChange={(event, data) => this.onChange('tech', data)}
             options={this.dropdown_options('tech')}
             />

         </Grid.Column>

         <Grid.Column
           width={4}
           style={colStyle}>
           <h3 for="fab_select" style={{margin:'1px'}}>Fab</h3>
           <Dropdown
             fluid
             search
             selection
             defaultValue={this.state.fab}
             onChange={(event, data) => this.onChange('fab', data)}
             options={this.dropdown_options('fab')}
             />

         </Grid.Column>

         <Grid.Column
           width={4}
           style={colStyle}>
           <h3 for="mask_select" style={{margin:'1px'}}>Mask</h3>
           <Dropdown
             fluid
             search
             selection
             defaultValue={this.state.mask}
             onChange={(event, data) => this.onChange('mask', data)}
             options={this.dropdown_options('mask')}
             />
         </Grid.Column>

         <Grid.Column
           width={4}
           style={colStyle}>
           <h3 for="product_select" style={{margin:'1px'}}>Product</h3>
             <Dropdown
               fluid
               search
               selection
               defaultValue={this.state.mask}
               onChange={(event, data) => this.onChange('name', data)}
               options={this.dropdown_options('name')}
               />
         </Grid.Column>



       </Grid.Row>

       {filter_checkbox}
     </Grid >
   );
 }
}


// <Grid.Column
//   width={4}
//   style={colStyle}>
//   <Label for="facility_select" style={{margin:'1px'}}>Facility</Label>
//     <Dropdown
//       fluid
//       search
//       selection
//       defaultValue={this.state.facility}
//       onChange={(event, data) => this.onChange('facility', data)}
//       options={this.dropdown_options('facility')}
//       />
// </Grid.Column>
