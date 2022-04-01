/**
 * To PNG
 * ===================
 *
 * Converts the react component to a PNG
 *
 * @author Nik Sumikawa
 * @date Oct 21, 2020
 * @type {pptxgen}
 */


import ReactDOM from 'react-dom';

import {toPng as htmlToPng} from 'html-to-image'
// import html2canvas from 'html2canvas';
import scaleImage from './Scaling'


export default async function toPng( ref, props ){

  if( ref === undefined ) return

  const element = ReactDOM.findDOMNode(ref.current);

  var callback = (val) => console.log( 'callback not implemented', val)
  if( props.callback !== undefined ) callback = (val) => props.callback(val)

  var width = ref.current.clientWidth
  var height = ref.current.clientHeight
  if(navigator.userAgent.indexOf("Chrome") != -1 ) {
      width = width * 1.15
      height = height * 1.15
  }

  const htmlToImage = require('html-to-image');
  await htmlToImage.toPng(
    element,
    { height: height,
      width: width
    }
  )
  .then(function (dataUrl) {

    // scale the image to fit within the pptx
    const scaling = scaleImage(
      ref.current.clientHeight,
      ref.current.clientWidth,
      {
        x_offset: 0,
        y_offset: 0.5,
        x_padding: 0.1,
        y_padding: 0.1,
        // center_justify: true
      }
    )

    // console.log( scaling )
    callback( {
      png: dataUrl,
      scaling: {
        x: scaling.x,
        y: scaling.y,
        width: scaling.width,
        height: scaling.height
          // width: ref.current.clientWidth/100,
          // height: ref.current.clientHeight/100,
        }
      })
  })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  })

  // await html2canvas(element, {
  //     scrollY: -window.scrollY,
  //     useCORS: true,
  //     width: element.clientWidth,
  //     height: element.clientHeight
  //
  // }).then(canvas => {
  //
  //   // scale the image to fit within the pptx
  //   const scaling = scaleImage(
  //     canvas.height,
  //     canvas.width,
  //     {
  //       x_offset: 0,
  //       y_offset: 1,
  //       x_padding: 0.1,
  //       y_padding: 0.1
  //     }
  //   )
  //
  //   callback( {
  //     png: canvas.toDataURL('image/png', 1.0),
  //     scaling: scaling
  //   })

    // console.log(canvas.width, canvas.height, canvas )
    // canvas.width = width
    // canvas.height = height


    // const data = canvas.toDataURL('image/png', 1.0)
    // slide.addImage(
    //    { data: data,
    //      x: scaling.x,
    //      y: scaling.y,
    //      w: scaling.width,
    //      h: scaling.height
    //  });
  // });
}
