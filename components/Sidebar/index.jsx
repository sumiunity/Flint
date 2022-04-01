
import DataCard from './Cards/Data'
import Email from './Cards/Email'
import ExportData from './Cards/ExportData'


export default function Sidebar(props){

    // create an array to hold the various components
    var components = []

      // create components for each data Card
    if( props.dataCards !== undefined ){
        props.dataCards.forEach(r => {
          components.push( DataCard(r) )
        })
    }

    // create components for each email Card
    if( props.emailCards !== undefined ){
        props.emailCards.forEach(r => {
          components.push( Email(r) )
        })
    }

    // create components for each email Card
    if( props.exportCards !== undefined ){
        props.exportCards.forEach(r => {
          components.push( ExportData(r) )
        })
    }


    return components
}
