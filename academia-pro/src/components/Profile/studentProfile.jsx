import React, { useState } from "react";
import "./Profile.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getManagement } from '../api/api';
import userimage from './userimage.png'
import Paper from '@mui/material/Paper'; 

const StudentProfile = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="profile-container" style={{ paddingTop: "px" }}>
        <div className="profile-image-container">
          <div className="profile-image">
            {image ? (
              <img
                src={image}
                alt="Student"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <img
                src={userimage}
                alt="Student"
                style={{
                  width: "60%",
                  height: "60%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            id="image-upload"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <label
            htmlFor="image-upload"
            className="profile-add-icon"
          >
            +
          </label>
        </div>

        <div className="profile-details" style={{ fontSize: "22px", marginLeft: "50px" }}>
          <div className="profile-detail">
            <span>Name:</span> Dhruv Kapoor
          </div>
          <div className="profile-detail">
            <span>Email:</span> Dhruv12@example.com
          </div>
          <div className="profile-detail">
            <span>Class:</span> 10th Grade
          </div>
        </div>
      </div>

      <div className="tables">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: "18px" }}>SNo</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: "18px" }}>Subject</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: "18px" }}>Exam Date</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: "18px" }}>Exam</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: "18px" }}>Exam Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: "18px" }}>Marks Obtained</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", letterSpacing: "1.5px", fontSize: "18px" }}>Maximum Marks</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>

      </div>
    </>
  );
};

export default StudentProfile;
