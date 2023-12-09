import { PaneHeader } from "../../../components/layout/PaneHeader";
import "./UsersView.scss";
import { UsersList } from "../../../components/lists/UsersList";
import { useState } from "react";
import { PartialUser } from "@twit2/std-library-fe";
import { UserPane } from "../../../components/users/UserPane";

export const UsersView = ()=>{
    let [selectedUser, setSelectedUser] = useState<PartialUser>();

    return <div className="view users">
        <div className="user-content">
            <PaneHeader title="User Manager"/>
            <UsersList onselect={(user) => {
                setSelectedUser(user);
            }}/>
        </div>
        { (selectedUser) ? <UserPane user={selectedUser}/> : '' }
    </div>;
}