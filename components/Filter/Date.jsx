/**
 * Date Header
 * ===========
 *
 * Description
 * -----------
 * Card header components
 *
 * Author : Nik Sumikawa
 * Date : Aug 14, 2019
 */

import React from "react";

import moment from 'moment';
import DatePicker from "react-datepicker";
import { Icon } from 'semantic-ui-react'

import "react-datepicker/dist/react-datepicker.css";

import {
  Grid,
  Button,
  Dropdown,
  Header
  } from 'semantic-ui-react'



const debug = false

export class DateSelect extends React.Component {

 constructor(props) {
   super(props);

   this.state = { dateframe: init_dateframe({}) };

   if( props.dateType !== undefined ){
     this.state.dateframe.dateframe.type = props.dateType


      // normalize the data based on the date type
      const start_date = normalize_date(
        this.state.dateframe.dateframe.start_date,
        props.dateType )

     // the date range needs to be updated when the type is changed
     this.state.dateframe = update_dateframe(
       this.state.dateframe,
       start_date )
   }
 }

 componentDidMount(){
   if( this.props.callbackFunc != null ){
     this.props.callbackFunc(this.state.dateframe.dateframe)
   }
 }

 prevHandle(){
   //go to the previous date frame, update the state and call the callback function
   var dateframe = this.state.dateframe

   dateframe = prev(dateframe)
   this.setState({dateframe: dateframe})

   //the callback is provided with the dataframe object that contains all date info
   if( this.props.callbackFunc !== undefined ){
     if( debug ) console.log( dateframe.dateframe.start, dateframe.dateframe.end )
     this.props.callbackFunc(dateframe.dateframe)

   }
 }

 nextHandle(){
   //go to the next date frame, update the state and call the callback function
   var dateframe = this.state.dateframe

   dateframe = next(dateframe)
   this.setState({dateframe: dateframe})

   //the callback is provided with the dataframe object that contains all date info
   if( this.props.callbackFunc !== undefined ){
     if( debug ) console.log( dateframe.dateframe.start, dateframe.dateframe.end )
     this.props.callbackFunc(dateframe.dateframe)

   }
 }

 datepickerHandle(date){
   //retrieves the data from the date picker and update the dateframe
   var dateframe = this.state.dateframe

   dateframe = update_dateframe( dateframe, date )
   this.setState({dateframe:dateframe})

    //the callback is provided with the dataframe object that contains all date info
    if( this.props.callbackFunc !== undefined ){
      if( debug ) console.log( dateframe.dateframe.start, dateframe.dateframe.end )
      this.props.callbackFunc(dateframe.dateframe)

    }
 }

 dateTypeHandle( type_str ){
   // //retrieves the data from the date picker and update the dateframe

   var dateframe = this.state.dateframe
   dateframe.dateframe.type = type_str

   // normalize the data based on the date type
   const start_date = normalize_date( dateframe.dateframe.start_date, type_str )

   dateframe = update_dateframe( dateframe, start_date )
   this.setState({dateframe: dateframe})

   if( this.props.callbackFunc !== undefined ){
     if( debug ) console.log( dateframe.dateframe.start, dateframe.dateframe.end )
     this.props.callbackFunc(dateframe.dateframe)


   }

 }



 render() {

   const height = 40
   if(debug) console.log( 'default value', this.state.dateframe.dateframe.type )

   return(
     <>

     <Grid
       columns={1}
       style={{"margin": "0", "padding": "0"}}
       key='tree-1'>

       <Grid.Row
         centered
         style={{"margin": "0", "padding": "0"}}
         key='Grid.Row.0'>

         <Grid.Column
           style={{
             "margin": "0",
             "padding": "0",
           }}
           width={8}
           key='Grid.Col.1'>
           <Header
             style={{"width": "100%", "height": height, "textAlign": "center"}}
             src={undefined}
             key='SemanticUIHeader.-4-{"width":"100%","height":50,"textAlign":"center"}'>
             {this.state.dateframe.dateframe.date_str}
           </Header>
         </Grid.Column>
       </Grid.Row>
     </Grid>

     <Grid
       style={{
         "margin": "0",
         "padding": "0",
         inset: 'auto',
       }}
       columns={3}
       key='tree-2'>

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
           width={2}
           key='Grid.Col.1'>
           <Button
             style={{
               "width": "100%",
               "height": height,
               borderTopRightRadius: '0',
               borderBottomRightRadius: '0',
             }}
             onClick={() => this.prevHandle()}
             key='SemanticUIButton.-0-{"width":"100%","height":50}'>
             <Icon name='angle left' />
           </Button>
         </Grid.Column>

         <Grid.Column
           style={{
             "margin": "0",
             "padding": "0",
           }}
           width={4}
           key='Grid.Col.3'>
           <Dropdown
             placeholder='Select type'
             fluid={true}
             selection={true}
             defaultValue={this.state.dateframe.dateframe.type}
             onChange = {(e, data) => this.dateTypeHandle(data.value)}
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
               "height": height}}
             src=''
             key='SemanticUIImageDropdown.-3-{"width":"100%","height":50}' />
           </Grid.Column>

