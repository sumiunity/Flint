/**
 * To Powerpoint PPTX
 * ===================
 *
 * Converts the power point slideshow into a pptx presentation.
 *
 * Note that the slideshow.jsx should be used to render the
 * components so the components can be converted into a canvas
 * and then image for uploading into the power point presentation.
 * It is not recommended to use this file as a standalone
 *
 * @author Nik Sumikawa
 * @date Oct 21, 2020
 * @type {pptxgen}
 */
import pptxgen from "pptxgenjs";

import ReactDOM from 'react-dom';
import html2canvas from 'html2canvas';

import scaleImage from './scale_image'

/**
 * exports the slide content as a power point presentation
 * @param  {Array} slides   Array of objects containing the slide title and content
 *                          as a url to the data
 * @param  {string} filename pdf file name
 */
export async function to_pptx( slides, filename ){

  if( slides === undefined) return null

  const orderedSlides = slides.sort((a, b) => a['slideNum'] > b['slideNum'] ? 1 : -1 )

  // 1. Create a new Presentation
  let pptx = new pptxgen();

  // add the content for each slide
  for( var i=0; i < orderedSlides.length; i++ ){
    // await add_slide( pptx, orderedSlides[i] )

    const content = orderedSlides[i]

    // 2. Add a Slide
    let slide = pptx.addSlide();

    // when provided add the title to the slide
    if( content.title !== undefined ){
      slide.addText(
        content.title,
        { x: 0.1,
          y: 0.1,
          w: 9.8,
          h: 0.2,
          color: '363636',
          fill: { color:'F1F1F1' },
          align: pptx.AlignH.center
        }
      );
    }

    // when provided add an image as a Data URL (generated
    // when converting the component into an image)
    if( content.url !== undefined ){
      slide.addImage(
        { data: content.url,
          x: 0.1, y:0.1, w:'90%', h:0.2
        });
    }

    if( content.ref !== undefined ){
      const element = ReactDOM.findDOMNode(content.ref.current);

      await html2canvas(element, {
          scrollY: -window.scrollY,
          useCORS: true,
          width: element.clientWidth,
          height: element.clientHeight
      }).then(canvas => {

        console.log(canvas.width, canvas.height, canvas )
        // canvas.width = width
        // canvas.height = height

        // scale the image to fit within the pptx
        const scaling = scaleImage(
          canvas.height,
          canvas.width,
          {
            x_offset: 0,
            y_offset: 1,
            x_padding: 0.1,
            y_padding: 0.1
          }
        )
        console.log( 'scaling', scaling )
        const data = canvas.toDataURL('image/png', 1.0)
        slide.addImage(
           { data: data,
             x: scaling.x,
             y: scaling.y,
             w: scaling.width,
             h: scaling.height
         });
      });
    }
  }

  // 4. Save the Presentation
  pptx.writeFile("Sample Presentation.pptx")

}


export default to_pptx
