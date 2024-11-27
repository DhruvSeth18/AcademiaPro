import emailjs from 'emailjs-com';

const sendEmail = async (data) => {
    try {
        const { username, email, message } = data;
        
        const templateParams = {
            from_name: username,
            from_email: email,
            message: message,
            to_email: 'vortexdhruv@gmail.com',
        };

        const userId = 'LwC1q78tlt7K31RBL'; 

        const adminResponse = await emailjs.send(
            'service_68iq72h',
            'template_s8h57lv',
            templateParams,
            userId
        );

        console.log('Admin Email Sent:', adminResponse);

        const customerResponse = await emailjs.send(
            'service_68iq72h', 
            'template_p5w3n4e',
            templateParams,
            userId
        );

        console.log('Customer Email Sent:', customerResponse);

        return { status: true, message: 'Emails sent successfully' };

    } catch (error) {
        console.error('Error sending email:', error);
        return { 
            status: false, 
            message: 'Failed to send email. Please try again later.' 
        };
    }
};

export default sendEmail;
