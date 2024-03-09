import { IElement } from './../AppProvider';
import { SetStateAction } from 'react';
import axios from "axios";

const path = "http://localhost:3000/texts";

class API {
    private path

    constructor(path: string) {
        this.path = path
    }

    async getTexts()  {
        const response = await axios.get(this.path);
        console.log(response) 
        return response
    }
    
    async putText(content: string, id: string) {
        await axios.post(this.path, {
            id,
            content
        })
    }

    async deleteText (id: number) {
        await axios.delete(`${this.path}/${id}`)
    }
} 

export const APIText = new API(path)