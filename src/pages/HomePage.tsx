import React, { useContext } from 'react' 
import { Todo } from '../Models/Todo';
import { BlocsContext } from '../store/Context';
import { StreamBuilder, Snapshot } from '../utils/BlocBuilder';

interface FromProps {
    title: string,

}

const HomePage = ({ title }: FromProps) => {
    return (
        <div>
            <h1>{title}</h1> 
        </div>
    );

}

export default HomePage;