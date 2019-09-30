import React, { FC, ReactNode } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppContainer } from '../structure/Container';


interface FromProps {
    children: ReactNode
}

export const Layout: FC<FromProps> = ({children}) => {
    return (
        <div>
            <CssBaseline />
            <AppContainer>
                {
                    children
                }
            </AppContainer>
            
        </div>
    )
}