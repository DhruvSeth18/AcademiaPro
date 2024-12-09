export const emailMessage = (username, email, password) => {
    return `
Dear ${username},

We are pleased to inform you that your account has been successfully created in our system.

Your login credentials are as follows:
- Email:  ${email}
- Password:  ${password}

You can now access your account using the provided credentials. If you face any issues or need further assistance, feel free to reach out to our support team.

You can log in to your account here:
http://localhost:3000/login

We look forward to your active participation.

Best regards,  
AcademiaPro Team  
Lead  
`;
};

export const updateAccountMessage = (username, email, password) => {
    return `
Dear ${username},  

Your account details have been successfully updated.  

Your updated login credentials are:  
- Email: ${email}  
- Password: ${password}  

If you have any issues or need assistance, feel free to contact our support team.  

You can log in to your account here:  
http://localhost:3000/login  

Best regards,  
AcademiaPro Team  
Lead  
`;
};

export const teacherEmailMessage = (username, email, password) => {
    return `
Dear ${username},  

We are pleased to inform you that your teacher account has been successfully created in our system.  

Your login credentials are as follows:  
- Email: ${email}  
- Password: ${password}  

You can now access your account using the provided credentials. If you face any issues or need further assistance, feel free to reach out to our support team.  

You can log in to your account here:  
http://localhost:3000/login  

We look forward to your valuable contribution to our platform.  

Best regards,  
AcademiaPro Team  
Lead  
`;
};

export const emailMessageTeacherUpdate = (username, email, password) => {
    return `
Dear ${username},

We are writing to inform you that your account details have been successfully updated in our system.

Your updated login credentials are as follows:
- Email:  ${email}
- Password:  ${password}

You can now access your account using the updated credentials. If you face any issues or need further assistance, feel free to reach out to our support team.

You can log in to your account here:
http://localhost:3000/login

We look forward to your continued engagement and contribution.

Best regards,  
AcademiaPro Team  
Lead  
`;
};
