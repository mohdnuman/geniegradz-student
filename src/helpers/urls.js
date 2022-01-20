const API_ROOT='http://192.168.1.37:8000/api';


export const APIUrls={
    createDoubt:()=>`${API_ROOT}/doubts/create`,
    resolve:(id)=>`${API_ROOT}/doubts/resolve/${id}`

}