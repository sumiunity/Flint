

import {Card, Button} from 'semantic-ui-react'

import moment from 'moment'

// Standard Data Card
export default function DataCard( props ){


  var header = (props.header !== undefined) ? props.header :  `<Header>`
  var value = (props.value !== undefined) ? props.value :  `<Value>`

  // converts the data
  if( props.isDate === true ){
    value = moment(value).format('YYYY-MM-DD HH-mm')
  }

  return(
    <Card key={`card - ${header}`} style={{width: '100%'}}>
      <Card.Content>
        <Card.Header content={header}/>
        <Card.Description content={value} />
      </Card.Content>
    </Card>
  )

}
