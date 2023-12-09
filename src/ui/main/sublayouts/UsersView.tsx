import { useState } from "react";
import { PaneHeader } from "../../../components/layout/PaneHeader";
import { LoadingContainer, PartialUser } from "@twit2/std-library-fe";
import { Table } from "../../../components/layout/table/Table";

export const UsersView = ()=>{
    let [users, setUsers] = useState<PartialUser[]>();
    
    return <div className="view feed">
        <PaneHeader title="User Manager"/>
        { (!users) ? <LoadingContainer/> : <Table headers={[
            { name: "Username" },
            { name: "Id" }
        ]}/> } 
    </div>;
}