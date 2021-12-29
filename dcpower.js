
import { get, set } from './index.js'

export function PowerOn(){
    set("\x87", 1)
}

export function PowerOff(){
    set("\x87", 0)
}

export function PowerStandby(){
    set("\x87", 2)
}