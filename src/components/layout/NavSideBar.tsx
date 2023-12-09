import "./NavSideBar.scss";

export interface SidebarItem {
    id: string;
    label: string;
    icon: string;
}

interface SidebarProps {
    onSelected: (id: string)=>void;
    selectedId?: string;
}

export const NavSideBar = (props: SidebarProps)=>{
    const items : SidebarItem[] = [
        {
            id: "users",
            label: "Users",
            icon: "group"
        },
        {
            id: "posts",
            label: "Posts",
            icon: "reply"
        }
    ];

    return <div className="nav-sidebar">
        <div className="title">
            <div className="text">Twit2</div>
            <div className="subtext">ADMINISTRATION</div>
        </div>
        <div className="items">
            { items.map(x => <div className={"item" + ((x.id === props.selectedId) ? ' selected' : '')} key={x.id} onClick={()=>{
                props.onSelected(x.id);
            }}>
                <div className={"icon " + x.icon}></div>
                <div className="label">{x.label}</div>
            </div>) }
        </div>
    </div>;
}