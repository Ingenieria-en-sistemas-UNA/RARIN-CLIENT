import { BaseProvider } from './BaseProvider';
import axios from 'axios'
export class FileProvider extends BaseProvider {

    private _uri = axios.create({
        baseURL: this._baseUrlImages,
        params: {
            upload_preset: 'ka8bcl9d'
        },
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

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