
export default function Png( props ){
  // pptx, slide, content ){

  var content

  if( props.pptxContent !== undefined ){
    content = props.pptxContent

  }else{
    if( props.content.png === undefined) return props.slide

    content = {
      data: props.content.png,
      x: 0.1,
      y: 0.5,
      w: props.content.scaling.width,
      h: props.content.scaling.height
      }
  }


  props.slide.addImage(content);

  return props.slide
}