           <Grid.Column
             style={{
             "margin": "0",
             "padding": "0",
             }}
             width={2}
             key='Grid.Col.4'>
             <Button
               style={{
                 "width": "100%",
                 "height": height,
                 borderTopLeftRadius: '0',
                 borderBottomLeftRadius: '0',
               }}
               onClick={() => this.nextHandle()}
               key='SemanticUIButton.-1-{"width":"100%","height":50}'>
               <Icon name='angle right' />
             </Button>
           </Grid.Column>


           { (this.props.DatepickerEnable === true) ?
             <Grid.Column
               style={{
                 "margin": "0",
                 "padding": "0",
               }}
               width={2}
               key='Grid.Col.2'>
                 <DatePicker
                   selected={this.state.start_date}
                   onChange={() => this.datepickerHandle}
                   />
               </Grid.Column>
           : ''}

         </Grid.Row>
       </Grid>

     </>
   );
 }

}






function init_dateframe( props, callback, fromDatepicker ){

  if( props.dateframe == null ){
    props['dateframe'] = {type: 'Month',
                          start_date: null,
                          end_date: null,
                          date_str: null,
                        }
  }

  props.dateframe['start_date'] = get_current_date( props.dateframe )
  props.dateframe['end_date'] = get_end_date( props.dateframe )
  props.dateframe['date_str'] = dateframe_to_string( props.dateframe )
  props.dateframe['callback'] = callback
  props.dateframe['fromDatepicker'] = fromDatepicker

  props.dateframe['start'] = moment(props.dateframe['start_date']).format('YYYY-MM-DD')
  props.dateframe['end'] = moment(props.dateframe['end_date']).format('YYYY-MM-DD')

  return props

}

function update_dateframe( props, start_date ){
  //updates the dateframe based on the specified start date

  props.dateframe['start_date'] = start_date
  props.dateframe['end_date'] = get_end_date( props.dateframe )
  props.dateframe['date_str'] = dateframe_to_string( props.dateframe )

  props.dateframe['start'] = moment(props.dateframe['start_date']).format('YYYY-MM-DD')
  props.dateframe['end'] = moment(props.dateframe['end_date']).format('YYYY-MM-DD')

  return props
}



 /**
  * decrenments the month and possibly year
  * @param  {int } month      month number
  * @param  {int } year       year Number
  * @param  {Number} [offset=1] the number of months to decrenent
  * @return {lists}            list containing the month and year
  */
 export function decrement_month( month, year, offset=1 ){
   //returns the next month while dealing with overflow into the next year
   month = month - offset

   if( month <= -1 ){ return [12-offset, year-1]}
   return [month, year]
 }

 /**
  * increments the month and possibly year
  * @param  {int } month      month number
  * @param  {int } year       year Number
  * @param  {Number} [offset=1] the number of months to increments
  * @return {lists}            list containing the month and year
  */
 export function increment_month( month, year, offset=1 ){
   //returns the next month while dealing with overflow into the next year
   month = month + offset

   if( month >= 12 ){ return [0, year+1]}
   return [month, year]
 }


 /**
  * Determines the end date based ont he start date and specified date type_container
  * @param  {DATE} start_date Datetime object corresponding to the start of the time frame
  * @return {Date}            Datetime object corresponding to the end of the time frame
  */
 function get_end_date( props ){

   var temp
   var end_date

   switch(props.type.toLowerCase()) {
     case 'day':
       end_date = new Date(props.start_date);
       end_date.setDate( end_date.getDate() + 1);
       break;

     case 'week':
       end_date = new Date(props.start_date);
       end_date.setDate(end_date.getDate() + 6);
       break;

     case 'month':
       temp = increment_month(props.start_date.getMonth(),
                                     props.start_date.getFullYear());
       end_date = new Date(temp[1], temp[0], props.start_date.getDate());
       break;

     case 'quarter' :
       temp = increment_month( props.start_date.getMonth(),
                                    props.start_date.getFullYear(), 3);
       end_date = new Date(temp[1], temp[0], 1);
       break;

     case 'half' :
       temp = increment_month( props.start_date.getMonth(),
                                    props.start_date.getFullYear(), 6);
       end_date = new Date(temp[1], temp[0], 1);
       break;

     case 'year':
       end_date = new Date( props.start_date.getFullYear()+1,
                           props.start_date.getMonth(),
                           props.start_date.getDate());
       break



     default:
       console.log( "set-end_date - default state - shouldn't get here")
       break;
       // code block
   }


   return end_date
 }





