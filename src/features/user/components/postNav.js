import React from 'react'
import {Tab, Tabs} from 'react-bootstrap'
import {
    CollectionsOutlined,
    BookmarkBorderOutlined,
    AssignmentIndOutlined
} from "@material-ui/icons";
import './style.scss'
import Posts from './posts'
import Saved from './saved'
import Tagged from './tagged'


const Postnav = () => {
  return (
    <div>
        <Tabs defaultActiveKey="post" id="uncontrolled-tab-example" className="mb-3 postNav">
            <Tab eventKey="post" title={<div>POSTS <br/><CollectionsOutlined/></div>} >
                <Posts />
            </Tab>
            <Tab eventKey="saved" title={<div>SAVED <br/> <BookmarkBorderOutlined/></div>}>
                <Saved />
            </Tab>
            <Tab eventKey="tagged" title={<div>TAGGED <br/> <AssignmentIndOutlined/></div>}>
                <Tagged />
            </Tab>
        </Tabs>
    </div>
  )
}

export default Postnav