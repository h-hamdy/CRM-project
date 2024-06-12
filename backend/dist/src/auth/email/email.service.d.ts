export declare class EmailService {
    private transporter;
    constructor();
    sendMail(to: string, subject: string, text: string): Promise<void>;
}
