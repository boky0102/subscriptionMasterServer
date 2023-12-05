import axios from "axios";
import { error } from "console";
import "dotenv/config"
import { writeFile } from "fs";

export async function getCurrencyData(){
    delete require.cache["./currencies.json"];
    const authHeader ="Bearer" + process.env.CURRENCY_API_KEY;
    axios.get("https://api.fxratesapi.com/latest", {headers: {
        Authorization: authHeader
    }}).then((response) => {
        const path = "./currencies.json"
        const data = response.data.rates;
        writeFile(path, JSON.stringify(data), (error) => {
            if(error){
                console.log(error);
            } else {
                console.log("Sucessfully created JSON file with currenceis")
            }
        })
    }).catch((error) => {
        throw new Error("Couldn't get currencies from external API");
    })
}

