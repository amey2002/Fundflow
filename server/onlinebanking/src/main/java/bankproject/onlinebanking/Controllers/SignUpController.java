package bankproject.onlinebanking.Controllers;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bankproject.onlinebanking.Model.Role;
import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Service.MailService;
import bankproject.onlinebanking.Service.SignUpService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class SignUpController {

    private final SignUpService signUpService;
    private final MailService mailService;

    @Value("${app.mail.enabled:false}")
    private boolean mailEnabled;

    private String generateOtp() {
        return String.format("%06d", new Random().nextInt(1_000_000));
    }

    private boolean trySendOtpEmail(String email, String otp) {
        if (!mailEnabled) {
            System.out.println("Mail disabled — OTP for " + email + ": " + otp);
            return false;
        }
        try {
            mailService.transactionMail(email, "FundFlow Registration OTP",
                    "Your FundFlow verification code is: " + otp
                            + "\n\nVerify here: http://127.0.0.1:3000/signup/otp\n\nThank you.");
            return true;
        } catch (Exception e) {
            System.out.println("Email send failed for " + email + ": " + e.getMessage());
            System.out.println("Use this OTP instead: " + otp);
            return false;
        }
    }

    private Map<String, Object> otpResponse(User user, boolean emailSent) {
        Map<String, Object> body = new HashMap<>();
        body.put("userId", user.getUserId());
        body.put("email", user.getEmail());
        body.put("firstname", user.getFirstname());
        body.put("lastname", user.getLastname());
        body.put("otp", user.getOtp());
        body.put("emailSent", emailSent);
        body.put("message", emailSent
                ? "OTP sent to your email."
                : "Email delivery unavailable. Use the OTP shown on screen.");
        return body;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> Signup(@RequestBody User user) {

        if (signUpService.findByEmail(user.getEmail()) != null) {
            return new ResponseEntity<>(Map.of("message", "Email already registered"), HttpStatus.CONFLICT);
        }

        String userid = UUID.randomUUID().toString();
        String otp = generateOtp();
        user.setUserId(userid);
        user.setOtp(otp);
        user.setRole(Role.USER);
        user.setCreatedDate(new Date(System.currentTimeMillis()));
        User theUser = signUpService.createUser(user);

        boolean emailSent = trySendOtpEmail(user.getEmail(), otp);
        return new ResponseEntity<>(otpResponse(theUser, emailSent), HttpStatus.OK);
    }

    @PostMapping("/otp")
    public ResponseEntity<?> checkOTP(@RequestBody User theUser) {
        if (theUser.getOtp() == null || theUser.getOtp().isBlank()) {
            return new ResponseEntity<>(Map.of("message", "OTP is required"), HttpStatus.BAD_REQUEST);
        }
        if (signUpService.findByOTP(theUser.getOtp().trim()) == null) {
            return new ResponseEntity<>(Map.of("message", "Invalid OTP"), HttpStatus.CONFLICT);
        }
        signUpService.updateIsEmailVerified(theUser.getOtp().trim());
        return new ResponseEntity<>(Map.of("message", "Email verified successfully"), HttpStatus.OK);
    }

    @PostMapping("/resend-otp/{userId}")
    public ResponseEntity<?> resendOTP(@PathVariable String userId) {

        User user = signUpService.findById(userId);
        if (user == null) {
            return new ResponseEntity<>(Map.of("message", "User not found"), HttpStatus.NOT_FOUND);
        }
        String otp = generateOtp();
        user.setOtp(otp);
        signUpService.save(user);

        boolean emailSent = trySendOtpEmail(user.getEmail(), otp);
        return new ResponseEntity<>(otpResponse(user, emailSent), HttpStatus.OK);
    }

}
