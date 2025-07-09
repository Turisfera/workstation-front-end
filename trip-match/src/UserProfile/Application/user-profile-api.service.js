
import apiClient from '../../Shared/Infrastructure/api.js';

export class UserProfileApiService {

    async getProfile(userId) {
        const profileUrl = `/users/${userId}`;
        return await apiClient.get(profileUrl);
    }

    async updateUser(userId, userData) {
        const url = `/users/${userId}`;
        const command = {
            firstName: userData.name.split(' ')[0],
            lastName: userData.name.split(' ').slice(1).join(' '),
            number: userData.phone
        };
        return await apiClient.put(url, command);
    }

    async updateTouristAvatar(userId, avatarUrl) {
        const url = `/tourists/${userId}`;
        const command = { avatarUrl: avatarUrl };
        return await apiClient.put(url, command);
    }
}