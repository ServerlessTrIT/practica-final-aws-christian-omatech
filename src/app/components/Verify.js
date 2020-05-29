import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

import { NavLink } from "react-router-dom";
import routes from 'routes';

import { useDispatch, useSelector } from 'react-redux';
import { Types, signUp, signUpResponse, verifyCode, verifyResponse } from 'store/actions/auth';

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

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Verify() {
    const classes = useStyles();

    const [email, setEmail] = useState();
    const [code, setCode] = useState();
    const dispatch = useDispatch();
    const errorMessage = useSelector(store => store.auth.errors.message);
    const okMessage = useSelector(store => store.auth.ok.message);
    const loading = useSelector(store => store.auth.loading);

    useEffect(() => {
        dispatch(signUpResponse({
            message: null
        }))
        dispatch(verifyResponse({
            message: null
        }))
    }, [])

    const SignUpButton = (e) => {
        e.preventDefault();

        dispatch(verifyCode({
            email: email,
            code: code
        }))
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar} >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Confirm
                </Typography>
                <form className={classes.form} noValidate onSubmit={SignUpButton}>
                    <Grid container spacing={2}>
                        {(errorMessage !== null) && <Grid item xs={12}>
                            <Alert severity="error">{errorMessage}</Alert>
                        </Grid>}

                        {(okMessage !== null) && <Grid item xs={12}>
                            <Alert>{okMessage}</Alert>
                        </Grid>}

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="code"
                                label="Code"
                                type="code"
                                id="code"
                                autoComplete="current-code"
                                onChange={(e) => setCode(e.target.value)}

                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={loading}
                    >
                        Confirm
                    </Button>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
