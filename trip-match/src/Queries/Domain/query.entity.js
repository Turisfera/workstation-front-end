export class Query {
    constructor({
                    id,
                    userName,
                    userAvatar,
                    experienceName,
                    date,
                    question,
                    isAnswered = false,
                    answer = ''
                }) {
        this.id = id;
        this.userName = userName;
        this.userAvatar = userAvatar;
        this.experienceName = experienceName;
        this.date = date;
        this.question = question;
        this.isAnswered = isAnswered;
        this.answer = answer;
    }
}
