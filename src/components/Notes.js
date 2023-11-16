import React, { useContext, useEffect, useRef, useState } from 'react';
// import AddNote from '../AddNote';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';
import empty from '../images/empty.svg';
import '../index.css';
import { TextField } from '@mui/material';

const Notes = (props) => {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })
    useEffect(() => {
        if (localStorage.getItem('token')) {

            getNotes();
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });



    }
    const ref = useRef(null);
    const refClose = useRef(null);
    const handleClick = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert(" Note Updated successfully", "success");
    };


    const onChange = (e) => {
        //    use of spread operator
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <button type="button" ref={ref} className="d-none " data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "2rem", marginBottom: "0.5rem" }}>Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Form */}
                            <form className='my-3'>
                                <div className="mb-3">
                                    {/* <label htmlFor="etitle" className="form-label">Title</label> */}
                                    <TextField inputProps={{minlength:3}} autoFocus required color="secondary" margin="dense" label="Title" type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange}/>
                                </div>
                                <div className="mb-3">
                                    {/* <label htmlFor="edescription" className="form-label">Description</label> */}
                                    <TextField inputProps={{minlength:3}} autoFocus required color="secondary" margin="dense" label="Description" type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
                                </div>
                                <div className="mb-3">
                                    {/* <label htmlFor="etag" className="form-label">Tag</label> */}
                                    <TextField inputProps={{minlength:3}} autoFocus required color="secondary" margin="dense" label="Tag" type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn custom-button" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* ////////////////////////////////////////////////////////// */}
            {/* Your Notes Section */}
            <div className="row ps-5 mt-4 mb-1">
                <h1 className="display-6">Your Notes: </h1>
                {/* validation message */}
                <div className="container mx-2">
                    {notes.length === 0 &&
                        // 'No notes to display'}
                        <div className="d-flex ">
                            <p style={{ position: "absolute", left: "35%", bottom: "-10%" }}>Create your first note :) !!</p>
                            <img className="img-fluid ms-5 mt-3" src={empty} alt="empty" style={{ width: "30%", opacity: "0.5" }} />
                        </div>
                    }
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />
                })}
            </div>
        </>
    )
}

export default Notes
