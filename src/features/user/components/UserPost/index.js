import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllPost } from "../../profileSlice";

import "./styles.scss"

const UserPost = () => {
    const dispatch = useDispatch()

    const posts = useSelector(state => state.user.posts)
    console.log(posts)
    useEffect( async () => {
        const action = getAllPost();
        await dispatch(action)
    }, [])

    return (
        <Container>
            <Row className="container">
                {
                    posts.length && 
                    posts.map((item, index) => (
                        <Col sm={4} key={index}>
                            <img className="post-image" src={item.images[0]} />
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}

export default UserPost

const List = [
    {
        image: ['https://i.ibb.co/Tv0Nj1M/post.jpg'],
    },
    {
        image: ['https://i.ibb.co/Tv0Nj1M/post.jpg'],
    },
    {
        image: ['https://i.ibb.co/Tv0Nj1M/post.jpg'],
    },
    {
        image: ['https://i.ibb.co/Tv0Nj1M/post.jpg'],
    }
]