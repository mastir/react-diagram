import {point_sum} from "./Core/Util.js";
import {useContext} from "react";
import {CanvasContext} from "./Canvas.jsx";

export function Link({model, points, offsets}) {
    const canvas = useContext(CanvasContext);



    const curv = (model.curviness || 50) - 0;
    const controls = offsets ? offsets.map((o,i)=>point_sum(o.map(v=>v*curv), points[i])) : points;
    return <g>
        <path
            className={'rd-link'}
            stroke={model.color || '#4393E4'}
            strokeWidth={model.width || 2}
            fill={'none'}
            d={`M${points[0].join(' ')} C${controls[0].join(' ')}, ${controls[1].join(' ')}, ${points[1].join(' ')}`}
        />
    </g>;
}