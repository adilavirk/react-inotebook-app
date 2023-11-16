import React, { useContext, useState } from 'react';
import noteContext from './context/notes/noteContext';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        navigate('/');
        // input fields ko form submit hona k bad empty krna k liye
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Note Added successfuly", "success");

    }

    const onChange = (e) => {
        //    use of spread operator
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="container mt-4 addnotes" >
                <h2 style={{ fontWeight: "Bold" }}>Create new Note</h2>
                <Button className="mb-4" variant="text" color="secondary" startIcon={<ArrowBackIcon />} component={Link} to="/" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif" }}>Home</Button>
                {/* Form Added here */}
                <form className='my-3'>
                    <div className="title mb-4">
                        <TextField color="secondary"
                            label="Title" variant="outlined" fullWidth id="title" name="title" value={note.title} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="description mb-4">
                        <TextField color="secondary" label="Description" variant="outlined" fullWidth id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="tags mb-4">
                        <TextField color="secondary" label="Tags" variant="outlined" fullWidth id="tag" name="tag" value={note.tag} onChange={onChange} />
                    </div>
                    <Button disabled={note.title.length < 5 || note.description.length < 5} type="submit" onClick={handleClick} variant="contained" color="secondary" style={{ color: "White", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem" }}>Add Note</Button>

                </form>
            </div>
        </>
    )
}

export default AddNote
