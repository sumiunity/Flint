/**
 * Product Menu
 * @description menu containing dropdown menus to filter products.
 * @author Nik Sumikawa
 * @date Jan 6, 2020
 */


import React from 'react';


import Menu from 'ReactFramework/components/Templates/Menu/views/Menu'
import jsonArray from 'ReactFramework/components/jsonArray/jsonArray'

import project_config from 'project'

export default function ProductMenu( props ){

  const [prodList, setProdList] = React.useState()
  const [tech, setTech] = React.useState()
  const [fab, setFab] = React.useState()
  const [factory, setFactory] = React.useState()
  const [mask, setMask] = React.useState()

  if( prodList === undefined ){
    var json_array = new jsonArray()
    json_array.fileIO.fromUrl(
      project_config.media + '/product_list.csv',
      (prod_info) => setProdList( prod_info )
    )

    return null
  }


  var products = prodList
  if( (fab !== undefined)&(fab !== '') ) products = products.filter(r => r.FAB === fab)
  if( (tech !== undefined)&(tech !== '') ) products = products.filter(r => r.TECH_GROUP === tech)
  if( (factory !== undefined)&(factory !== '') ) products = products.filter(r => r.FACTORY === factory)

  const MenuClass = new Menu()


  return (
    <div>
      <MenuClass.MenuTop>
        <MenuClass.MenuComponents.Dropdown
          values = {prodList.unique(['FAB'])}
          placeholder = 'fab'
          onChange = {(value) => setFab(value)}
          />
        <MenuClass.MenuComponents.Dropdown
          values = {prodList.unique(['TECH_GROUP'])}
          placeholder = 'tech'
          onChange = {(value) => setTech(value)}
          />
        <MenuClass.MenuComponents.Dropdown
          values = {prodList.unique(['FACTORY'])}
          placeholder = 'factory'
          onChange = {(value) => setFactory(value)}
          />
        <MenuClass.MenuComponents.Dropdown
          values = {prodList.unique(['MASK'])}
          placeholder = 'mask'
          onChange = {(value) => setMask(value)}
          />
      </MenuClass.MenuTop>

      <MenuClass.SegmentBottom>
        <props.Component
          products = {products}
          fab = {fab}
          tech = {tech}
          factory = {factory}
          mask = {mask}
          />
      </MenuClass.SegmentBottom>
   </div>
 )
}
