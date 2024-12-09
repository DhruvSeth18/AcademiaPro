import { useState, useRef, useContext, useEffect } from 'react';
import {
    Dialog,
    TextField,
    Button,
    LinearProgress,
    Card,
    CardContent,
    Typography,
    CardActions,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@mui/icons-material/Add';
import app from '../../firebase';
import { UserContext } from '../context/userContext';
import { addResource } from '../api/api';
import { getResources } from '../api/api';
import './resources.css';

const fakeResources = [
    { title: 'Introduction to React', link: 'https://example.com/react.pdf' },
    { title: 'Firebase Basics', link: 'https://example.com/firebase.pdf' },
    { title: 'MUI Components Guide', link: 'https://example.com/mui.pdf' },
    { title: 'Node.js Crash Course', link: 'https://example.com/nodejs.pdf' },
];

const Resources = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [file, setFile] = useState(null);
    const [pdfUrl, setPdfUrl] = useState('');
    const [resources, setResources] = useState([]);
    const [pdfTitle, setPdfTitle] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState({
        title: '',
        link: ''
    });
    const { user, isUser } = useContext(UserContext);
    const fileInputRef = useRef(null);

    useEffect(() => {
        getPdfFiles();
    }, []);

    const getPdfFiles = async () => {
        console.log("User class Id is : ", user.class);
        const response = await getResources(user.class);
        if (response.status === true) {
            setResources(response.data);
        }
    }

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
        setFile(null);
        setPdfTitle('');
        setUploadProgress(0);
        setIsUploading(false);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
        } else {
            toast.error('Please upload a valid PDF file.', { position: 'top-center' });
        }
    };

    const handleTitleChange = (e) => {
        setPdfTitle(e.target.value);
    };
    const toastSuccess = (message) => {
        toast.success(message, {
            position: 'top-center',
            autoClose: 1500
        });
    }

    const toastFail = (message) => {
        toast.error(message, {
            position: 'top-center',
            autoClose: 1500
        });
    }

    const resourceAdd = async (files) => {
        console.log("Uploading details are here: ", files);
        const response = await addResource(user.class, files);
        if (response.status === true) {
            toastSuccess('Assignment uploaded successfully!');
            handleClose();
        } else {
            toastFail('Failed to upload Assignment');
        }
    };

    const handleUpload = async () => {
        if (!file || !pdfTitle) {
            toast.error('Please provide a title and select a file to upload.', { position: 'top-center' });
            return;
        }

        const storage = getStorage(app);
        const fileName = `${new Date().getTime()}_${file.name}`;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        setIsUploading(true);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                setIsUploading(false);
                toast.error('Error uploading the file.', { position: 'top-center' });
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setUploadedFiles((prev) => {
                    const newFiles = { ...prev, title: pdfTitle, link: downloadURL };
                    resourceAdd(newFiles);
                    return newFiles;
                });
                setFile(null);
                getPdfFiles();
                setUploadProgress(0);
                setIsUploading(false);
            }
        );
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === 'application/pdf') {
            setFile(droppedFile);
        } else {
            toast.error('Please upload a valid PDF file.', { position: 'top-center' });
        }
    };

    return (
        <>
            <ToastContainer style={{ scale: '0.95', paddingTop: '60px' }} />
            <div className="bg-black w-full h-screen pt-[100px]">
                {
                    localStorage.getItem('role') === 'Teacher' ? <>
                        <div className="fixed bottom-4 right-4">
                            <Button
                                onClick={handleClickOpen}
                                style={{ backgroundColor: '#1976d2', color: 'white', padding: '20px', borderRadius: '50%', }}>
                                <AddIcon />
                            </Button>
                        </div>
                    </> : <></>
                }
                <Dialog open={openDialog} onClose={handleClose}>
                    <div className="w-[320px] p-[1px] bg-black">
                        <div className="border-[1px] flex flex-col gap-4 border-white p-[1rem] pb-[2rem] rounded-md">
                            <div className="upload-area" onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDrop={handleDrop}>
                                {file ? (
                                    <div>
                                        <div className=' text-center'>
                                            <span className="text-white">{file.name}</span>
                                        </div>
                                        <span className="upload-area-title text-center">Drag file(s) here to upload.</span>
                                        <p className='text-center'><strong onClick={() => fileInputRef.current.click()}>clicking here</strong></p>
                                    </div>

                                ) : (
                                    <>
                                        <span className="upload-area-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 340.531 419.116">
                                                <g id="files-new" clipPath="url(#clip-files-new)">
                                                    <path id="Union_2" data-name="Union 2" d="M-2904.708-8.885A39.292,39.292,0,0,1-2944-48.177V-388.708A39.292,39.292,0,0,1-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1-2771.3-147.087Z" transform="translate(2944 428)" fill="var(--c-action-primary)"></path>
                                                </g>
                                            </svg>
                                        </span>
                                        <span className="upload-area-title text-center">Drag file(s) here to upload.</span>
                                        <p><strong onClick={() => fileInputRef.current.click()}>clicking here</strong></p>
                                    </>
                                )}
                                <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="application/pdf" onChange={handleFileChange} />
                            </div>
                            <TextField className="w-full" label="Enter Title" variant="outlined" value={pdfTitle} onChange={handleTitleChange} />
                            <Button sx={{ fontWeight: 'bold', backgroundColor: '#0079FF', color: "white", letterSpacing: "1.5px" }} variant="contained" onClick={handleUpload} disabled={isUploading}>
                                {isUploading ? 'Uploading...' : 'Upload PDF'}
                            </Button>
                        </div>
                        {isUploading && <LinearProgress variant="determinate" value={uploadProgress} />}
                    </div>
                </Dialog>
                {/* add cards to show the pdf that is having link and title of the resource what i */}
                <div>
                    <p className='text-[40px] text-white text-center' >Resources</p>
                </div>
                <div className='flex justify-center mt-[20px] h-[70vh]  p-2'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 overflow-auto bg-gray-950 p-4 lg:grid-cols-4 gap-8 w-8/12 max-w-7xl px-4">
                        {resources.length === 0 ? (
                            <div className="col-span-full text-center text-white font-semibold text-lg py-10">
                                No Resources are available.
                            </div>
                        ) : (
                            resources.map((resource, index) => (
                                <Card
                                    key={index}
                                    className="bg-gray-800 border-2 cursor-pointer border-white md:w-[300px] w-[100%] h-[190px] text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-[1.02]"
                                >
                                    <CardContent>
                                        <Typography className="text-center text-[25px] text-gray-300 h-[48px] overflow-x-auto font-semibold text-lg">
                                            {resource.title}
                                        </Typography>
                                    </CardContent>
                                    <CardActions className="flex justify-center">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            href={resource.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{ backgroundColor: "#0090FF", fontWeight: "bold", color: "white", letterSpacing: "0.5px" }}
                                            className="transition duration-200"
                                            startIcon={<DownloadIcon />}
                                        >
                                            Download PDF
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Resources;
