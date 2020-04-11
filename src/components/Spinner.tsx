import React from 'react';
import { css } from "@emotion/core";
import theme from '../theme/theme'
import ClipLoader from "react-spinners/ClipLoader";

export const Spinner = () => {
    return <ClipLoader
                size={30}
                color={"#123abc"}
                loading={true}
            />
}

