import React, {useContext, useEffect, useState} from "react";
import {EngineContext} from "./Diagram";
import {Link} from "./Link.jsx";


export function LinksLayer({links=[], component=Link}) {
    const engine = useContext(EngineContext);
    const [items, setLinks] = useState(links);
    const [redraw, setDraw] = useState(false);
    const model = engine.links;
    model.items = items;
    useEffect(() => {
        model.update = setLinks;
        model.items = items;
        model.redraw = ()=>setDraw( r=>!r );
    }, [model]);
    const ITEM = component
    return <svg style={{width:'100%',height:'100%',position:'absolute',top:0,left:0}}>
        {items.map(
            (l,i) => <ITEM
                key={i}
                model={l.model}
                points={l.points}
                offsets={l.offsets}
                source={l.source}
                target={l.target}
                redraw={!l.target ? redraw : null} />
        )}
    </svg>;
}