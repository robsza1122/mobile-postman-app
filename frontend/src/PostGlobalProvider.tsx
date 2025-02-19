import React, { createContext, useState } from "react";

export type ProviderType = {
    loading: boolean;
    setLoading: (loading: boolean) => void;
};

export const PostManState = createContext<ProviderType>({
    loading: false,
    setLoading: () => {},
}
);

type Props = {
    children: React.ReactNode;
}

export const PostGlobalProvider = ({children}: Props) => {
    const [loading, setLoading] = useState(false);

    return (
        <PostManState.Provider value={{
            loading,
            setLoading,
        }}>
        {children}
        </PostManState.Provider>
    )
}