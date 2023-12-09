// Main Page
import { useEffect, useState } from "react";
import { LoadingContainer } from "@twit2/std-library-fe";
import "./MainPage.scss";
import { PartialUser } from "@twit2/std-library-fe";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../../app/AppContext";
import { UserManager } from "../../app/UserManager";
import { APIError } from "@twit2/std-library-fe";

/**
 * Renders the main page.
 * @returns The main page.
 */
export const MainPage = ()=> {
    const navigate = useNavigate();
    const [fetchBusy, setFetchBusy] = useState(false);
    const [user, setUser] = useState<PartialUser>();

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
    
    return (user == null) ? <LoadingContainer/> : <>
        <div className="page main">
            <div className="main-layout">
                <div className="left">
                    TODO nav sidebar
                </div>
                <div className="right">
                    <Outlet/>
                </div>
            </div>
        </div>
    </>;
}

