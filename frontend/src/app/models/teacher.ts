export class Teacher{
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
    subjects: string[] = [];
    grades: string[] = [];
    source: string = "";
    status: string = "";
    cv: string = "";
    picture: string = "";
    reviewsAvg: number = 0;
    reviewsNum: number = 0;

    comments: string[] = [];
    
    reviews: {
        username: string;
        review: Number;
    }[] = [];

    busyDays: String[] = [];
    restDays: String[] = [];

    startWorkTime: string = "";
    endWorkTime: string = "";

    weekendWork: boolean = false;
}

