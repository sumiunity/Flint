/**
 * Image Scaling
 * ======================
 *
 * Returns the image height, width and offset for the entry into
 * the power point presentation
 *
 * @author Nik Sumikawa
 * @date Oct 23, 2020
 * @type {[type]}
 */


/**
 * Given the dimensions of an image, scale it to fit within
 * the power poitn presentation. The offsets allow for the
 * image to be moved in the slide
 * @param  {float} height       image height
 * @param  {float} width        image width
 * @param  {float} [x_offset=0] image offset in x axis
 * @param  {float} [y_offset=0] image offset in y axis
 * @return {object}             scaled parameters (height, width, offset, etc.)
 */
export function scaleImage( height, width, params={} ){

  const MAX_HEIGHT = 5.625
  const MAX_WIDTH = 10

  const HEIGHT = height/100
  const WIDTH = width/100

  const x_offset = (params.x_offset === undefined ) ? 0 : params.x_offset
  const y_offset = (params.y_offset === undefined ) ? 0 : params.y_offset
  const x_padding = (params.x_padding === undefined ) ? 0.05 : params.x_padding
  const y_padding = (params.y_padding === undefined ) ? 0.05 : params.y_padding

  var scaling = {}

  var max_height = MAX_HEIGHT
  if( y_offset > 0 ){
    //padding only for one side because opposite side covered by offset
    max_height = max_height - y_offset - y_padding
    scaling['y'] = y_offset

  }else{
    //subtract both sides of padding
    max_height = max_height - 2*y_padding
    scaling['y'] = y_padding
  }

  var max_width = MAX_WIDTH
  if( x_offset > 0 ){
    //padding only for one side because opposite side covered by offset
    max_width = max_width - x_offset - x_padding
    scaling['x'] = x_padding
  }else{
    //subtract both sides of padding
    max_width = max_width - 2*x_padding
    scaling['x'] = x_padding
  }

  const height_ratio = HEIGHT/max_height
  const width_ratio = WIDTH/max_width


  // no scaling required when the images are less than the provided area
  if( (height_ratio < 1)&(width_ratio < 1)){
    scaling['height'] = HEIGHT
    scaling['width'] = WIDTH

  // scaling is required to fit images in provided space
  }else{
    if( height_ratio >  width_ratio ){
      scaling['height'] = HEIGHT / height_ratio
      scaling['width'] = WIDTH / height_ratio
    }else{
      scaling['height'] = HEIGHT / width_ratio
      scaling['width'] = WIDTH / width_ratio

    }

  }
  // console.log( HEIGHT, y_offset, y_padding, height_ratio, MAX_HEIGHT)
  // console.log( height_ratio, width_ratio)
  //
  // //scale the image based on the height.
  // if( height_ratio >  width_ratio ){
  //   scaling['temp_val'] = WIDTH
  //   scaling['ratio'] = 1
  //
  //   // scale the image when the ratio is greater than the alotted space
  //   if( height_ratio > 1 ){
  //     scaling['ratio'] = 1/height_ratio
  //     scaling['temp_val'] = scaling['temp_val'] * scaling['ratio']
  //   }
  //
  //   scaling['temp_max'] = MAX_WIDTH - x_offset - (x_padding*2)
  //   scaling['x_scale_offset'] = (scaling['temp_max']- scaling['temp_val'])/2
  //   scaling['y_scale_offset'] = 0
  //
  // //scale the image based on the wi dth.
  // }else{
  //   scaling['temp_val'] = HEIGHT
  //   scaling['ratio'] = 1
  //
  //   // scale the image when the ratio is greater than the alotted space
  //   if( width_ratio > 1 ){
  //     scaling['ratio'] = 1/width_ratio
  //     scaling['temp_val'] = scaling['temp_val'] * scaling['ratio']
  //   }
  //
  //   scaling['temp_max'] = MAX_HEIGHT - y_offset - (y_padding*2)
  //   scaling['y_scale_offset'] = (scaling['temp_max']- scaling['temp_val'])/2
  //   scaling['x_scale_offset'] = 0
  // }
  //
  //
  // scaling['height'] = (HEIGHT * scaling['ratio']) - y_offset - (y_padding*2)
  // scaling['width'] = (WIDTH * scaling['ratio']) - x_offset - (x_padding*2)
  // // console.log( 'padding...', x_offset, y_offset)
  // scaling['x'] = x_offset + x_padding
  // scaling['y'] = y_offset + y_padding
  //
  // if( params.center_justify === true ){
  //   scaling['x'] = scaling['x'] + scaling['x_scale_offset']
  //   scaling['y'] = scaling['y'] + scaling['y_scale_offset']
  //
  // }

  // scaling['x'] = ((MAX_WIDTH - scaling['width'])/2) + x_offset + x_padding
  // scaling['y'] = ((MAX_HEIGHT - scaling['height'])/2) + y_offset + y_padding

  // console.log( height, width, height_ratio, width_ratio, scaling )

  return scaling
}

export default scaleImage
