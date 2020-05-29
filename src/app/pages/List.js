import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useSelector, useDispatch } from 'react-redux';
import { list, deleteBook, updateBook, createBook } from 'store/actions/auth';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function CustomDialog(props) {
    return (<Dialog open={props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.book.title}</DialogTitle>
        <DialogContent dividers={true}>
            <Typography gutterBottom>
                <strong>ISBN: </strong>{props.book.isbn}
            </Typography>
            <Typography gutterBottom>
                <strong>Sinopsis: </strong>
            </Typography>
            <DialogContentText
                id="scroll-dialog-description"
                tabIndex={-1}
            >{props.book.synopsis}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => props.handleDelete(props.book.isbn)} color="primary">
                Borrar
          </Button>
            <Button onClick={props.handleClose} color="primary">
                Cerrar
          </Button>
        </DialogActions>
    </Dialog>)
}

function UpdateDialog(props) {
    const [title, setTitle] = useState(props.book.title || '');
    const [synopsis, setSynopsis] = useState(props.book.synopsis || '');
    const [image, setImage] = useState(props.book.image || '');

    return (<Dialog open={props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent dividers={true}>
            <Typography gutterBottom>
                <strong>ISBN: </strong>{props.book.isbn}
            </Typography>
            <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Titulo"
                type="text"
                fullWidth
                value={title}
                onChange={(e) => { setTitle(e.currentTarget.value) }}
            /><TextField
                margin="dense"
                id="url"
                label="Image URL"
                type="text"
                fullWidth
                value={image}
                onChange={(e) => {
                    setImage(e.currentTarget.value)
                }}
            /><TextField
                margin="dense"
                id="sinopsis"
                label="Sinopsis"
                type="text"
                fullWidth
                value={synopsis}
                onChange={(e) => {
                    setSynopsis(e.currentTarget.value)
                }}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => props.handleUpdate({
                isbn: props.book.isbn,
                title: title,
                image: image,
                synopsis: synopsis
            })} color="primary">
                Guardar
            </Button>
            <Button onClick={props.handleClose} color="primary">
                Cerrar
          </Button>
        </DialogActions>
    </Dialog>)
}

function CreateDialog(props) {
    const [isbn, setIsbn] = useState('');
    const [title, setTitle] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [image, setImage] = useState('');

    return (<Dialog open={props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nuevo Libro </DialogTitle>
        <DialogContent dividers={true}>
            <TextField
                autoFocus
                margin="dense"
                id="isbn"
                label="ISBN"
                type="text"
                fullWidth
                value={isbn}
                onChange={(e) => { setIsbn(e.currentTarget.value) }}
            /><TextField
                margin="dense"
                id="title"
                label="Titulo"
                type="text"
                fullWidth
                value={title}
                onChange={(e) => { setTitle(e.currentTarget.value) }}
            /><TextField
                margin="dense"
                id="url"
                label="Image URL"
                type="text"
                fullWidth
                value={image}
                onChange={(e) => {
                    setImage(e.currentTarget.value)
                }}
            /><TextField
                margin="dense"
                id="sinopsis"
                label="Sinopsis"
                type="text"
                fullWidth
                value={synopsis}
                onChange={(e) => {
                    setSynopsis(e.currentTarget.value)
                }}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => props.handleCreate({
                isbn: isbn,
                title: title,
                image: image,
                synopsis: synopsis
            })} color="primary">
                Guardar
            </Button>
            <Button onClick={props.handleClose} color="primary">
                Cerrar
          </Button>
        </DialogActions>
    </Dialog>)
}

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

export default function List() {
    const classes = useStyles();

    const email = useSelector(store => store.auth.email);
    const books = useSelector(store => store.auth.books);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [openCreate, setOpenCreate] = useState(false)
    const [book, setBook] = useState(false)
    const handleClose = () => {
        setOpen(false);
        setOpenUpdate(false);
        setOpenCreate(false);
    }

    const handleDelete = (isbn) => {
        dispatch(deleteBook(isbn))
        setOpen(false)
        setOpenUpdate(false);
    }

    const handleUpdate = (book) => {
        dispatch(updateBook(book))
        setOpen(false)
        setOpenUpdate(false);
        setBook({
            title: null,
            isbn: null,
            synopsis: null,
            image: null
        })
    }

    const handleCreate = (book) => {
        dispatch(createBook(book))
        setOpen(false)
        setOpenCreate(false);
        setBook({
            title: null,
            isbn: null,
            synopsis: null,
            image: null
        })
    }

    useEffect(() => {
        dispatch(list())
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        {email}
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Serverless AWS
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            <strike>LaJoyaDeLaCorona</strike>
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={() => { setOpenCreate(true) }}>
                                        Nuevo libro
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {books.map((book) => (
                            <Grid item key={book.isbn} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={book.image}
                                        title={book.title}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {book.title}
                                        </Typography>
                                        <Typography>
                                            {book.synopsis}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => {
                                            setOpen(true);
                                            setBook(book);
                                        }
                                        }>
                                            View
                                        </Button>
                                        <Button size="small" color="primary" onClick={() => {
                                            setOpenUpdate(true);
                                            setBook(book);
                                        }
                                        }>
                                            Edit
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {open && <CustomDialog open={open} book={book} handleClose={handleClose} handleDelete={handleDelete} />
            }
            {openUpdate && <UpdateDialog open={openUpdate} book={book} handleClose={handleClose} handleUpdate={handleUpdate} setBook={setBook} />
            }
            {openCreate && <CreateDialog open={openCreate} handleClose={handleClose} handleCreate={handleCreate} setBook={setBook} />
            }
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Something here to give the footer a purpose!
                </Typography>
                <Copyright />
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}
