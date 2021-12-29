
// from https://github.com/Hamlib/Hamlib/blob/master/include/hamlib/rig.h#L132
const rig_errcode = {
    0:  {code: "0",  name: "RIG_OK",           description: "0 No error, operation completed successfully"},
    1:  {code: "1",  name: "RIG_EINVAL",       description: "1 invalid parameter"},
    2:  {code: "2",  name: "RIG_ECONF",        description: "2 invalid configuration (serial,..)"},
    3:  {code: "3",  name: "RIG_ENOMEM",       description: "3 memory shortage"},
    4:  {code: "4",  name: "RIG_ENIMPL",       description: "4 function not implemented, but will be"},
    5:  {code: "5",  name: "RIG_ETIMEOUT",     description: "5 communication timed out"},
    6:  {code: "6",  name: "RIG_EIO",          description: "6 IO error, including open failed"},
    7:  {code: "7",  name: "RIG_EINTERNAL",    description: "7 Internal Hamlib error, huh!"},
    8:  {code: "8",  name: "RIG_EPROTO",       description: "8 Protocol error"},
    9:  {code: "9",  name: "RIG_ERJCTED",      description: "9 Command rejected by the rig"},
    10: {code: "10", name: "RIG_ETRUNC",       description: "10 Command performed, but arg truncated"},
    11: {code: "11", name: "RIG_ENAVAIL",      description: "11 Function not available"},
    12: {code: "12", name: "RIG_ENTARGET",     description: "12 VFO not targetable"},
    13: {code: "13", name: "RIG_BUSERROR",     description: "13 Error talking on the bus"},
    14: {code: "14", name: "RIG_BUSBUSY",      description: "14 Collision on the bus"},
    15: {code: "15", name: "RIG_EARG",         description: "15 NULL RIG handle or any invalid pointer parameter in get arg"},
    16: {code: "16", name: "RIG_EVFO",         description: "16 Invalid VFO"},
    17: {code: "17", name: "RIG_EDOM",         description: "17 Argument out of domain of func"},
    18: {code: "18", name: "RIG_EDEPRECATED",  description: "18 Function deprecated"},
};


export class SimpleResponse {

    constructor(data){
        this.raw = data
        this.success = false
        this.error = {}

        var lines = data.split("\n")
        lines.pop()  // remove empty last line

        this.command = lines.shift()  // save the command we ran
        this.set_response(lines.pop())  // get the success/failure

        this.parse_reponse_lines(lines)  // figure out what is left
    }

    set_response(line){
        if(line != undefined){
            var parts = line.split(' ');

            if(parts[1] == '0'){
                this.success = true
            }

            this.error = rig_errcode[Math.abs(parts[1])]
        }
    }

    parse_reponse_lines(lines){
        for(var line of lines) {
            var parts = line.split(':')
            this[parts[0]] = parts[1].trim()
        }
    }
}