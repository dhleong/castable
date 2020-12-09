export class Image {
    constructor(
        public readonly url: string,
        public readonly width: number | null = null,
        public readonly height: number | null = null,
    ) {}
}
