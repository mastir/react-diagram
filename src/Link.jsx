import {point_sum} from "./Core/Util.js";

export function Link({style, points, offsets}) {
    const curv = (style.curviness || 50) - 0;
    const controls = offsets ? offsets.map((o,i)=>point_sum(o.map(v=>v*curv), points[i])) : points;
    return <g>
        <path
            className={'rd-link'}
            stroke={style.color || '#4393E4'}
            strokeWidth={style.width || 2}
            fill={'none'}
            d={`M${points[0].join(' ')} C${controls[0].join(' ')}, ${controls[1].join(' ')}, ${points[1].join(' ')}`}
        />
    </g>;
}