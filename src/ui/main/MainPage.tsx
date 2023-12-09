// Main Page
import { useEffect, useState } from "react";
import { LoadingContainer } from "@twit2/std-library-fe";
import "./MainPage.scss";
import { PartialUser } from "@twit2/std-library-fe";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../../app/AppContext";
import { UserManager } from "../../app/UserManager";
import { APIError } from "@twit2/std-library-fe";
import { NavSideBar } from "../../components/layout/NavSideBar";

/**
 * Renders the main page.
 * @returns The main page.
 */
export const MainPage = ()=> {
    const navigate = useNavigate();
    const [fetchBusy, setFetchBusy] = useState(false);
    const [user, setUser] = useState<PartialUser>();
    const [tab, setTab] = useState("");

    // Fetch user profile
    useEffect(()=>{
        const fetchData = async()=> {
            if(!fetchBusy)
                setFetchBusy(true);
            else
                return;

            try {
                const fetchedUser = await UserManager.getCurrentUser();
                setUser(fetchedUser);
                AppContext.currentUser = fetchedUser;
            } catch(e) {
                if(e instanceof APIError) {
                    if(e.resp.code === 1003) {
                        navigate('/');
                        return;
                    }
                }

                AppContext.ui.createDlg({ title: "Error", content: "Failed to refresh user profile!" })
                console.error(e);
            }
        }

        fetchData();
    });

    useEffect(()=>{
        let name = window.location.pathname.split('/')[1];

        if(name === "main")
            name = "users";

        setTab(name);
    }, [tab]);
    
    return (user == null) ? <LoadingContainer/> : <>
        <div className="page main">
            <div className="main-layout">
                <div className="left">
                    <NavSideBar selectedId={tab} onSelected={(id) => {
                        switch(id) {
                            case "users":
                                navigate('/main');
                                break;
                            default:
                                navigate(`/${id}`);
                                break;
                        }
                    }}/>
                </div>
                <div className="right">
                    <Outlet/>
                </div>
            </div>
        </div>
    </>;
}

