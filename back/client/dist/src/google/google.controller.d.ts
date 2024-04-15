import { GoogleService } from "./google.service";
import { Request, Response } from 'express';
export declare class GoogleController {
    private readonly googleService;
    constructor(googleService: GoogleService);
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: Request, res: Response): Promise<void>;
}
