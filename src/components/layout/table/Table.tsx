import "./Table.scss";

interface TableHeader {
    name: string;
    width?: number;
}

interface TableData {
    type: "string"|"link";
}

interface TableLink extends TableData {
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
        <div className="hdr">
            {props.headers.map((x, i) => <div key={i} style={{width: x.width ?? '100%'}}>
                {x.name}
            </div>)}
        </div>
        { ((props.data) ?? []).map((x, i) => <div className="row" key={i}>
            
        </div>) }
    </div>
}