// Normalize date based on date type i.e. months should always start
// ane end at the first of the month.
function normalize_date( date, type ){

  var temp
  var norm_date = date

  switch(type.toLowerCase()) {
    // case 'day':
    //   norm_date = new Date(date);
    //   norm_date.setDate( norm_date.getDate() + 1);
    //   break;
    //
    case 'week':
      temp = new Date()
      norm_date = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate() - temp.getDay());
      break;

    case 'month':
      norm_date = new Date(date.getFullYear(), date.getMonth(), 1);
      break;

    case 'quarter' :
      // console.log( 'quarter --- date', Math.floor(date.getMonth()/4) )
      norm_date = new Date(
        date.getFullYear(),
        Math.floor(date.getMonth()/3) *3,
        1);
      break;

    case 'half' :
      // console.log( date.getMonth()/6 )
      norm_date = new Date(
        date.getFullYear(),
        Math.floor(date.getMonth()/6) *6,
        1);
      break;

    case 'year':
      // console.log( 'normalize year date' )
      norm_date = new Date( date.getFullYear(), 0, 1);
      break

    default:
      // console.log( "set-end_date - default state - shouldn't get here")
      break;
      // code block
  }


    return norm_date
  }


 /**
  * returns the current date formatted based on the specified date type
  * @return {DATE } Datetime object corresponding to the current time formatted based on the type
  */
 function get_current_date( props ){
   //sets the date to the next time period and updates the excursions
   var start_date = new Date();
   var temp


   switch(props.type.toLowerCase()) {
     case 'day': break;

     case 'week':
       start_date = new Date(start_date);
       start_date.setDate(start_date.getDate() - start_date.getDay());
       break;

     case 'month':
       start_date = new Date(start_date.getFullYear(),
                             start_date.getMonth(),
                             1);
       break;

     case 'quarter' :
       temp = Math.floor(start_date.getMonth()/3)
       start_date = new Date( start_date.getFullYear(),
                              temp*3,
                              1);
       break;

     case 'half' :
       temp = Math.floor(start_date.getMonth()/6)
       start_date = new Date(start_date.getFullYear(),
                             temp*6 + 1,
                             1);
       break;

     case 'year':
       start_date = new Date(start_date.getFullYear(),
                             start_date.getMonth(),
                             start_date.getDate());
       break;

     default:
       console.log( "next - default state - shouldn't get here")
       break;
       // code block
       //

   }


   return start_date

 }


 /**
  * Increments the timeframe to the next timeframe based on the specified type. i.e. for months,
  * this will move to the next month. This function will populate labels and also execute a
  * provided function to update a page
  * @return {none}
  */
 function next( props ){
   //sets the date to the next time period and updates the excursions


   var start_date = props.dateframe.start_date
   var dates

   switch(props.dateframe.type.toLowerCase()) {
     case 'day':
       start_date = new Date(start_date);
       start_date.setDate(start_date.getDate() + 1 );
       break;

     case 'week':
       start_date = new Date(start_date);
       start_date.setDate(start_date.getDate() + 7);
       break;

     case 'month':
       dates = increment_month(start_date.getMonth(),
                                start_date.getFullYear());

       start_date = new Date(dates[1],
                              dates[0],
                              start_date.getDate());
       break;

     case 'quarter' :
       dates = increment_month(start_date.getMonth(),
                                start_date.getFullYear(),
                                3);

       start_date = new Date(dates[1], dates[0], 1);
       break;

     case 'half' :
       dates = increment_month( start_date.getMonth(),
                                  start_date.getFullYear(),
                                  6);

       start_date = new Date(dates[1], dates[0], 1);
       break

     case 'year':
       start_date = new Date(start_date.getFullYear()+1,
                             start_date.getMonth(),
                             start_date.getDate());
       break;

     default:
       console.log( "next - default state - shouldn't get here")
       break;
       // code block
   }

   props.dateframe['start_date'] = start_date
   props.dateframe['end_date'] = get_end_date( props.dateframe )
   props.dateframe['date_str'] = dateframe_to_string( props.dateframe )

   props.dateframe['start'] = moment(props.dateframe['start_date']).format('YYYY-MM-DD')
   props.dateframe['end'] = moment(props.dateframe['end_date']).format('YYYY-MM-DD')

   //execute the onclick/update function when provided
   if( props.dateframe.callback != null ){
     props.dateframe.callback( props )
   }
   return props
 }


 /**
  * Decrements the timeframe to the next timeframe based on the specified type. i.e. for months,
  * this will move to the previous month. This function will populate labels and also execute a
  * provided function to update a page
  * @return {none}
  */

 function prev( props ){
   //sets the date to the previous time period and updates the excursions

   var start_date = props.dateframe.start_date
   var dates

   switch(props.dateframe.type.toLowerCase()) {
     case 'day':
       start_date = new Date(start_date);
       start_date.setDate(start_date.getDate() - 1 );
       break;

     case 'week':
       start_date = new Date(start_date);
       start_date.setDate(start_date.getDate() - 7);
       break;

     case 'month':
       dates = decrement_month(start_date.getMonth(),
                                     start_date.getFullYear());
       start_date = new Date(dates[1], dates[0], start_date.getDate());
       break;

     case 'quarter' :
       dates = decrement_month(start_date.getMonth(),
                                      start_date.getFullYear(),
                                      3);
       start_date = new Date(dates[1], dates[0], 1);
       break;

     case 'half' :
       dates = decrement_month(start_date.getMonth(),
                                      start_date.getFullYear(),
                                      6);
       start_date = new Date(dates[1], dates[0], 1);
       break

     case 'year':
       start_date = new Date(start_date.getFullYear()-1,
                             start_date.getMonth(),
                             start_date.getDate());
       break;

     default:
       console.log( "prev - default state - shouldn't get here")
       break;
       // code block
   }

   props.dateframe['start_date'] = start_date
   props.dateframe['end_date'] = get_end_date( props.dateframe )
   props.dateframe['date_str'] = dateframe_to_string( props.dateframe )

   props.dateframe['start'] = moment(props.dateframe['start_date']).format('YYYY-MM-DD')
   props.dateframe['end'] = moment(props.dateframe['end_date']).format('YYYY-MM-DD')

   //execute the onclick/update function when provided
   if( props.dateframe.callback != null ){
     props.dateframe.callback( props )
   }

   return props
 }




 function dateframe_to_string( props ){
   //converts the current date attribute to string format based on the specifeid type

   var to_str = new date_to_string( props.start_date )
   var to_str2 = new date_to_string( props.end_date )

   var date_str = ''

   switch(props.type.toLowerCase()) {
     case 'datetime' :
       date_str = to_str.year() + '-' + to_str.month() + '-' + to_str.day()
       break;

     case 'day':
       date_str = to_str.day_of_the_week() + ' ' + to_str.abbr_month_str() + ' ' + to_str.day() + ', ' + to_str.year()
       break;

     case 'week' :
       date_str = to_str.abbr_month_str() + ' ' + to_str.day() + ' to ' + to_str2.abbr_month_str() + ' ' + to_str2.day() + ', ' + to_str.year()
       break;

     // case 'day':
     //   date_str = to_str.day_of_the_week() + ' ' + to_str.day() + ', ' + to_str.year()
     //   break;

     case 'month':
       date_str = to_str.month_str() + ' ' + to_str.year()
       break;

     case 'quarter' :
       date_str = to_str.quarter_str() + ', ' + to_str.year()
       break;

     case 'half' :
       date_str = to_str.half_str() + ', ' + to_str.year()
       break;

     case 'year':
       date_str = to_str.year()
       break;

     default:
       console.log( "date_to_string - default state - shouldn't get here")
       break;
       // code block
   }

   return date_str
 }


 class date_to_string{

     constructor( date ){
       this.date = date
     }

     day(){
       //returns the day
       return ('0' + this.date.getDate()).slice(-2)
     }

     day_of_the_week(){
       //returns the full day of the week name of the provided date

       const dow = ['Sunday', 'Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday']
       return dow[this.date.getDay()]

     }

     abbr_day_of_the_week(){
       //returns the full day of the week name of the provided date

       const dow = ['Sun', 'Mon', 'Tues','Wed','Thur','Fri','Sat']
       return dow[this.date.getDay()]

     }

     month(){
       //returns the day
       return ('0' + (this.date.getMonth()+1)).slice(-2)
     }

     month_str(){
       //returns the full month name of the provided date

       const month = ["January", "February", "March", "April", "May", "June",
                       "July", "August", "September", "October", "November", "December"];
       return month[this.date.getMonth()]
     }

     abbr_month_str(){
       //returns the full month name of the provided date

       const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
       return month[this.date.getMonth()]
     }

     quarter_str(){
       //returns the full month name of the provided date

       const quarters = ["Q1", "Q2", "Q3", "Q4"];
       return quarters[Math.floor(this.date.getMonth()/3)]
     }

     half_str(){
       //returns the full month name of the provided date

       const quarters = ["H1", "H2"];
       return quarters[Math.floor(this.date.getMonth()/6)]
     }


     year(){
       //returns the full year string
       return  this.date.getFullYear();
     }

 }





export  { init_dateframe,
          update_dateframe,

        };
