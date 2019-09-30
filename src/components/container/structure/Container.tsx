import React, { FC, ReactNode } from 'react';
import Container from '@material-ui/core/Container';

interface FromProps {
    children: ReactNode
}

export const AppContainer: FC<FromProps> = ({ children }) => {
    return (
        <Container fixed component="main" maxWidth="xs">
            {
                children
            }
        </Container>
    );
}