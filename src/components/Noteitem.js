import { IconButton } from '@mui/material';
import React, { useContext } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import noteContext from '../context/notes/noteContext';


const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { note, updateNote } = props;
  const { deleteNote } = context;

  const handleDeleteNote = () => {
    deleteNote(note._id);
    props.showAlert("Note Deleted successfully", "success");
  };

  const handleUpdateNote = () => {
    updateNote(note);
    // props.showAlert("Note Updated successfully", "success");
  };

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <IconButton onClick={handleDeleteNote} className="mb-2 ms-auto" color="secondary">
              <DeleteOutlineOutlinedIcon color="secondary" />
            </IconButton>
            <IconButton className="mb-2" color="secondary" onClick={handleUpdateNote}>
              <EditIcon color="secondary" />
            </IconButton>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
