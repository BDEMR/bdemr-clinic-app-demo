import { Button, Grid } from '@mui/material';
import { border, Box } from '@mui/system';
import React, { useState } from 'react';

const Madication = ({ preData  }) => {
    
    const [date, setDate] = useState("");

    const a= preData?.does;
    const anum= parseInt(a);
    console.log('aaa',anum)

    const takeDoes = () => {

        setDate(new Date().toLocaleString())

    }



    return (
        <>
            <Grid item  container sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', width: '80%', mx: 'auto', bgcolor: 'Whitesmoke', border: '1px solid white',mt:5, p: 1 }}>
                <Box item>  {preData?.medicine}  </Box>
                <Box item>   {preData?.does}  </Box>
                <Box>{date ? `Last does: ${date} ` : 'Never medicine'}</Box>
                <Box item>  <Button onClick={() => takeDoes(preData._id)}>Give medicine</Button></Box>
            </Grid>


        </>
    );
};

export default Madication;