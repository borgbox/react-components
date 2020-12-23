import React, { useState, useEffect } from 'react'
import classNames from 'classnames';
import './style.css'

interface IRadialChart {
    color?: string,
    textColor?: string,
    value: number,
    unit?: string,
    animationTime?:number,
    max?:number,
    min?:number,
    needleColor?: string,
    thicknessRation?: number,
    showNeedle?: boolean,
}

const RadialGauge = ({ showNeedle= true, color='#818893',needleColor='red', min=0, max=100, value, textColor='#d1dbe7',thicknessRation = 27, unit, animationTime=900 }: IRadialChart) => {

    const [strokeLength, setStrokeLength] = useState(0);
    const [valueCounter, setValueCounter] = useState(0);
    const radius = 80;
    const strokeWidth = 10;

    const dimension = 180;
    const circleRadius = Math.min(radius, 85); 
    const circumference = 2 * 3.14 * circleRadius;


    useEffect(() => {
        setStrokeLength(circumference / max * value);
        animateValue(valueCounter > 0 ? valueCounter : 0,value,animationTime);
    }, [value])

    const _getPathValues = (value: number) => {
        if (value < min) value = min;
        if (value > max) value = max;
        let width = dimension;
        let height = dimension;

        const dx = 0;
        const dy = 0;

        const alpha =
            (1 - (value - min) / (max - min)) *
            Math.PI;
        const Ro = width / 2 - width / 10;
        const Ri = Ro - width / thicknessRation;

        const Cx = width / 2 + dx;
        const Cy = height / 2 + dy;

        const Xo = width / 2 + dx + Ro * Math.cos(alpha);
        const Yo =
            height - (height - Cy) - Ro * Math.sin(alpha);
        const Xi = width / 2 + dx + Ri * Math.cos(alpha);
        const Yi =
            height - (height - Cy) - Ri * Math.sin(alpha);

        return { alpha, Ro, Ri, Cx, Cy, Xo, Yo, Xi, Yi };
    };

    const renderNeedle = (value: number) => {
        const { Cx, Cy } = _getPathValues(valueCounter);
        let needleWidth = 4;
        let needleSharp = true;
        let diameter = 15;
        let Cyy = Cy * 1
        let Cxx = Cx * 1
        let
            x1 = Cxx,
            y1 = Cyy - (needleWidth / 2),
            x2 = Cxx,
            y2 = Cyy + (needleWidth / 2),
            x3 = diameter,
            y3 = Cyy,
            needleAngle = (360 * ( value / max )) - 86.25

        let needleElm = null;
        if (needleSharp) {
            needleElm = (
                <polygon
                    points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
                    fill={needleColor}
                >

                </polygon>
            );
        } else {
            needleElm = (
                <line
                    x1={Cx}
                    y1={Cy}
                    x2={diameter}
                    y2={Cy}
                    fill='none'
                    strokeWidth={needleWidth}
                    stroke={needleColor}
                />
            );
        }

        return (
            <g className='needle'>
                <g transform={`rotate(${needleAngle} ${Cx} ${Cy})`}>
                    {needleElm}
                </g>
                <circle
                    cx={Cx}
                    cy={Cy}
                    r={2}
                    fill={needleColor}
                >
                </circle>
            </g>
        )

    }

    const  animateValue = (start:number, end:number, duration:number)=>{
        let startTimestamp:any = null;
        const step = (timestamp:any) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          
          setValueCounter(Math.floor(progress * (end - start) + start));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }

    return (
        
        <div
            className={classNames('radial-gauge', {
                'no-progress': strokeLength === 0
            })}
        >
            <svg viewBox="0 0 180 180" width={dimension} height={dimension}>
                <circle
                    className="radial-gauge-total"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    cx="90"
                    cy="90"
                    r={circleRadius}
                />
                <circle
                    className="radial-gauge-progress"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${strokeLength},${circumference}`}
                    strokeLinecap="square"
                    fill="none"
                    cx="90"
                    cy="90"
                    r={circleRadius}
                />
                   {showNeedle && renderNeedle(valueCounter)}
                 <text x="50%" y="65%" fill={textColor} fontSize='2.5em' dominantBaseline="middle" textAnchor="middle">{valueCounter}</text>  
        <text x="50%" y="72%" fill={textColor} fillOpacity={.5} fontSize='1em'  dominantBaseline="hanging" textAnchor="middle">{unit}</text> 
            </svg>
        </div>
    )
}

export default RadialGauge
