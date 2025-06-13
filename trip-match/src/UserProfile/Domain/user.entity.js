export class User {
    constructor({ id, name, email, avatarUrl, country, phone }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.avatarUrl = avatarUrl;
        this.country = country || '';
        this.phone = phone || '';
    }
}