import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

import "./styles.scss"

const PostItem = ({post}) => {
    console.log(post)
    return (
        <Col sm={4} className="flex">
            <Row>
                <Col><img className='post-image' src={post.images[0]} alt="image" /></Col>
            </Row>
            <Row>
                <Col>{post.content}</Col>
            </Row>
        </Col>
    )
}

export default PostItem