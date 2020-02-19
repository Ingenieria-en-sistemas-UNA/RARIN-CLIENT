import React, { useState, useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import clsx from 'clsx';
import { BlocsContext } from '../../../store/Context';
import { useSnackbar } from 'notistack';
import { Product } from '../../../Models/Product';
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { ProductValidator } from '../../../utils/validators/ProductValidator';
import { StreamBuilder, Snapshot } from '../../../utils/BlocBuilder';
import { Category } from '../../../Models/Category';
import { FormControl, Select } from '@material-ui/core';
import imageDefault from '../../../assets/image/default.png'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
        wrapper: {
            margin: theme.spacing(2),
            position: 'relative',
        },
        buttonSuccess: {
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
        },
        fabProgress: {
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
        fab: {
            margin: '0 auto',
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
        input: {
            display: 'none',
        },
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            margin: '0 auto'
        },
        cardMedia: {
            paddingTop: '56.25%', // 16:9
            backgroundSize: 'contain',
            width: '300px'
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            marginRight: 10
        },
    }),
);

interface FromProps {
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    product?: Product
}

export default function ProductDialog({ open, handleClose, product }: FromProps) {
    const classes = useStyles();
    const { productBloc, categoryBloc } = useContext(BlocsContext);
    const { enqueueSnackbar } = useSnackbar();

    const [price, setPrice] = useState('');
    const [file, setFile] = useState<boolean | File | Blob>(false);
    const [isUpdatedFile, setIsUpdatedFile] = useState<boolean>(false);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [categoryId, setCategoryId] = useState<number>(-1);
    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    const handleButtonClose = () => {
        setSuccess(false);
        setLoading(false);
        setPrice('');
        setName('');
        setCategoryId(-1);
        setIsUpdatedFile(false);
        setFile(false);
        setErrors({ noCreated: false });
        handleClose(false);
    }

    const loadImage = async () => {
        if (product) {
            product = product as Product
            try {
                if (product.imageUrl as string) {
                    const photo = await fetch(`${product.imageUrl}`).then(response => response.blob());
                    setFile(photo)
                }
            } catch (error) {
                const photo = await fetch(imageDefault).then(response => response.blob())
                setFile(photo)
            }
        }
    }
    // eslint-disable-next-line
    useEffect(() => {
        if (product) {
            product = product as Product
            setPrice(product.price + '');
            setName(product.name);
            setCategoryId(product.categoryId);
        }
        if (open) {
            loadImage()
        }
    }, [open])
    
    const handleChangeFile = (e: any) => {
        const { files } = e.target;
        const [file] = files;
        setFile(file as File);
        setIsUpdatedFile(true);
    }

    const handleButtonClick = async () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            const sinErrors = { name, price, categoryId };
            const result = ProductValidator(sinErrors);

            if (!Object.keys(result).length) {
                try {
                    let success = false;
                    const productValidated: Product = { name, price: Number(price), categoryId }
                    if (!product) {
                        success = await productBloc.add(productValidated, file as File);
                    } else {
                        if (!isUpdatedFile) {
                            success = await productBloc.edit({ id: product.id, imageUrl: product.imageUrl as string, ...productValidated });
                        } else {
                            success = await productBloc.edit({ id: product.id, ...productValidated }, file as File);
                        }
                    }
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                    if (success) {
                        enqueueSnackbar(`Se ha ${product ? 'actualizado' : 'creado'} un producto`, { variant: 'success' })
                        setSuccess(true);
                        setTimeout(() => {
                            handleButtonClose()
                        }, 500);
                    } else {
                        setErrors({ noSuccess: true });
                        setTimeout(() => {
                            setErrors({ noSuccess: false });
                        }, 2000);
                    }
                } catch ({ message }) {
                    enqueueSnackbar(`Algo ocurrio al intentar ${product ? 'actualizar' : 'crear'} el producto`, { variant: 'error' })
                }
            } else {
                setErrors(result);
            }
        }
    };

    return (
        <Dialog open={open} onClose={handleButtonClose} aria-labelledby='form-dialog-title'>
            <DialogTitle id='form-dialog-title'>
                {
                    product ? 'Editar Producto' : 'Crear Producto'
                }
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Los productos son los articulos que se van a vender en la tienda online, se preciso con los datos
                </DialogContentText>
                <Grid container direction='row' spacing={3}>
                    <Grid item xs={8}>
                        <TextField
                            autoFocus
                            value={name}
                            onChange={e => setName(e.target.value)}
                            error={errors.name ? true : false}
                            helperText={errors.name ? errors.name : ''}
                            margin='dense'
                            id='name'
                            label='Nombre'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            margin='dense'
                            id='price'
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            helperText={errors.price ? errors.price : ''}
                            label='Precio'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
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
                                                <option value="">Seleccionar</option>
                                                {
                                                    categories.map((category, index) => <option key={index} value={category.id}>{category.name}</option>)
                                                }
                                            </Select>
                                        </FormControl>
                                    </>
                                )
                            }}
                        />
                    </Grid>
                    {
                        file && (
                            <Grid item xs={12} sm={12} style={{ display: 'flex' }}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={URL.createObjectURL(file)}
                                        title="Image Selected"
                                    />
                                </Card>
                            </Grid>
                        )
                    }
                    <Grid item xs={12} sm={12} style={{ display: 'flex' }}>
                        <Fab component='label' variant="extended" aria-label="Photo"
                            className={classes.fab}>
                            <input accept="image/*"
                                required={product && true}
                                className={classes.input}
                                id="icon-button-file"
                                type="file"
                                onChange={handleChangeFile}
                            />
                            <PhotoCamera />
                            Photo
                        </Fab>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleButtonClose} color='primary'>
                    Cancel
                </Button>
                <div className={classes.wrapper}>
                    <Fab
                        aria-label="save"
                        color="primary"
                        className={buttonClassname}
                        onClick={handleButtonClick}
                        disabled={file === false || success || errors.noSuccess}
                    >
                        {!errors.noSuccess ? success ? <CheckIcon /> : <SaveIcon /> : <ErrorIcon />}
                    </Fab>
                    {loading && <CircularProgress size={68} className={classes.fabProgress} />}
                </div>
            </DialogActions>
        </Dialog>
    );
}
