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

    public upload = async ( file: File ): Promise<string | null> => {
        try {
            const formData: FormData =  new FormData();
            formData.append('file', file);
            const response = await this._uri.post('v1_1/dhp8mrpln/image/upload', formData);
            const { data } = response.data;
            return '';
        } catch (error) {
            return null
        }
    }

}