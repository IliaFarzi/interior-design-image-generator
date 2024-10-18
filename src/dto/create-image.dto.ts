export class CreateImageDto {
    style: string;
    location: string;
    items: { name: string, color: string, material: string }[];
}