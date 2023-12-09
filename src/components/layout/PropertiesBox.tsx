import "./PropertiesBox.scss";

export const PropertiesBox = (props: { data: ({ key: string, value: string })[] }) => {
    return <div className="props-box">
        {props.data.map(x => <div key={x.key} className="row">
            <span className="key">{x.key}: </span>
            <span className="value">{x.value}</span>
        </div>)}
    </div>
}