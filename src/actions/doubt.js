import { APIUrls } from '../helpers/urls';
import {UPDATE_CREATED_DOUBT,UPDATE_RESOLVED_DOUBT} from './actionTypes';
import  getFormBody  from '../helpers/utils';

export function createDoubt(topic,user,description){
    return (dispatch)=>{
        // console.log(id);
        const url=APIUrls.createDoubt();
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
            },
            body:getFormBody({topic,user,description}),
        })
        .then((response)=>{
           
            return response.json();
        }).then((data)=>{
        //    console.log(data);
            dispatch(updateDoubt(data.doubt));
        });
    };
}

export function updateDoubt(doubt){
    return {
        type:UPDATE_CREATED_DOUBT,
        doubt,
    };
}

export function resolveDoubt(id){

    return (dispatch)=>{
        // console.log(id);
        const url=APIUrls.resolve(id);
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
            },
            // body:getFormBody({user}),
        })
        .then((response)=>{
           
            return response.json();
        }).then((data)=>{
        //    console.log(data);
            dispatch(updateResolvedDoubt(data.doubt));
        });
    };
}

export function updateResolvedDoubt(resolvedDoubt){
    return {
        type:UPDATE_RESOLVED_DOUBT,
        resolvedDoubt,
    };
}

