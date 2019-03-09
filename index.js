"use strict";


const filename_pattern = new RegExp("^[v|V]?[\_]?([0-9]+)\_([0-9]+)\_([0-9]+)$");
const class_pattern = new RegExp("^[v|V]?M([0-9]+)m([0-9]+)([p|b])([0-9]+)$");
const version_pattern = new RegExp("^[v|V]([0-9]+)\.([0-9]+)\.([0-9]+)$");
const stripped_version_pattern = new RegExp("^([0-9]+)\.([0-9]+)\.([0-9]+)$");
const number_version_pattern = new RegExp('^([0-9]{1,9})$');

const VersionType = Object.freeze({"FILENAME":1, "CLASSNAME":2, "VERSION":3, "STRIPPED_VERSION":4, "NUMBER": 5, "CLASSNAME_PATCH": 6, "CLASSNAME_BUILD": 7});


function rjust( string, width, padding ) {
    padding = padding || " ";
    padding = padding.substr( 0, 1 );
    if ( string.length < width )
        return padding.repeat( width - string.length ) + string;
    else
        return string;
}

class Version {

    constructor(raw_version){
        let self = this;
        let result = self._parse(raw_version);
        self._type = result["type"];
        self._major_version = result["major"];
        self._minor_version = result["minor"];
        self._build_version = result["build"];
    }

    lt(other){
        let self = this;
        if(!other instanceof Version){
            throw "this method can only executed with another Version object"
        }
        return self.get_number() < other.get_number()
    }

    le(other){
        let self = this;
        if(!other instanceof Version){
            throw "this method can only executed with another Version object"
        }
        return self.get_number() <= other.get_number()
    }

    eq(other){
        let self = this;
        if(!other instanceof Version){
            throw "this method can only executed with another Version object"
        }

        return self.get_number() == other.get_number()
    }

    ge(other){
        let self = this;
        if(!other instanceof Version){
            throw "this method can only executed with another Version object"
        }

        return self.get_number() >= other.get_number()
    }

    gt(other){
        let self = this;
        if(!other instanceof Version){
            throw "this method can only executed with another Version object"
        }

        return self.get_number() > other.get_number()
    }

    ne(other){
        let self = this;
        if(!other instanceof Version){
            throw "this method can only executed with another Version object"
        }

        return self.get_number() != other.get_number()
    }

    get_number(){
        let self = this;
        let filled_major = rjust(self._major_version, 3, "0");
        let filled_minor = rjust(self._minor_version, 3, "0");
        let filled_build = rjust(self._build_version, 3, "0");
        return parseInt(filled_major+filled_minor+filled_build)
    }

    get_typed_version(type){
        let self = this;
        switch(type){

            case 1:
                return "v_"+self._major_version+"_"+self._minor_version+"_"+self._build_version;

            case 7:
            case 2:
                return "VM"+self._major_version+"m"+self._minor_version+"b"+self._build_version;

            case 3:
                return "v"+self._major_version+"."+self._minor_version+"."+self._build_version;

            case 4:
                return self._major_version+"."+self._minor_version+"."+self._build_version;

            case 5:
                return self.get_number();

            case 6:
                return "VM"+self._major_version+"m"+self._minor_version+"p"+self._build_version;
        }
    }

    reverse(text){
        return text.split("").reverse().join("");
    }

    _parse(any_version){
        let self = this;
        let result = false;
        let str_version = String(any_version);
        let result_dict = {
            "type": "Could not parse type",
            "major": "Could not parse major",
            "minor": "Could not parse minor",
            "build": "Could not parse build"
        };

        if(filename_pattern.exec(str_version) != null){
            result = filename_pattern.exec(str_version);
            result_dict["type"] = VersionType.FILENAME;
        }

        if(class_pattern.exec(str_version) != null){
            result = class_pattern.exec(str_version);
            if(result[3] == "b"){
                result_dict["type"] = VersionType.CLASSNAME_BUILD;
            }else if(result[3] == "p"){
                result_dict["type"] = VersionType.CLASSNAME_PATCH;
            }
            result.splice(3, 1)
        }

        if(version_pattern.exec(str_version) != null){
            result = version_pattern.exec(str_version);
            result_dict["type"] = VersionType.VERSION
        }

        if(stripped_version_pattern.exec(str_version) != null){
            result = stripped_version_pattern.exec(str_version);
            result_dict["type"] = VersionType.STRIPPED_VERSION
        }

        if(number_version_pattern.exec(str_version) != null){
            result = number_version_pattern.exec(str_version);
            result_dict["type"] = VersionType.NUMBER;

            let reverse_nr = self.reverse(result[1]);

            let version_pices = [];

            for(let i = 0; i < reverse_nr.length; i = i+3 ) {
                version_pices.push(reverse_nr.slice(i, i+3));
            }

            result_dict["build"] = parseInt(self.reverse(version_pices[0]));

            if (version_pices.length > 1){
                result_dict["minor"] = parseInt(self.reverse(version_pices[1]))
            }else{
                result_dict["minor"] = 0
            }

            if (version_pices.length > 2){
                result_dict["major"] = parseInt(self.reverse(version_pices[2]))
            }else{
                result_dict["major"] = 0
            }

            return result_dict;
        }

        if(!result){
            throw "Could not parse "+str_version
        }

        result_dict["major"] = parseInt(result[1]);
        result_dict["minor"] = parseInt(result[2]);
        result_dict["build"] = parseInt(result[3]);

        return result_dict
    }

    get_type(){
        let self = this;
        return self._type;
    }

    get_minor_version(){
        let self = this;
        return self._minor_version;
    }

    get_major_version(){
        let self = this;
        return self._major_version;
    }

    get_build_version(){
        let self = this;
        return self._build_version;
    }

    get_patch_version(){
        let self = this;
        return self._build_version;
    }

    compatible_version_with(other_version){
        let self = this;
        let result = {};
        if(other_version instanceof Version){
            result = {
                "major": other_version.get_major_version(),
                "minor": other_version.get_minor_version(),
                "build": other_version.get_build_version()
            }

        }else{
            result = self._parse(other_version)
        }

        if(result["major"] == self._major_version && result["minor"] == self._minor_version){
            return true
        }else{
            return false
        }
    }
}

module.exports = {
    VersionType,
    Version
};