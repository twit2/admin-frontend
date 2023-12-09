import { PartialUser } from "@twit2/std-library-fe";
import { AvatarBox } from "../layout/AvatarBox";
import "./UserPane.scss";
import { PropertiesBox } from "../layout/PropertiesBox";
import { ActionsBox } from "../layout/ActionsBox";

export const UserPane = (props: { user: PartialUser }) => {
    return <div className="user-pane">
        <div className="user">
            <AvatarBox user={props.user}/>
            <div className="display-name">
                { (props.user.displayName) || props.user.username }
            </div>
            { (props.user.displayName) ? <div className="username">@{props.user.username}</div> : '' }
        </div>
        
        <div className="hdr"><b>User Info</b></div>
        <PropertiesBox data={[
            { key: "Id", value: props.user.id },
            { key: "Join Date", value: props.user.dateJoined },
        ]}/>

        <div className="hdr"><b>Actions</b></div>
        <ActionsBox items={[
            { id: "visit", label: "Visit Profile", onClick: ()=>{
                const host = window.location.host.substring(window.location.host.indexOf('.') + 1);
                window.open(`${window.location.protocol}//${host}/user/@${props.user.username}`);
            } },
            { id: "verify", label: "Make Verified", onClick: ()=>{} },
            { id: "delete", label: "Delete", isDanger: true, onClick: ()=>{} }
        ]}/>
    </div>
}