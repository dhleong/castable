import { ResumeState } from "../enums";

export class SeekRequest {
    public currentTime?: number;
    public customData?: any;
    public resumeState?: ResumeState;
}
