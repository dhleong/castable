import { ResumeState } from "../enums";

export class SeekRequest {
    currentTime?: number;
    customData?: any;
    resumeState?: ResumeState;
}
