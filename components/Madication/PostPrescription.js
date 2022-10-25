import { Button, Grid } from '@mui/material';
import { border, Box } from '@mui/system';
import { useState } from 'react';

const PostPrescription = ({ postData }) => {


    const [date, setDate] = useState("");
    const [nextdate,  setNextDate] = useState("");

    const takeDoes = () => {

        const dat = postData?.does;
        const a= parseInt(dat+1);
        console.log('ddd',  a +1);
        setDate(new Date())
    }


    return (
        <>
            <Grid item container sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', width: '80%', mx: 'auto', bgcolor: 'Whitesmoke', border: '1px solid white', p: 1 }}>

                <Box item>  {postData?.medicine}  </Box>
                <Box item>    {postData?.does}  </Box>
                <Box>{date ? ` Last does: ${date.toLocaleString()}` : 'Never medicine'}</Box>

                <Box item>  <Button onClick={() => takeDoes(postData._id)}>Give medicine</Button></Box>
            </Grid>


        </>
    );
};

export default PostPrescription;