import { LoadingContainer, PartialUser } from "@twit2/std-library-fe";
import { AvatarBox } from "../layout/AvatarBox";
import "./UserPane.scss";
import { PropertiesBox } from "../layout/PropertiesBox";
import { ActionsBox } from "../layout/ActionsBox";
import { useState } from "react";
import { UserManager } from "../../app/UserManager";

export const UserPane = (props: { user: PartialUser, onUpdate: (user: PartialUser)=>void }) => {
    let [busy, setBusy] = useState(false);

    return <div className="user-pane">
        <div className="user">
            <AvatarBox user={props.user}/>
            <div className="display-name">
                { (props.user.displayName) || props.user.username }
            </div>
            { (props.user.displayName) ? <div className="username">@{props.user.username}</div> : '' }
        </div>
        
        { busy ? <LoadingContainer/> : <>
            <div className="hdr"><b>User Info</b></div>
            <PropertiesBox data={[
                { key: "Id", value: props.user.id },
                { key: "Join Date", value: props.user.dateJoined },
                { key: "Verified", value: props.user.verified ? "Yes" : "No" },
            ]}/>

            <div className="hdr"><b>Actions</b></div>
            <ActionsBox items={[
                { id: "visit", label: "Visit Profile", onClick: ()=>{
                    const host = window.location.host.substring(window.location.host.indexOf('.') + 1);
                    window.open(`${window.location.protocol}//${host}/user/@${props.user.username}`);
                } },
                { id: "verify", label: props.user.verified ? "Unverify" : "Make Verified", onClick: async()=>{
                    setBusy(true);
                    UserManager.setVerified(props.user.id, !props.user.verified).then((v)=>{
                        setBusy(false);
                        props.onUpdate(v);
                    });
                } },
                { id: "delete", label: "Delete", isDanger: true, onClick: ()=>{} }
            ]}/>
        </> }
    </div>
}