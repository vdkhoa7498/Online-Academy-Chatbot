import React, {useState, useEffect} from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link } from 'react-router-dom'


const PostCourse = () => {

    useEffect(()=>{
        
    }, [])

    return(
        <div className="postCourse-container">
            <Editor
                // editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                // onEditorStateChange={this.onEditorStateChange}
                />;
        </div>
    )
}

export default PostCourse