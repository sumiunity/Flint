
import {Card, Button} from 'semantic-ui-react'

import jsonArray from "../../../jsonArray";

// export lot usage data
export default function ExportData( props ){

  if( props.data === undefined ) return null

  var data = props.data
  if( !(data instanceof jsonArray) ) data = new jsonArray(data)

  var header = (props.header !== undefined) ? props.header :  `Download`
  var description = (props.description !== undefined) ? props.description :  `Downloads data to CSV File`
  var filename = (props.filename !== undefined) ? props.filename :  `file.csv`

  return(
    <Card key={`card - ${header}`} style={{width: '100%'}}>
      <Card.Content>
        <Card.Header content={header} />
        <Card.Description content={description} style={{margin:0}}/>
          <Button
            style = {{width: '100%', marginTop: '5px'}}
            primary
            onClick={() => data.fileIO.toCsv(filename)}
            >
            Download
          </Button>
      </Card.Content>
    </Card>
  )

}
