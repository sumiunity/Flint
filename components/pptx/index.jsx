
import pptxgen from "pptxgenjs";

// import jsonArray from '../../jsonArray/jsonArray'

import {Title, Png} from './template'


// export {default as SelectionForm} from './SelectionForm'
// export {default as SlideShow} from './SlideShow'



export default async function toPptx( props ){

  // console.log( 'what are the props', props )
  if( props.slides === undefined) return null

  var slides = props.slides

  // order the slides by the slide number when available
  if( Object.keys(slides[0]).includes('slideNum')){
    slides = slides.sort((a, b) => a['slideNum'] > b['slideNum'] ? 1 : -1 )
  }


  // 1. Create a new Presentation
  let pptx = new pptxgen();

  // add the content for each slide
  for( var i=0; i < slides.length; i++ ){

    var slideProp
    const content = slides[i]

    // 2. Add a Slide
    var slide = pptx.addSlide();

    // run the slide through a function to format it against a template
    if( content.template !== undefined ){

      slide = content.template( pptx, slide, slides[i] )


    // create the slide based on an array of objects
    }else if( content.pptxgenFormat ){
      for( var j=0; j < content.content.length; j++ ){
        slideProp = {
          pptx: pptx,
          slide: slide,
          pptxContent: content.content[j]
        }

        // add the content based on type
        switch( content.content[j].type ){
          case 'title':
            slide = Title( slideProp )
            break

          case 'png':
            slide = Png( slideProp )
            break

          default:
            console.log( 'unknown slide type:', content.content[j].type )
        }
      }

    // add the slides exported from component conversions
    }else{

      slideProp = {
        pptx: pptx,
        slide: slide,
        content: slides[i]
      }

      slide = Title( slideProp )
      slide = Png( slideProp )
    }


    // // when provided add an image as a Data URL (generated
    // // when converting the component into an image)
    // if( content.url !== undefined ){
    //   slide.addImage(
    //     { data: content.url,
    //       x: 0.1, y:0.1, w:'90%', h:0.2
    //     });
  }

  // 4. Save the Presentation
  var filename = props.filename
  if( filename === undefined ) filename = 'Cosolutions.pptx'

  pptx.writeFile(filename)

}
