import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext=createContext(null);
export default function GlobalState({children}){
    const [searchParams,setSearchParams]=useState('');
    const [loading,setLoading]=useState(false);
    const [recipeList,setRecipeList]=useState([]);
    const [recipeDetailsData,setRecipeDetailsData]=useState(null);
    const [favoritesList,setFavoritesList]=useState([]);
    const navigate=useNavigate();
    async function handleSubmit(event){
        event.preventDefault();
        try{
            const res=await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParams}`);
            const data=await res.json();
            if(data?.data?.recipes){
                setRecipeList(data?.data?.recipes);
                setLoading(false);
                setSearchParams('');
                navigate('/');
            }
        }catch(e){
            console.log(e);
            setLoading(false);
            setSearchParams('');
        }
    }
    function handleAddToFavorites(getCurrentItem){
        console.log(getCurrentItem);
        let copyFavoritesList=[...favoritesList];
        const index=copyFavoritesList.findIndex(item=>item.id===getCurrentItem.id);
        if(index===-1){
            copyFavoritesList.push(getCurrentItem);
        }else{
            copyFavoritesList.splice(index);
        }
        setFavoritesList(copyFavoritesList);
    }
    console.log(favoritesList);
    return <GlobalContext.Provider value={{searchParams,loading,recipeList,recipeDetailsData,setRecipeDetailsData,setSearchParams,handleSubmit,handleAddToFavorites,favoritesList}}>{children}</GlobalContext.Provider>;
}