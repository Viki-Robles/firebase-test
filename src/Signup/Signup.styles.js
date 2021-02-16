export const styles = (theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '80%',
      marginTop: theme.spacing(5),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor:'#C0491C',
      textTransform: 'none',
      color:'#0C0C10'
    },
    formControlLabel: {
      fontSize: '0.3rem',
    },
    signUpHeader: {
      marginTop: theme.spacing(2),
      textAlign: 'center',
      marginBottom: theme.spacing(2),
      color:'#C0491C'
    },
    textfield: {
      color:'#C0491C',
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'red',
        }}
    },
    login:{
      color:'#C0491C'
    },
    buttonContainer:{
      textAlign:'center'
    }
  })