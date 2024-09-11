import nodemailer from 'nodemailer'

// Replace these values with your actual Gmail credentials
const emailUser = 'hung97064@hotmail.com';
const emailPass = 'doantotnghiep123';

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: emailUser, // Địa chỉ email của bạn
    pass: emailPass // Mật khẩu ứng dụng hoặc mật khẩu tài khoản Google
  }
});

export const verifyEmail = async (email, subject, link) => {
  try {
    await transporter.sendMail({
      from: emailUser,
      to: email,
      subject: subject,
      html: `
        <div>
          <p>Chúc mừng bạn đã đăng ký tài khoản thành công</p>
          <p>Để xác thực tài khoản, vui lòng bấm vào đường dẫn phía dưới</p>
          <a href="${link}">Bấm vào đây để xác thực tài khoản</a>
        </div>`
    });

    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const resetPassword = async (email, subject, link) => {
  try {
    await transporter.sendMail({
      from: emailUser,
      to: email,
      subject: subject,
      html: `
        <div>
          <p>Cảm ơn bạn đã sử dụng dịch vụ đặt lại mật khẩu của chúng tôi</p>
          <a href="${link}">Bấm vào đây để đi đến trang reset mật khẩu</a>
        </div>`
    });

    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};