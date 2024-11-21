import React, { useEffect, useContext } from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import { Menu, styled, Button } from '@mui/material';

const StyledMenu = styled((props) => (
    <Menu
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(0.5),
        minWidth: 140,  
        width: 140
    },
}));

const LoginButton = () => {

    // useEffect(() => {
    //     if (localStorage.getItem("userId")) {
    //         console.log(localStorage.getItem("userId"));
    //         // setAccount(true);
    //     }
    // }, [account]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const navigate = useNavigate();
    const handleClose = () => {
        setAnchorEl(null);
    };

    // const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        handleClose()
        window.location.reload();
    }
    const UserPage = ()=>{
        // navigate('/user');
        // handleClose();
    }
    const BlogPage = ()=>{
        // navigate('/blogs');
        // handleClose();
    }


    return (
        <>
            {
                localStorage.getItem("userId") ?
                    <>
                        <div className='absolute right-[20px] md:right-[40px] top-3 gap-2 flex cursor-pointer' >
                            <div onClick={handleClick} className='flex gap-2'>
                                <img className='w-[35px] h-[35px] relative top-[4px] rounded-full ring-gray-300 dark:ring-gray-500' src={localStorage.getItem('userImage') || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBQLZBLliHC0oAh1vMfI7Z5IzTV8_RlzVeh6QqSzs_SCqn5a0rkuXEoVsuDPNxMntF0vc&usqp=CAU'} />
                                <p className='relative top-[8px] hidden md:block text-lg'>{localStorage.getItem('username')}</p>
                            </div>
                            <StyledMenu sx={{ display: 'flex', flexDirection: 'column' }} id="basic-menu" MenuListProps={{ 'aria-labelledby': 'basic-button' }} anchorEl={anchorEl} open={open} onClose={handleClose} >
                                <Button onClick={UserPage} style={{ width: '100%', color: 'white' }} variant="text">Profile</Button>
                                <Button onClick={logout} style={{ width: '100%', color: 'white' }} variant="text">Log Out</Button>
                            </StyledMenu>
                        </div>
                    </>
                    :
                    <button onClick={()=>navigate('/login')} className="absolute button right-[10px] md:right-[30px] scale-110" style={{ position: 'absolute',bottom:'10px',color:'white',scale:'0.85'}}>LOGIN</button>
            }
        </>
    )
}
export default LoginButton;