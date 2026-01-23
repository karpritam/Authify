package com.psk.Authify_backend.Service.Implementation;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;
    @Value("${spring.mail.properties.mail.from.name}")
    private String fromName;

    public void sendWelcomeEmail(String toEmail, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("Authify <" + fromEmail + ">");
        message.setTo(toEmail);
        message.setSubject("Welcome to Our platform");
        message.setText("Hello " + name + ",\n\n" +
                "Thanks for registering with us!\n\n" +
                "\nBest Regards,\n" +
                "Team Authify");
        mailSender.send(message);
    }

    public void sendResetOtpEmail(String toEmail, String otp) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(fromEmail, fromName);
            helper.setTo(toEmail);
            helper.setSubject("Authify - Password Reset OTP");

            String html =
                    "<div style='font-family: Arial, sans-serif; padding: 20px;'>" +
                            "<h2 style='color:#222;'>Password Reset OTP</h2>" +
                            "<p>Your OTP for resetting your password is:</p>" +
                            "<h1 style='color:#ff0000; font-weight:bold; letter-spacing:3px;'>" + otp + "</h1>" +
                            "<p style='color:gray;'>OTP is valid only for 5 minutes.</p>" +
                            "<br>" +
                            "<p>Best Regards,<br><b>Team Authify</b></p>" +
                            "</div>";

            helper.setText(html, true); // HTML enabled
            mailSender.send(message);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Unable to send reset OTP email: " + e.getMessage());
        }
    }

    public void sendOtpEmail(String toEmail, String otp) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(fromEmail, fromName);
            helper.setTo(toEmail);
            helper.setSubject("Authify - Account Verification OTP");

            String html =
                    "<div style='font-family: Arial, sans-serif; padding: 20px;'>" +
                            "<h2 style='color:#222;'>Account Verification</h2>" +
                            "<p>Dear User,</p>" +
                            "<p>Your OTP is:</p>" +
                            "<h1 style='color:#0066ff; font-weight:bold; letter-spacing:3px;'>" + otp + "</h1>" +
                            "<p style='color:gray;'>OTP is valid only for 5 minutes.</p>" +
                            "<br>" +
                            "<p>Best Regards,<br><b>Team Authify</b></p>" +
                            "</div>";

            helper.setText(html, true); // HTML enabled
            mailSender.send(message);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Unable to send OTP email: " + e.getMessage());
        }
    }
}
