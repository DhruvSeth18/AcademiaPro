export const emailMessage =(username,email,password) =>{
return `
    <p>Dear <strong>${username}</strong>,</p>

    <p>We are pleased to inform you that your account has been successfully created in our system.</p>

    <p><strong>Your login credentials are as follows:</strong></p>
    <ul>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Password:</strong> <strong style="font-weight: bold;">${password}</strong></li>
    </ul>

    <p>You can now access your account using the provided credentials. If you face any issues or need further assistance, feel free to reach out to our support team.</p>

    <p>You can login to your account here: 
        <a href="http://localhost:3000/login" target="_blank" style="color: blue; text-decoration: underline;">Login Page</a>
    </p>

    <p>We look forward to your active participation.</p>

    <p>Best regards,</p>
    <p><strong>AcademiaPro Team</strong><br />
    Lead<br />
`;
}