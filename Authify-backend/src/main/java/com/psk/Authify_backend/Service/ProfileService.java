package com.psk.Authify_backend.Service;

import com.psk.Authify_backend.io.ProfileRequest;
import com.psk.Authify_backend.io.ProfileResponse;

public interface ProfileService {

    ProfileResponse createProfile(ProfileRequest request);
}
