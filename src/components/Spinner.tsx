import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

export const Spinner = () => {
    return <ClipLoader
                size={30}
                color={"#123abc"}
                loading={true}
            />
}

