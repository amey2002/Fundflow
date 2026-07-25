package bankproject.onlinebanking;

import java.sql.Date;
import java.util.UUID;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import bankproject.onlinebanking.Model.Role;
import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AdminUserSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        User admin = userRepository.findByEmail("admin@fundflow.com");
        if (admin == null) {
            admin = new User();
            admin.setUserId(UUID.randomUUID().toString());
            admin.setFirstname("Fund");
            admin.setLastname("Admin");
            admin.setEmail("admin@fundflow.com");
            admin.setPassword(passwordEncoder.encode("Admin@12345"));
            admin.setRole(Role.ADMIN);
            admin.setEmailVerified(true);
            admin.setEnabled(true);
            admin.setCreatedDate(new Date(System.currentTimeMillis()));
            userRepository.save(admin);
            System.out.println("===== Created default admin: admin@fundflow.com / Admin@12345 =====");
            return;
        }

        if (admin.getRole() != Role.ADMIN) {
            admin.setRole(Role.ADMIN);
            admin.setEmailVerified(true);
            userRepository.save(admin);
            System.out.println("===== Promoted admin@fundflow.com to ADMIN =====");
        }
    }
}
