import { redirect } from "react-router-dom";


export function checkAuthLoader(){
    const username = localStorage.getItem('USERNAME');

    if(!username){
        return redirect('/');
    }
    
    return null

}