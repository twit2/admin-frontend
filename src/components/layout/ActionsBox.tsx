import "./ActionsBox.scss";

interface Action {
    id: string;
    label: string;
    onClick: ()=>void;
    isDanger?: boolean;
}

interface ActionsBoxProps {
    items: Action[];
}

export const ActionsBox = (props: ActionsBoxProps)=>{
    return <div className="actions-box">
        { props.items.map(x => <div key={x.id} className={`action${x.isDanger ? ' danger' : ''}`} onClick={()=>x.onClick()}>{x.label}</div>) }
    </div>
}