import "./PaneHeader.scss";

export const PaneHeader = (props: { title: string }) => {
    return <div className="ui-pane-header">{props.title}</div>
}