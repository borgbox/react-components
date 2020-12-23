import React, { useState, useEffect } from 'react'
import './style.css'
//global unique key for every gauge (needed for SVG groups to stay separated)
let uniqueId = 0;

export interface IGaugeProps {
    thicknessRation?: number,
    showValue?: boolean,
    showNeedle?: boolean,
    needleColor?: string,
    animated?: boolean,
    label: string;
    min?: number;
    max?: number;
    value: number;
    width: number;
    height: number;
    minMaxLabelsOffset?: number;
    minTxt?: string;
    maxTxt?: string;
    color?: string;
    topLabelStyle?: any;
    valueLabelStyle?: any;
    unitLabelStyle?: any;
    minMaxLabelStyle?: any;
    suffix?: string,
    animationTime?: number
}

const Gauge = ({ animationTime = 900, animated = true, needleColor = 'red', showValue = true, showNeedle = false, thicknessRation = 27, label = '', min = 0, max = 100, value = 50, width = 400, height = 320, minMaxLabelsOffset = 25, minTxt, maxTxt, color = '#818893', topLabelStyle = {
    textAnchor: "middle",
    fill: "#999999",
    stroke: "none",
    fontStyle: "normal",
    fontVariant: "normal",
    fontWeight: "bold",
    fontStretch: "normal",
    lineHeight: "normal",
    fillOpacity: 1,
},
unitLabelStyle = {
    textAnchor: "middle",
    fill: "#fff",
    stroke: "none",
    fontSize: '1em',
    fontStyle: "normal",
    fontVariant: "normal",
    fontWeight: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    fillOpacity: .5,
}, valueLabelStyle = {
    textAnchor: "middle",
    fill: "#fff",
    stroke: "none",
    fontSize: '2em',
    fontStyle: "normal",
    fontVariant: "normal",
    fontWeight: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    fillOpacity: 1,
}, minMaxLabelStyle = {
    textAnchor: "middle",
    fill: "#999999",
    stroke: "none",
    fontStyle: "normal",
    fontVariant: "normal",
    fontWeight: "normal",
    fontStretch: "normal",
    fontSize: 20,
    lineHeight: "normal",
    fillOpacity: 1,
}, suffix = '' }: IGaugeProps) => {

    const [valueCounter, setValueCounter] = useState(0);
    const [uniqueFilterId, setUniqueFilterId] = useState('')

    useEffect(() => {
        setValueCounter(value);
        if (animated) {
            animateValue(valueCounter > 0 ? valueCounter : 0, value, animationTime);
        }
    }, [value])

    const animateValue = (start: number, end: number, duration: number) => {
        let startTimestamp: any = null;
        const step = (timestamp: any) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            setValueCounter(Math.floor(progress * (end - start) + start));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const _getPathValues = (value: number) => {
        if (value < min) value = min;
        if (value > max) value = max;

        const dx = 0;
        const dy = 0;

        const alpha =
            (1 - (value - min) / (max - min)) *
            Math.PI;
        const Ro = width / 2 - width / 10;
        const Ri = Ro - width / thicknessRation;

        const Cx = width / 2 + dx;
        const Cy = height / 1.25 + dy;

        const Xo = width / 2 + dx + Ro * Math.cos(alpha);
        const Yo =
            height - (height - Cy) - Ro * Math.sin(alpha);
        const Xi = width / 2 + dx + Ri * Math.cos(alpha);
        const Yi =
            height - (height - Cy) - Ri * Math.sin(alpha);

        return { alpha, Ro, Ri, Cx, Cy, Xo, Yo, Xi, Yi };
    };

    const _getPath = () => {
        const { Ro, Ri, Cx, Cy, Xo, Yo, Xi, Yi } = _getPathValues(valueCounter);

        let path = `M${Cx - Ri},${Cy} `;
        path += `L${Cx - Ro},${Cy} `;
        path += `A${Ro},${Ro} 0 0 1 ${Xo},${Yo} `;
        path += `L${Xi},${Yi} `;
        path += `A${Ri},${Ri} 0 0 0 ${Cx - Ri},${Cy} `;
        path += "Z ";

        return path;
    };

    const _getPathValue = (value: number) => {
        const { Ro, Ri, Cx, Cy, Xo, Yo, Xi, Yi } = _getPathValues(value);

        let path = `M${Cx - Ri},${Cy} `;
        path += `L${Cx - Ro},${Cy} `;
        path += `A${Ro},${Ro} 0 0 1 ${Xo},${Yo} `;
        path += `L${Xi},${Yi} `;
        path += `A${Ri},${Ri} 0 0 0 ${Cx - Ri},${Cy} `;
        path += "Z ";

        return path;
    };

    const renderNeedle = (value: number) => {
        const { Cx, Cy } = _getPathValues(valueCounter);
        let needleWidth = 4;
        let needleSharp = true;
        let diameter = 25;
        let Cyy = Cy * 1
        let Cxx = Cx * 1
        let
            x1 = Cxx,
            y1 = Cyy - (needleWidth / 2),
            x2 = Cxx,
            y2 = Cyy + (needleWidth / 2),
            x3 = diameter,
            y3 = Cyy,
            needleAngle = (180 * value) / max;

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
    const { Cx, Ro, Ri, Xo, Cy, Xi } = _getPathValues(max);
    if (!uniqueFilterId) setUniqueFilterId(`filter_${uniqueId++}`);

    return (
        <svg
            height="100%"
            version="1.1"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                width: width,
                height: height,
                overflow: "hidden",
                position: "relative",
                left: 0,
                top: 0,
            }}
        >
            <defs>
                <filter id={uniqueFilterId}>
                    <feOffset dx="0" dy="3" />
                    <feGaussianBlur result="offset-blur" stdDeviation="5" />
                    <feComposite
                        operator="out"
                        in="SourceGraphic"
                        in2="offset-blur"
                        result="inverse"
                    />
                    <feFlood floodColor="black" floodOpacity="0.2" result="color" />
                    <feComposite
                        operator="in"
                        in="color"
                        in2="inverse"
                        result="shadow"
                    />
                    <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                </filter>
            </defs>
            <path
                className='gauge-total'
                fill={color}
                stroke="none"
                strokeLinecap="round"
                d={_getPathValue(max)}
                filter={`url(#${uniqueFilterId})`}
            />
            <path
                strokeLinecap="round"
                className='gauge-progress'
                fill={color}
                stroke="none"
                d={_getPath()}
                filter={`url(#${uniqueFilterId})`}
            />

            {showNeedle && renderNeedle(valueCounter)}

            <text
                x={width / 2}
                y={height / 8}
                textAnchor="middle"
                style={topLabelStyle}
            >
                {label}
            </text>
            <text
                x={width / 2}
                y={(height / 5) * 3}
                textAnchor="middle"
                style={valueLabelStyle}
            >
                {showValue && (valueCounter)}
            </text>
            <text
                x={width / 2}
                y={(height / 5) * 3.55}
                textAnchor="middle"
                style={unitLabelStyle}
            >
                {showValue && suffix}
            </text>            
            <text
                x={(Cx - Ro + (Cx - Ri)) / 2}
                y={Cy + minMaxLabelsOffset}
                textAnchor="middle"
                style={minMaxLabelStyle}
            >
                {minTxt || min}
            </text>
            <text
                x={(Xo + Xi) / 2}
                y={Cy + minMaxLabelsOffset}
                textAnchor="middle"
                style={minMaxLabelStyle}
            >
                {maxTxt || max}
            </text>

        </svg>


    )
}

export default Gauge
