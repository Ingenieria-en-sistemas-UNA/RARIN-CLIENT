import React, { FC, ReactNode, useContext } from 'react'
import { BlocsContext, Provider } from './Context';

interface FromProps {
    children: ReactNode
}

const AppProvider: FC<FromProps> = ({ children }: FromProps) => {

    const context = useContext(BlocsContext);
    return (
        <Provider value={context}>
            {
                children
            }
        </Provider>
    );

}

export default AppProvider