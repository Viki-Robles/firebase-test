import React, { useState, useRef, useEffect } from 'react';
import firebase from '../firebase';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import { Button, Link } from '@material-ui/core';
import { styles } from './Signup.styles';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../Contents/Auth';
import { Alert, AlertTitle } from '@material-ui/lab';


const useStyles = makeStyles(styles);
const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#C0491C',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#C0491C',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#C0491C',
            },
            '&:hover fieldset': {
                borderColor: '#C0491C',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#C0491C',
            },
        },
    },
})(TextField);

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [candidateId, setCandidatetId] = useState(null);
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signup } = useAuth();
    const history = useHistory();
    const classes = useStyles();

    const firebaseUrl = 'http://fir-test-b1e99.firebaseio.com'
    const firebaseRef = firebase.firestore().collection('candidates');
    console.log(firebaseRef);
    
    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ first_name: 'Mimi' })
        };
        fetch(firebaseRef, requestOptions)
            .then(response => response.json())
            .then(data => setCandidatetId(data));
    }, []);

    async function handleSubmit(e) {
        e.preventDefault()

        if (!passwordRef.current.value) {
            return setError('Passwords do not match')
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/');
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)
    }

    

    return (
        <Container component='main' maxWidth='xs' className={classes.container}>
            <div className={classes.paper}>
                <Typography 
                    component='h1' 
                    variant='h5' 
                    className={classes.signUpHeader}>
                    Sign up
                </Typography>
                {error && <Alert severity='error'><AlertTitle>{error}</AlertTitle></Alert>}
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container direction='column' spacing={2}>
                        <Grid item xs={12}>
                            <CssTextField
                                variant='outlined'
                                inputRef={emailRef}
                                value={email}
                                fullWidth
                                label='Email Address:'
                                name='email'
                                autoComplete='email'
                                onChange={e => setEmail(e.target.value)}
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CssTextField
                                variant='outlined'
                                fullWidth
                                inputRef={passwordRef}
                                name='password'
                                label='Password:'
                                type='password'
                                value={password}
                                autoComplete='current-password'
                                onChange={e => setPassword(e.target.value)}
                                className={classes.textField}
                            />
                        </Grid>
                    </Grid>
                    <Grid className={classes.buttonContainer}>
                        <Button 
                            type='submit' 
                            variant='contained' 
                            color="primary" 
                            className={classes.submit}>
                            Register
                        </Button>
                    </Grid>
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Link 
                                href="/login" 
                                variant="body2" 
                                className={classes.login}>
                                Already have an account? Log in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
              
            </div>
        </Container>

    )
}