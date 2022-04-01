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

  // const height_ratio = (HEIGHT+y_offset+(y_padding*2))/MAX_HEIGHT
  // const width_ratio = (WIDTH+x_offset+(x_padding*2))/MAX_WIDTH
  const height_ratio = HEIGHT/MAX_HEIGHT
  const width_ratio = WIDTH/MAX_WIDTH


  var scaling = {}

  console.log( HEIGHT, y_offset, y_padding, height_ratio, MAX_HEIGHT)
  console.log( height_ratio, width_ratio)

  //scale the image based on the height.
  if( height_ratio >  width_ratio ){
    scaling['ratio'] = 1/height_ratio
    scaling['temp_max'] = MAX_WIDTH - x_offset - (x_padding*2)
    scaling['temp_val'] = WIDTH * scaling['ratio']
    scaling['x_scale_offset'] = (scaling['temp_max']- scaling['temp_val'])/2
    scaling['y_scale_offset'] = 0

  //scale the image based on the wi dth.
  }else{
    scaling['ratio'] = 1/width_ratio
    scaling['temp_max'] = MAX_HEIGHT - y_offset - (y_padding*2)
    scaling['temp_val'] = HEIGHT * scaling['ratio']
    scaling['y_scale_offset'] = (scaling['temp_max']- scaling['temp_val'])/2
    scaling['x_scale_offset'] = 0
  }

  scaling['height'] = (HEIGHT * scaling['ratio']) - y_offset - (y_padding*2)
  scaling['width'] = (WIDTH * scaling['ratio']) - x_offset - (x_padding*2)
  console.log( 'padding...', x_offset, y_offset)
  scaling['x'] = x_offset + x_padding + scaling['x_scale_offset']
  scaling['y'] = y_offset + y_padding + scaling['y_scale_offset']
  // scaling['x'] = ((MAX_WIDTH - scaling['width'])/2) + x_offset + x_padding
  // scaling['y'] = ((MAX_HEIGHT - scaling['height'])/2) + y_offset + y_padding

  console.log( scaling )

  return scaling
}

export default scaleImage
