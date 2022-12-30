import React from 'react'
import { Grid, TextField, IconButton } from '@mui/material'
import { InputAdornment } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const Input = ({ half, name, label, handleChange, autoFocus, type, handleShowPassword }) => {  //special prop, spesific that
    return (
        <Grid item xs={12} sm={half ? 6 : 12}  >
            <TextField
                name={name} //custom on is formatted like this
                onChange={handleChange} //linked to handleChange={handleChange} dont ask me why
                variant='outlined' //rigid one
                required
                fullWidth //fullwidht of paper
                label={label} //displayed text 
                autoFocus={autoFocus}
                type={type} //type of textfield
                InputProps={name === 'password' ? { //where to place the icom
                    endAdornment: (
                        <InputAdornment position='end' > 
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null} //no need to add : null when using &&


            />
        </Grid>
    )
}

export default Input