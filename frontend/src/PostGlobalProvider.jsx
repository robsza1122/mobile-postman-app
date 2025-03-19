import React, { createContext, useState } from "react";
import { useLocaleStorage } from "./hooks/useLocaleStorage";

export const PostManState = createContext({
    slideOptions: 0,
    setSlideOptions: () => {},
    chosenOption: 1,
    setChosenOption: () => {},
    downloadedBook: [],
    setDownloadedBook: () => {},
    currentUser: {},
    setCurrentUser: () => {},
    currentParcels: [],
    setCurrentParcels: () => {},
}
);


export const PostGlobalProvider = ({children}) => {
    const [downloadedBook, setDownloadedBook] = useLocaleStorage('downloadedBook', []);
    const [slideOptions, setSlideOptions] = useLocaleStorage('slideOptions', 0);
    const [chosenOption, setChosenOption] = useLocaleStorage('chosenOption', 1);
    const [currentUser, setCurrentUser] = useLocaleStorage('currentUser', {});
    const [currentParcels, setCurrentParcels] = useState([]);

    return (
        <PostManState.Provider value={{
            downloadedBook,
            setDownloadedBook,
            slideOptions,
            chosenOption,
            setChosenOption,
            setSlideOptions,
            currentUser,
            setCurrentUser,
            currentParcels,
            setCurrentParcels,
        }}>
        {children}
        </PostManState.Provider>
    )
}