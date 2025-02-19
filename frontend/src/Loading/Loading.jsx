import { useContext } from 'react';
import './Loading.scss';
import { PostManState } from '../PostGlobalProvider';
import React from 'react';

export const Loading = () => {
    const { loading } = useContext(PostManState);
    return (
        <>
            {!loading && (
                <><div className="Loader__background">

                </div>
                    <div className="Loader__window">
                        <div className="Loader" />
                        <p className="Loader__message">Loading</p>
                    </div>
                </>)}
        </>
    )
}
