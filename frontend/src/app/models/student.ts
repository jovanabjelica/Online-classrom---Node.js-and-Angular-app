export class Student {
    firstname: string = "";
    lastname: string = "";
    username: string = "";
    password: string = "";
    email: string = "";
    mobile: string = "";
    securityQuestion: string = "";
    securityAnswer: string = "";
    gender: string = "";
    address: string = "";
    schoolType: string = "";
    grade: number = 0;
    picture: string = "";

    reviews: {
        username: string;
        review: Number;
    }[] = [];

    reviewsAvg: number = 0;
    reviewsNum: number = 0;
}
