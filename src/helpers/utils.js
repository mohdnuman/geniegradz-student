export default function getFormBody(params){
    let formBody=[];

    for(let property in params){
        let encodedKey=encodeURI(property);
        let encodedValue=encodeURI(params[property]);

        formBody.push(encodedKey+'='+encodedValue);
    }

    return formBody.join('&');  //"username=numan&password=123"
}