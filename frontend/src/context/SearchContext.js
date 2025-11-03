
import {createContext,useState} from 'react'

export const SearchContext = createContext();

export default function SearchProvider({children}){
    const [searchTerm,setSearchTerm] = useState('')
    const [location,setLocation] = useState("")
    
    return(
        <SearchContext.Provider value={{searchTerm,setSearchTerm,location,setLocation}}>
            {children}
        </SearchContext.Provider>
    )
} 