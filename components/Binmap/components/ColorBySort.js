/*
Color By Sort
====================

Sets the die color based on the name of the test insertion

:Author: Nik Sumikawa
:Date: March 11, 2020

 */

import {color, convertHex} from '../../Utils/Colors'


const debug = false


export default function colorBySort( binmapGallery ){

  var color_index = 0
  var color_lookup = {}

  for( var w=0; w < binmapGallery.data.length; w++ ){
    for( var i=0; i < binmapGallery.data[w].chart.data.length; i++ ){

      // select the color based on the test insertion name
      const sort = binmapGallery.data[w].chart.data[i]['sort__name']
      const color = fixedColors( sort, 'FT' )

      binmapGallery.data[w].chart.data[i]['color'] = color
    }
  }

  if(debug)  console.log( 'color lookup', color_lookup)

  return binmapGallery
}


// returns a fixed color based on the name of the test insertion
function fixedColors( sort, emphasis='None' ){

  var color_hex = '#808080'
  switch( sort.slice(0,2) ){
    case 'FR':
      color_hex = '#3cb44b'
      break

    case 'FH':
      color_hex = '#FF0000'
      break

    case 'FC':
      color_hex = '#0082c8'
      break

    case 'PR':
      color_hex = '#d2f53c'
      break

    case 'PH':
      color_hex = '#f032e6'
      break

    case 'PC':
      color_hex = '#46f0f0'
      break
  }


  if( sort === 'FHBI' ){ color_hex = '#aa6e28'}
  // when emphasis is specified, decrease the opacity of all
  // sorts in the non-emphasis category
  const emphasisOpacity = 30
  if( (emphasis === 'UP')&(sort.slice(0,1) === 'F') ){
    return convertHex(color_hex, emphasisOpacity)
  }

  if( (emphasis === 'FT')&(sort.slice(0,1) === 'P') ){
    return convertHex(color_hex, emphasisOpacity)
  }

  return color_hex
}

// function random_color( sort, lookup_table, emphasis='None' ){
//
//   // select the color based on the test insertion name
//   var rgb_color
//   const sort = binmapGallery.data[w].chart.data[i]['sort__name']
//   if( Object.keys(color_lookup).includes(sort) ){
//     rgb_color = color_lookup[sort]
//   }else{
//     rgb_color = color( color_index, 100, 'entropy_8bit' )
//     color_lookup[sort] = rgb_color
//     color_index++
//   }
//
// }
