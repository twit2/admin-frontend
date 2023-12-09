import "./Table.scss";

export interface TableHeader {
    name: string;
    width?: number|string;
}

export interface TableData {
    type: "string"|"link";
}

export interface TableLink extends TableData {
    type: "link";
    source: string;
    label: string;
}

export interface TableProps {
    headers: TableHeader[];
    data?: string[][];
}

export const Table = (props: TableProps)=>{
    return <div className="ui-table">
        <div className="row hdr" style={{ gridTemplateColumns: `repeat(${props.headers.length}, 1fr)` }}>
            {props.headers.map((x, i) => <div className="col" key={i} style={{width: x.width ?? '100%'}}>
                {x.name}
            </div>)}
        </div>
        { ((props.data) ?? []).map((x, i, a) => <div className="row" key={i} style={{ gridTemplateColumns: `repeat(${props.headers.length}, 1fr)` }}>
            { (a[i].map((cx, ci) => <div className="col" key={ci} style={{width: props.headers[ci].width ?? '100%'}}>{cx}</div>)) }
        </div>) }
    </div>
}