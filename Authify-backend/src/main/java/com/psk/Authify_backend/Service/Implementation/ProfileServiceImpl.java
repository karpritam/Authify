package com.psk.Authify_backend.Service.Implementation;

import com.psk.Authify_backend.Entity.UserEntity;
import com.psk.Authify_backend.Repository.UserRepository;
import com.psk.Authify_backend.Service.ProfileService;
import com.psk.Authify_backend.io.ProfileRequest;
import com.psk.Authify_backend.io.ProfileResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;

    @Override
    public ProfileResponse createProfile(ProfileRequest request) {
        UserEntity newProfile=convertToUserEntity(request);
        if(!userRepository.existsByEmail(request.getEmail())){
            newProfile=userRepository.save(newProfile);
            return convertToProfileResponse(newProfile);
        }
        throw new ResponseStatusException(HttpStatus.CONFLICT,"Email already exists");

    }

    private ProfileResponse convertToProfileResponse(UserEntity newProfile) {
        return ProfileResponse.builder()
                .name(newProfile.getName())
                .email(newProfile.getEmail())
                .userId(newProfile.getUserId())
                .isAccountVerified(newProfile.getIsAccountVerified())
                .build();
    }

    private UserEntity convertToUserEntity(ProfileRequest request) {
        return UserEntity.builder()
                .email(request.getEmail())
                .userId(UUID.randomUUID().toString())
                .name(request.getName())
                .password(request.getPassword())
                .isAccountVerified(false)
                .resetOtpExpireAt(0L)
                .verifyOtp(null)
                .verifyOtpExpireAt(0L)
                .resetOtp(null)
                .build();
    }
}
