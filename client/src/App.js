import React, { useEffect } from "react";
import memories from "./images/memories.jpeg"
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import { useDispatch } from "react-redux";
import { getPosts } from './actions/posts';
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import makeStyles from "./styles"

const App = () => {
    const classes = makeStyles()
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getPosts());
    }, [dispatch])

    return (
        <Container maxWidth="lg">
            <AppBar className = {classes.AppBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">
                    Memories
                    <img src={memories} alt="memories" height="60" />
                </Typography>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={4}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;