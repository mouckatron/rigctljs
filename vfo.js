import { get, set } from './index.js'

export function Frequency(f = null, callback){

    if( f == null ){
        this.get('+f', function(data){
            callback(new SimpleResponse(data))
        })
    }else {
        this.set('+F', [f], function(data){
            callback(new SimpleResponse(data))
        })
    }
}