export class User {
    constructor({ id, name, email, avatarUrl, phone, country = '' }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.avatarUrl = avatarUrl;
        this.phone = phone || '';
    }
}