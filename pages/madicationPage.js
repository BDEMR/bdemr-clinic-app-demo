import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
 import PostPrescription from "../components/Madication/PostPrescription";
import PrePrescription from "../components/Madication/PrePrescription";

 

function Madication() {

    const [pre, setPre] = useState([]);
    const [post, setPost] = useState([])


    useEffect(() => {
        fetch(`http://localhost:5000/PostOperationData`)
            .then(res => res.json())
            .then(data => setPre(data));

    }, [])

    useEffect(() => {
        fetch(`http://localhost:5000/operationData`)
            .then(res => res.json())
            .then(data => setPost(data));

    }, [])



    return (
        <div>
            {
                pre.map(data => <prePrescription
                    key={data?._id}
                    preData={data}>
                </prePrescription>)
            } 

            {
                post.map(data => <PostPrescription
                    key={data?._id}
                    postData={data}
                >
                </PostPrescription>)
            }

        </div>
    );
}

export default Madication;