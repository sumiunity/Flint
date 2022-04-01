
export default function Title( props ){

  var title
  var format

  if( props.pptxContent !== undefined ){
    title = props.pptxContent.title
    format = props.pptxContent.format

  }else{

    if( props.content.title === undefined) return props.slide

    title = props.content.title
    format = {
      x: 0.1,
      y: 0.1,
      w: 9.8,
      h: 0.2,
      color: '363636',
      // fill: { color:'F1F1F1' },
      // align: props.pptx.AlignH.center
    }

  }

  props.slide.addText(title, format);

  return props.slide
}
