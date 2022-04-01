/**
 * Binmap Chart Components
 * ========================
 * Components used when generating the Binmap plots
 *
 * Author : Nik Sumikawa and Matt Nero
 * Date : Aug 21, 2019
 */

import React from 'react';


export function Axis( props ){

  if( props.visible !== true ) return null

  return (
    <>
      <Xaxis
        x_range={props.wafer_struct.format.x_range}
        width={props.wafer_struct.format.width}
        font_size="30"
        />

      <Yaxis
        y_range={props.wafer_struct.format.y_range}
        height={props.wafer_struct.format.height}
        font_size="30"
        />
    </>

  )
}


// X and Y Axis
function getTicks(max, min = 0) {
    var steps = [
            1, 5, 10, 20
        ],
        step,
        i;

    for (i = 0; i < steps.length; i++) {
        step = steps[i];
        if (((max - min) / step) <= 20) {
            break;
        }
    }

    var ticks = [],
        c = step;
    while (c < (max - step)) {
        ticks.push(c)
        c = c + step;
    }
    return ticks;
}

function XTicks(props) {
    var ticks = getTicks(props.x_max);

    var elements = []
    ticks.forEach(function(v) {
        elements.push(<text key={"xtext" + v} x="0" y="0"
                            fontSize={props.font_size}
                            textAnchor="middle"
                            cursor="default"
                            transform={"scale(1, -1) translate(" + (
                                          v * props.width) + ", " + (
                                          40) + ")"}>
            {v}
        </text>);
    })
    return elements;
}

function Xaxis(props) {

    return (<g>
        <line x1={props.width * (props.x_range[0] - 1)} x2={props.width * (props.x_range[1] - 1)} y1="-10" y2="-10" style={{
                stroke: "black",
                strokeWidth: "5px"
            }}/>

        <XTicks x_max={props.x_range[1]} width={props.width} font_size={props.font_size}/>
    </g>);
}

// transform={"scale(1, -1) translate(" + (
//             (i + 0.5) * props.width) + ", " + (
//             40) + ")"}>

function XTicksOrdinal(props) {

    var elements = [];
    props.labels.forEach(function(l, i) {

      //determine the label rotation based on the rotate prop
      var transform = `scale(1, -1) translate(${(i + 0.5) * props.width}, 40) `
      if( props.rotate_90 === true ){
        transform = `scale(1, -1) translate(${(i) * props.width}, 40) rotate(90)`
      }

      elements.push(<text key={"xtext" + i} x="0" y="0"
                          fontSize={props.font_size}
                          textAnchor="middle"
                          cursor="default"
                          transform={transform}>
                        {l}
                      </text>)
    })
    return elements;
}

function XaxisOrdinal(props) {
    return (<React.Fragment>
        <line x1={0} x2={props.width * props.labels.length} y1="-10" y2="-10" style={{
                stroke: "black",
                strokeWidth: "5px"
            }}/>
        <XTicksOrdinal  labels={props.labels}
                        width={props.width}
                        font_size={props.font_size}
                        rotate_90={props.rotate_90}/>
    </React.Fragment>)
}

function YTicks(props) {
    var ticks = getTicks(props.y_max);
    var elements = []
    ticks.forEach(function(v) {
        elements.push(<text key={"ytext" + v} x="0" y="0" fontSize={props.font_size} textAnchor="right" cursor="default" transform={"scale(1, -1) translate(" + -50 + ", " + (-v * props.height) + ")"}>
            {v}
        </text>)
    })
    return elements;
}

function Yaxis(props) {
    return (<g>
        <line y1={props.height * (props.y_range[0] - 1)} y2={props.height * (props.y_range[1] - 1)} x1="-10" x2="-10" style={{
                stroke: "black",
                strokeWidth: "5px"
            }}/>

        <YTicks y_max={props.y_range[1]} height={props.height} font_size={props.font_size}/>
    </g>);
}


// export default {XTicks,
//                 YTicks,
//                 Xaxis,
//                 Yaxis,
//                 XaxisOrdinal,
//                 XTicksOrdinal,
//                 getTicks,
//                 }

export {XTicks,
        YTicks,
        Xaxis,
        Yaxis,
        XaxisOrdinal,
        XTicksOrdinal,
        getTicks,
        }
