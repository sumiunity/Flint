/**
 * Date View
 * ===========
 *
 * Component used to generate the start and end times based
 * on a specied date type
 *
 * Author : Nik Sumikawa
 * Date : Aug 14, 2019
 */

import React, {useState} from "react";

// import "react-datepicker/dist/react-datepicker.css";

import {
  Grid,
  Button,
  Dropdown,
  Header,
  Icon
  } from 'semantic-ui-react'


import {prev_date, next_date, init_date} from '../components/Date'

/**
 * Standarized Date Menu for horizontal Layouts
 * @param       {function} props.callback callback function executed when the button or enter is pressed
 * @constructor
 */
export function HorizontalDate( props ){

  const [datetime, setDatetime] = useState((props.datetime === undefined) ? {} : props.datetime)
  const [dateType, setDateType] = useState((props.dateType === undefined) ? 'Week' : props.dateType)

  // set an initial date value when it is undefined
  if( datetime === undefined ){
    const date = init_date(dateType)
    setDatetime( date )
    if( props.callback !== undefined ) props.callback(date)
  }

  // set an initial date value when it is empty
  if( Object.keys(datetime).length === 0 ){
    const date = init_date(dateType)
    setDatetime( date )
    if( props.callback !== undefined ) props.callback(date)
  }

  var callback = (value) => console.log( 'callback not implemented', value )
  if( props.callback !== undefined ) callback = (value) => props.callback(value)

  return (
    <Grid
      verticalAlign="middle"
      textAlign='center'
      style={{ minWidth:'500px'}}>
      <Grid.Row style={{margin:0, padding:0}}>

        <Grid.Column
          width={8}
          style={{margin:0, padding:0}}
          >
          <Header
            style={{
              width: "100%",
              height: "100%",
              margin:'auto',
              "textAlign": "center"}}
            src={undefined}
            key='DateHeaderString'>
            {datetime.date_str}
          </Header>
        </Grid.Column>

        <Grid.Column
          width={8}
          style={{margin:0, padding:0}}
          >
          <DateControls
            datetime={datetime}
            setDatetime={setDatetime}
            dateType={dateType}
            setDateType={setDateType}
            callback={(val) => {
              setDatetime(val)
              callback(val)
            }}
            />
        </Grid.Column>

      </Grid.Row>
    </Grid>
    )
}

/**
 * Standarized Date Menu for Verical Layouts
 * @param       {function} props.callback callback function executed when the button or enter is pressed
 * @constructor
 */
export function VerticalDate( props ){
  const [datetime, setDatetime] = useState({})
  const [dateType, setDateType] = useState('Week')

  // set an initial date value when it is undefined
  if( datetime === undefined ){
    const date = init_date(dateType)
    setDatetime( date )
    if( props.callback !== undefined ) props.callback(date)
  }

  // set an initial date value when it is empty
  if( Object.keys(datetime).length === 0 ){
    const date = init_date(dateType)
    setDatetime( date )
    if( props.callback !== undefined ) props.callback(date)
  }


  var callback = (value) => console.log( 'callback not implemented', value )
  if( props.callback !== undefined ) callback = (value) => props.callback(value)

  return (
    <Grid
      verticalAlign="middle"
      textAlign='center'
      style={{ minWidth:'500px'}}>

      <Grid.Row style={{margin:0, padding:0}}>
        <Header
          style={{
            width: "100%",
            height: "100%",
            margin:'auto',
            "textAlign": "center"}}
          src={undefined}
          key='DateHeaderString'>
          {datetime.date_str}
        </Header>
      </Grid.Row>

      <Grid.Row
        style={{
          margin: 'auto',
          textAlign: 'center',
          padding:0}}
          >
        <DateControls
          datetime={datetime}
          setDatetime={setDatetime}
          dateType={dateType}
          setDateType={setDateType}
          callback={(val) => {
            setDatetime(val)
            callback(val)
          }}
          />
      </Grid.Row>

    </Grid>
    )
}


/**
 * Renders the Date control functions to move forwards
 * or backwards and to select a date type
 * @param       {[type]} props [description]
 * @constructor
 */
function DateControls( props ){


  var callback = (value) => console.log('callback not implemented', value)
  if( props.callback !== undefined ) callback = (value) => props.callback(value)

  return(
    <Grid style={{margin:0, padding:0}}>
      <Grid.Row
        centered
        style={{
          "margin": "0",
          "padding": "0",
          inset: 'auto',
        }}
        key='Grid.Row.0'>

        <Grid.Column
          style={{
            "margin": "0",
            "padding": "0",
          }}
          width={4}
          key='DateControlls.Col.1'>

          <Button
            style={{
              "width": "100%",
              "height": "100%",
              borderTopRightRadius: '0',
              borderBottomRightRadius: '0',
            }}
            primary
            onClick={() => {
              const date = prev_date(props.datetime.start_datetime, props.dateType)
              callback(date)
              props.setDatetime(date)
            }}
            key='SemanticUIButton.-0-{"width":"100%","height":50}'>
            <Icon name='angle left' />
          </Button>
        </Grid.Column>

        <Grid.Column
          style={{
            "margin": "0",
            "padding": "0",
          }}
          width={8}
          key='DateControlls.Col.2'>

          <Dropdown
            placeholder='Select type'
            fluid={true}
            selection={true}
            value={props.dateType}
            onChange = {(e, data) => {
              const type = data.value
              const date = init_date(type, props.datetime.start_datetime)
              props.setDateType(type)
              props.setDatetime(date)
              callback(date)
            }}
            options={[
              {key: "Day", text: 'Day', value: 'Day'},
              {key: "Week", text: 'Week', value: 'Week'},
              {key: "Month", text: 'Month', value: 'Month'},
              {key: "Quarter", text: 'Quarter', value: 'Quarter'},
              {key: "Year", text: 'Year', value: 'Year'},
            ]}
            style={{
              "borderRadius": '0px',
              "width": "100%",
              "height": "100%"}}
            src=''
            key='SemanticUIImageDropdown.-3-{"width":"100%","height":50}' />
          </Grid.Column>

          <Grid.Column
            style={{
            "margin": "0",
            "padding": "0",
            }}
            width={4}
            key='DateControlls.Col.3'>
            <Button
              key='DateControlls.Next.Button'
              primary
              style={{
                "width": "100%",
                "height": "100%",
                borderTopLeftRadius: '0',
                borderBottomLeftRadius: '0',
              }}
              onClick={() => {
                const date = next_date(props.datetime.start_datetime, props.dateType)
                callback(date)
                props.setDatetime(date)
              }}
              >

              <Icon name='angle right' />
            </Button>
          </Grid.Column>

        </Grid.Row>
      </Grid>

    )

}
