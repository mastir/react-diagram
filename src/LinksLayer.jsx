import {useContext, useEffect, useState} from "react";
import {EngineContext} from "./Diagram";

function LinkView({item}) {

    const source = item.source.slice(0,2);
    const target = item.target;
    return <g><path
        className={'rd-link'}
        stroke={item.color||'#4393E4'}
        strokeWidth={item.width || 2}
        fill={'none'}
        d={`M${source[0].join(' ')} C${source[1].join(' ')}, ${target[1].join(' ')}, ${target[0].join(' ')}`}
    /></g>;
}

export function LinksLayer() {
    const engine = useContext(EngineContext);
    const [items, setLinks] = useState([]);
    const [redraw, setDraw] = useState(false);
    const links = engine.links;
    links.items = items;
    useEffect(() => {
        links.update = setLinks;
        links.items = items;
        links.redraw = ()=>setDraw( r=>!r );
    }, [links]);
    return <svg style={{width:'100%',height:'100%',position:'absolute',top:0,left:0}}>
        {items.map( (l,i) => <LinkView key={i} item={l} engine={engine} redraw={l.ports === undefined ? redraw : null} />)}
    </svg>;
}