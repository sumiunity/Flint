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


import moment from 'moment';





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
 function get_end_date( start_date, type ){

   var temp
   var end_date

   switch(type.toLowerCase()) {
     case 'day':
       end_date = new Date(start_date);
       end_date.setDate( end_date.getDate() + 1);
       break;

     case 'week':
       end_date = new Date(start_date);
       end_date.setDate(end_date.getDate() + 6);
       break;

     case 'month':
       temp = increment_month(
         start_date.getMonth(),
         start_date.getFullYear());

       end_date = new Date(temp[1], temp[0], start_date.getDate());
       break;

     case 'quarter' :
       temp = increment_month(
         start_date.getMonth(),
         start_date.getFullYear(), 3);

       end_date = new Date(temp[1], temp[0], 1);
       break;

     case 'half' :
       temp = increment_month(
         start_date.getMonth(),
         start_date.getFullYear(), 6);

       end_date = new Date(temp[1], temp[0], 1);
       break;

     case 'year':
       end_date = new Date(
         start_date.getFullYear()+1,
         start_date.getMonth(),
         start_date.getDate());
       break



     default:
       console.log( "set-end_date - default state - shouldn't get here")
       break;
       // code block
   }


   return end_date
 }





// // Normalize date based on date type i.e. months should always start
// // ane end at the first of the month.
// function normalize_date( date, type ){
//
//   var temp
//   var norm_date = date
//
//   switch(type.toLowerCase()) {
//     // case 'day':
//     //   norm_date = new Date(date);
//     //   norm_date.setDate( norm_date.getDate() + 1);
//     //   break;
//     //
//     case 'week':
//       temp = new Date()
//       norm_date = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate() - temp.getDay());
//       break;
//
//     case 'month':
//       norm_date = new Date(date.getFullYear(), date.getMonth(), 1);
//       break;
//
//     case 'quarter' :
//       // console.log( 'quarter --- date', Math.floor(date.getMonth()/4) )
//       norm_date = new Date(
//         date.getFullYear(),
//         Math.floor(date.getMonth()/3) *3,
//         1);
//       break;
//
//     case 'half' :
//       // console.log( date.getMonth()/6 )
//       norm_date = new Date(
//         date.getFullYear(),
//         Math.floor(date.getMonth()/6) *6,
//         1);
//       break;
//
//     case 'year':
//       // console.log( 'normalize year date' )
//       norm_date = new Date( date.getFullYear(), 0, 1);
//       break
//
//     default:
//       // console.log( "set-end_date - default state - shouldn't get here")
//       break;
//       // code block
//   }
//
//
//     return norm_date
//   }


/**
 * returns the current date formatted based on the specified date type
 * @return {DATE } Datetime object corresponding to the current time formatted based on the type
 */
export function init_date( type, date ){

  //sets the date to the next time period and updates the excursions
  var start_date = date
  if( date === undefined ) start_date = new Date();

  var temp


  switch(type.toLowerCase()) {
    case 'day': break;

    case 'week':
      start_date = new Date(start_date);
      start_date.setDate(start_date.getDate() - start_date.getDay());
      break;

    case 'month':
      start_date = new Date(
        start_date.getFullYear(),
        start_date.getMonth(),
        1);
      break;

    case 'quarter' :
      temp = Math.floor(start_date.getMonth()/3)
      start_date = new Date(
        start_date.getFullYear(),
         temp*3,
         1);
      break;

    case 'half' :
      temp = Math.floor(start_date.getMonth()/6)
      start_date = new Date(
        start_date.getFullYear(),
        temp*6 + 1,
        1);
      break;

    case 'year':
      start_date = new Date(
        start_date.getFullYear(),
        start_date.getMonth(),
        start_date.getDate());
      break;

    default:
      console.log( "next - default state - shouldn't get here")
      break;
      // code block
      //

  }


  const end_date = get_end_date( start_date, type )


  return {
    start_datetime: start_date,
    end_datetime: end_date,
    start: moment(start_date).format('YYYY-MM-DD'),
    end: moment(end_date).add(1, 'days').format('YYYY-MM-DD'),
    date_str: dateframe_to_string(start_date, end_date, type)
  }

}


