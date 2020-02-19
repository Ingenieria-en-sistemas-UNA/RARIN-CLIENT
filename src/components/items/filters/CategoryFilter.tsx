import React, { useState, useContext, useEffect } from 'react'
import { FormControl, Select, makeStyles } from '@material-ui/core'
import { Category } from '../../../Models/Category';
import { BlocsContext } from '../../../store/Context';
import { StreamBuilder, Snapshot } from '../../../utils/BlocBuilder/index';

const useStyles = makeStyles(theme => ({
    formControl: {
        padding: 0,
        minWidth: 120,
        marginRight: 10
    },
}));

export default (props: any) => {
    const classes = useStyles();
    const { categoryBloc, productBloc } = useContext(BlocsContext);
    const [categoryId, setCategoryId] = useState<number>(-1);
    useEffect(()=> {
        if(categoryId === -1){
            productBloc.load();
        } else {
            productBloc.loadByCategory(categoryId);
        }
    }, [categoryId])
    return (
        <StreamBuilder
            stream={categoryBloc.categoriesStrem()}
            builder={(snapshot: Snapshot<Category[]>) => {
                let categories: Category[] | undefined = snapshot.data;
                if (categories === undefined) {
                    categories = [];
                }
                return (
                    <>
                        <div style={{ padding: 10 }}>
                            <label htmlFor='category-native-simple'>Categorías:</label>
                        </div>
                        <FormControl className={classes.formControl}>
                            <Select
                                native
                                value={categoryId}
                                onChange={e => setCategoryId(Number(e.target.value))}
                                inputProps={{
                                    name: 'category',
                                    id: 'category-native-simple',
                                }}
                            >
                                <option value={-1}>Todas</option>
                                {
                                    categories.map((category, index) => <option key={index} value={category.id}>{category.name}</option>)
                                }
                            </Select>
                        </FormControl>
                    </>
                )
            }}
        />
    )
}
