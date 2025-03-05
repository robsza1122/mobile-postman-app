import React, { createContext, useState } from "react";

export const PostManState = createContext({
    slideOptions: 0,
    setSlideOptions: () => {},
    chosenOption: 1,
    setChosenOption: () => {},
}
);


export const PostGlobalProvider = ({children}) => {
    const [slideOptions, setSlideOptions] = useState(0);
    const [chosenOption, setChosenOption] = useState(1);

    return (
        <PostManState.Provider value={{
            slideOptions,
            chosenOption,
            setChosenOption,
            setSlideOptions,

        }}>
        {children}
        </PostManState.Provider>
    )
}