/**
 * Increments the timeframe to the next timeframe based on the specified type. i.e. for months,
 * this will move to the next month. This function will populate labels and also execute a
 * provided function to update a page
 * @return {none}
 */
export function next_date( date, type ){
  //sets the date to the next time period and updates the excursions

  var start_date = date
  var dates

  switch(type.toLowerCase()) {
    case 'day':
      start_date = new Date(start_date);
      start_date.setDate(start_date.getDate() + 1 );
      break;

    case 'week':
      start_date = new Date(start_date);
      start_date.setDate(start_date.getDate() + 7);
      break;

    case 'month':
      dates = increment_month(
        start_date.getMonth(),
        start_date.getFullYear());

      start_date = new Date(
        dates[1],
         dates[0],
         start_date.getDate());
      break;

    case 'quarter' :
      dates = increment_month(
        start_date.getMonth(),
         start_date.getFullYear(),
         3);

      start_date = new Date(dates[1], dates[0], 1);
      break;

    case 'half' :
      dates = increment_month(
        start_date.getMonth(),
         start_date.getFullYear(),
         6);

      start_date = new Date(dates[1], dates[0], 1);
      break

    case 'year':
      start_date = new Date(
        start_date.getFullYear()+1,
        start_date.getMonth(),
        start_date.getDate());
      break;

    default:
      console.log( "next - default state - shouldn't get here")
      break;
      // code block
  }

  const end_date = get_end_date( start_date, type )


  return {
    start_datetime: start_date,
    end_datetime: end_date,
    start: moment(start_date).format('YYYY-MM-DD'),
    end: moment(end_date).add(1, 'days').format('YYYY-MM-DD'),
    date_str: dateframe_to_string(start_date, end_date, type)
  }

}



/**
 * Decrements the timeframe to the next timeframe based on the specified type. i.e. for months,
 * this will move to the previous month. This function will populate labels and also execute a
 * provided function to update a page
 * @return {none}
 */

export function prev_date( date, type ){
  //sets the date to the previous time period and updates the excursions

  var start_date = date
  var dates

  switch(type.toLowerCase()) {
    case 'day':
      start_date = new Date(start_date);
      start_date.setDate(start_date.getDate() - 1 );
      break;

    case 'week':
      start_date = new Date(start_date);
      start_date.setDate(start_date.getDate() - 7);
      break;

    case 'month':
      dates = decrement_month(
        start_date.getMonth(),
        start_date.getFullYear());
      start_date = new Date(dates[1], dates[0], start_date.getDate());
      break;

    case 'quarter' :
      dates = decrement_month(
        start_date.getMonth(),
       start_date.getFullYear(),
       3);
      start_date = new Date(dates[1], dates[0], 1);
      break;

    case 'half' :
      dates = decrement_month(
        start_date.getMonth(),
         start_date.getFullYear(),
           6);
      start_date = new Date(dates[1], dates[0], 1);
      break

    case 'year':
      start_date = new Date(
        start_date.getFullYear()-1,
        start_date.getMonth(),
        start_date.getDate());
      break;

    default:
      console.log( "prev - default state - shouldn't get here")
      break;
      // code block
  }

  const end_date = get_end_date( start_date, type )

  return {
    start_datetime: start_date,
    end_datetime: end_date,
    start: moment(start_date).format('YYYY-MM-DD'),
    end: moment(end_date).add(1, 'days').format('YYYY-MM-DD'),
    date_str: dateframe_to_string(start_date, end_date, type)
  }


}

function dateframe_to_string( start_date, end_date, type ){
  //converts the current date attribute to string format based on the specifeid type

  var to_str = new date_to_string( start_date )
  var to_str2 = new date_to_string( end_date )

  var date_str = ''

  switch(type.toLowerCase()) {
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
