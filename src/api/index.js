const API_BASE = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";

export const getData = () => {
    return fetch(API_BASE)
    .then(res => res.json())
}