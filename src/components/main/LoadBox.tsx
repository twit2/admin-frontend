import { LoadingContainer } from "@twit2/std-library-fe";
import "./LoadBox.scss";

export const LoadBox = (props: { loading: boolean, label: string, onclick: ()=>void }) => {
    return <div className="ui-load-box">
        { props.loading ? <LoadingContainer/> : <span onClick={()=>props.onclick()}>{props.label}</span> }
    </div>
}