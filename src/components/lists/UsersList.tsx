import { useEffect, useState } from "react";
import "./UsersList.scss";
import { LoadingContainer, PartialUser } from "@twit2/std-library-fe";
import { UserManager } from "../../app/UserManager";
import { AppContext } from "../../app/AppContext";
import { AvatarBox } from "../layout/AvatarBox";
import { LoadBox } from "../main/LoadBox";

const PAGE_SIZE = 10;

export const UsersList = (props: { onselect?: (user: PartialUser)=>void }) => {
    let [canLoad, setCanLoad] = useState(true);
    let [loading, setLoading] = useState(false);
    let [users, setUsers] = useState<PartialUser[]>();
    let [selected, setSelected] = useState("");
    let [page, setPage] = useState(0);

    useEffect(()=>{
        setLoading(true);

        (async ()=>{
            try {
                const resp = await UserManager.getLatestProfiles(page);
                
                setUsers([
                    ...users ?? [],
                    ...resp.data as PartialUser[]
                ]);

            } catch(e) {
                AppContext.ui.createDlg({ title: "Error", content: "Failed to fetch users!" });
                console.error(e);
            }

            setLoading(false);

            if(users) {
                if((users.length % PAGE_SIZE) !== 0)
                    setCanLoad(false);
            }
        })();
    }, [page]);
    
    return (!users) ? <LoadingContainer/> : <div className="ui-user-list">
        { (users ?? []).map(x => <div className={`profile${(selected === x.id) ? ' selected' : ''}`} key={x.id} onClick={()=>{
            if(props.onselect)
                props.onselect(x);

            setSelected(x.id);
        }}>
            <AvatarBox user={x}/>
            <div className="name">@{x.username}{(x.displayName) ? ` (${x.displayName})` : ''}</div>
        </div>) }
        { (canLoad) ? <LoadBox label="Load More" onclick={() => {
            setPage(page + 1);
        }} loading={loading}/> : '' }
    </div>;
}