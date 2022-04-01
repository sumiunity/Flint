import {
  Image,
  Header,
  Segment
} from "semantic-ui-react"

export default function Slide( props ){

  var title
  if( props.title !== undefined ) title = props.title

  var description
  if( props.description !== undefined ) description = props.description

  return(
    <Segment.Group>
      <Segment>
        <Header as="h2">{title}</Header>
        <span>{description}</span>
      </Segment>

      <Segment >
        <Image src={props.png} />
      </Segment>

    </Segment.Group>
  )

}
