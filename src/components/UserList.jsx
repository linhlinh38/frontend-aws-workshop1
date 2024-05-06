import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Alert } from '@mui/material';
import Navbar from './Navbar';
import axios from 'axios';

const UserList = ({ axiosInstance }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
        setIsLoading(true);
      try {
        const response = await axiosInstance.get('/api/getAll');
        setImages(response.data);
      } catch (error) {
        const errorMess = error
        console.error('Error fetching images:', error);
        handleError(errorMess.response.data.message || 'An error occurred')
      } finally{
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [reload]);


  async function uploadImage(e){
     setReload(true)
    try {
        const form = new FormData();
        form.append('file', e.target.files[0])
        const response = await axiosInstance.post('/api/upload', form, {'Content-Type': 'multipart/form-data'});
        console.log(response);
        setReload(false)
    } catch (error) {
        const errorMess = error
        console.error('Error fetching images:', error);
        handleError(errorMess.response.data.message || 'An error occurred')
    }
  }

  const handleDelete = async (imageName) => {
    setReload(true)
    try {
        const response = await axiosInstance.post(`/api/delete/${imageName}`);
        console.log(response);
        setReload(false)
    } catch (error) {
        const errorMess = error
        console.error('Error fetching images:', error);
        handleError(errorMess.response.data.message || 'An error occurred')
    }
  }

  return (
    <div>
        <Navbar /> 
        {errorMessage && (
  <Alert severity="error">{errorMessage}</Alert>
)}
        {isLoading ? (
      <p>Loading image...</p>
    ) : (
      <><h1>Image List</h1>
                   <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        >
                        Upload Image
                        <input type='file' hidden onChange={uploadImage}/>
                    </Button>

                      <TableContainer component={Paper}>
                          <Table sx={{ minWidth: 650 }}>
                              <TableHead>
                                  <TableRow>
                                      <TableCell><span className='table-header'>Name</span></TableCell>
                                      <TableCell><span className='table-header'>Image</span></TableCell>
                                      <TableCell><span className='table-header'>Delete</span></TableCell>
                                  </TableRow>
                              </TableHead>
                              <TableBody>
                                  {images.map((image) => (
                                      <TableRow key={image.fileName}>
                                          <TableCell>{image.fileName}</TableCell>
                                          <TableCell><img src= {image.url} alt={image.fileName} width="250px" height="220px" /></TableCell>
                                          <TableCell><Button variant="contained" onClick={() => handleDelete(image.fileName)}>Delete Image</Button></TableCell>
                                      </TableRow>
                                  ))}
                              </TableBody>
                          </Table>
                      </TableContainer></>
    )}
    </div>
  );
};

export default UserList;