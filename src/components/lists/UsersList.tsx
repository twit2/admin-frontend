import { useEffect, useState } from "react";
import "./UsersList.scss";
import { LoadingContainer, PartialUser } from "@twit2/std-library-fe";
import { UserManager } from "../../app/UserManager";
import { AppContext } from "../../app/AppContext";
import { AvatarBox } from "../layout/AvatarBox";

export const UsersList = (props: { onselect?: (user: PartialUser)=>void }) => {
    let [users, setUsers] = useState<PartialUser[]>();
    let [selected, setSelected] = useState("");
    let [page, setPage] = useState(0);

    useEffect(()=>{
        (async ()=>{
            try {
                setUsers((await UserManager.getLatestProfiles(page)).data);
            } catch(e) {
                AppContext.ui.createDlg({ title: "Error", content: "Failed to fetch users!" });
                console.error(e);
            }
        })();
    }, [page]);
    
    return (!users) ? <LoadingContainer/> : <div className="ui-user-list">
        { users.map(x => <div className={`profile${(selected === x.id) ? ' selected' : ''}`} key={x.id} onClick={()=>{
            if(props.onselect)
                props.onselect(x);

            setSelected(x.id);
        }}>
            <AvatarBox user={x}/>
            <div className="name">@{x.username}{(x.displayName) ? ` (${x.displayName})` : ''}</div>
        </div>) }
    </div>;
}