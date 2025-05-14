export class Agency {
    constructor({ id = "", name = "", description = "", socialLinks = {}, avatarUrl = "" }) {
        this.id          = id;
        this.name        = name;
        this.description = description;
        this.socialLinks = socialLinks;
        this.avatarUrl   = avatarUrl;
    }
}
