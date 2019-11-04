import { BaseProvider } from './BaseProvider';
export class FileProvider extends BaseProvider {

    public upload = async (file: File): Promise<string> => {
        try {
            const formData: FormData = new FormData();
            formData.append('file', file);
            const response = await fetch(`${this._baseUrlApi}/api/files`, {
                method: 'POST',
                body: formData,
            });
            const { imageUrl } = await response.json();
            console.log(imageUrl);
            return imageUrl;
        } catch (error) {
            return '';
        }
    }

}