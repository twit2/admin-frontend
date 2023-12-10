import { ErrorBox, Form, FormInputField, LoadingContainer } from "@twit2/std-library-fe"
import "./LoginPage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthManager } from "../../app/AuthManager";

export const LoginPage = ()=>{
    let [error, setError] = useState("");
    let [busy, setBusy] = useState(false);
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    const nav = useNavigate();
    
    /**
     * Submits the form.
     */
    async function submit() {
        if(username.trim() === "") {
            setError("No username specified.");
            return;
        }
        else if(password.trim() === "") {
            setError("No password specified.");
            return;
        }

        setBusy(true);

        // Send login request
        try {
            await AuthManager.login(username, password);

            // Check if user is admin
            // No, this check isn't frontend exclusive, the services also verify this in teh backend via middleware :)
            if(!await AuthManager.isAdmin()) {
                setError("User is not a platform administrator.");
                setBusy(false);
                return;
            }

            nav(`/main`);
        } catch(e) {
            setError(`Could not login: ${(e as Error).message}`);
            setBusy(false);
        }
    }

    return <div className="page login">
        <div className="center">
            <div className="hdr">
                <div className="logo"></div>
                <div className="subtitle">ADMINISTRATION</div>
            </div>
            <Form>
                { busy ? <LoadingContainer/> : <>
                    <FormInputField label="Username" type={"text"} onchange={(v)=>setUsername(v)} value={username} onsubmit={(v)=>submit()}/>
                    <FormInputField label="Password" type={"password"} onchange={(v)=>setPassword(v)} value={password} onsubmit={(v)=>submit()}/>
                    { (error !== "") ? <ErrorBox text={error}/> : '' }
                    <button onClick={()=>submit()}>Log In</button>
                </> }
            </Form>
        </div>
    </div>
}