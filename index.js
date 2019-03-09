"use strict";

/**
 * Different Version Patterns
 */
const filename_pattern = new RegExp("^[v|V]?[\_]?([0-9]+)\_([0-9]+)\_([0-9]+)$");
const class_pattern = new RegExp("^[v|V]?M([0-9]+)m([0-9]+)([p|b])([0-9]+)$");
const version_pattern = new RegExp("^[v|V]([0-9]+)\.([0-9]+)\.([0-9]+)$");
const stripped_version_pattern = new RegExp("^([0-9]+)\.([0-9]+)\.([0-9]+)$");
const number_version_pattern = new RegExp('^([0-9]{1,9})$');

/**
 * Types of version spelling there are Currently Supported.
 * @type {Readonly<{NUMBER: number, CLASSNAME_BUILD: number, STRIPPED_VERSION: number, VERSION: number, CLASSNAME: number, FILENAME: number, CLASSNAME_PATCH: number}>}
 */
const VersionType = Object.freeze({"FILENAME":1, "CLASSNAME":2, "VERSION":3, "STRIPPED_VERSION":4, "NUMBER": 5, "CLASSNAME_PATCH": 6, "CLASSNAME_BUILD": 7});

/**
 * Helper Function. Returns the string right justified in a string of specified length.
 * @param string String to be filled
 * @param width The width of the field containing the string
 * @param padding Specifies the padding character
 * @returns string
 */
function rjust( string, width, padding ) {
    padding = padding || " ";
    padding = padding.substr( 0, 1 );
    if ( string.length < width ){
        return padding.repeat( width - string.length ) + string;
    } else {
        return string;
    }
}

/**
 * Reverse a given string (Hello => olleH)
 * @param text Text to convert
 * @returns {string} Reversed string output
 */
function reverse(text){
    return text.split("").reverse().join("");
}


class Version {

    /**
     * Create a new Version object from the given Version String
     * @param raw_version Unparsed version String
     */
    constructor(raw_version){
        let self = this;
        let result = self._parse(raw_version);
        self._type = result["type"];
        self._major_version = result["major"];
        self._minor_version = result["minor"];
        self._build_version = result["build"];
    }

    /**
     * Compares current Version with a other version
     * @param other Different Version Object
     * @returns {boolean} returns true if the current version is lower than different version (current < different)
     */
    lt(other){
        let self = this;
        if(!other instanceof Version){
            throw "this method can only executed with another Version object"
        }
        return self.get_number() < other.get_number()
    }

    /**
     * Compares current Version with a other version
     * @param other Different Version Object
     * @returns {boolean} returns true if the current version is lower or equal than different version (current <= different)
     */
    le(other){
        let self = this;
        if(!other instanceof Version){
            throw "this method can only executed with another Version object"
        }
        return self.get_number() <= other.get_number()
    }

    /**
     * Compares current Version with a other version
     * @param other Different Version Object
     * @returns {boolean} returns true if the current version is equal to different version (current == different)
     */
    eq(other){
        let self = this;
        if(!other instanceof Version){
            throw "this method can only executed with another Version object"
        }

        return self.get_number() == other.get_number()
    }

    /**
     * Compares current Version with a other version
     * @param other Different Version Object
     * @returns {boolean} returns true if the current version is greater or equal to different version (current >= different)
     */
    ge(other){
        let self = this;
        if(!other instanceof Version){
            throw "this method can only executed with another Version object"
        }

        return self.get_number() >= other.get_number()
    }

    /**
     * Compares current Version with a other version
     * @param other Different Version Object
     * @returns {boolean} returns true if the current version is greater than different version (current > different)
     */
    gt(other){
        let self = this;
        if(!other instanceof Version){
            throw "this method can only executed with another Version object"
        }

        return self.get_number() > other.get_number()
    }

    /**
     * Compares current Version with a other version
     * @param other Different Version Object
     * @returns {boolean} returns true if the current version is not the same as different version (current != different)
     */
    ne(other){
        let self = this;
        if(!other instanceof Version){
            throw "this method can only executed with another Version object"
        }

        return self.get_number() != other.get_number()
    }

    /**
     * Calculates the Version Integer from paresed version
     * @returns {number}
     */
    get_number(){
        let self = this;
        let filled_major = rjust(self._major_version, 3, "0");
        let filled_minor = rjust(self._minor_version, 3, "0");
        let filled_build = rjust(self._build_version, 3, "0");
        return parseInt(filled_major+filled_minor+filled_build)
    }

    /**
     * Returns the version in a different spelling.
     * @param type Defines the new spelling for current Version. Type should be used VersionType as enum
     * @returns string A new Converted Versionstring
     */
    get_typed_version(type){
        let self = this;
        switch(type){

            // FILENAME
            case 1:
                return "v_"+self._major_version+"_"+self._minor_version+"_"+self._build_version;

            // CLASSNAME (BUILD)
            case 7:
            case 2:
                return "VM"+self._major_version+"m"+self._minor_version+"b"+self._build_version;

            // VERSION
            case 3:
                return "v"+self._major_version+"."+self._minor_version+"."+self._build_version;

            // STRIPPED_VERSION
            case 4:
                return self._major_version+"."+self._minor_version+"."+self._build_version;

            // NUMBER
            case 5:
                return self.get_number();

            // CLASSNAME (PATCH)
            case 6:
                return "VM"+self._major_version+"m"+self._minor_version+"p"+self._build_version;
        }
    }

    /**
     * Main Parse method. This method converts any version into type, major, minor, build information
     * @param any_version Any (in VersionTyped defined) spelling of version
     * @returns {{major: string, minor: string, build: string, type: string}}
     * @private
     */
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

        // Check if the given version string is a FILENAME Version
        if(filename_pattern.exec(str_version) != null){
            result = filename_pattern.exec(str_version);
            result_dict["type"] = VersionType.FILENAME;
        }

        // Check if the given version string is a CLASSNAME Version
        if(class_pattern.exec(str_version) != null){
            result = class_pattern.exec(str_version);
            if(result[3] == "b"){
                result_dict["type"] = VersionType.CLASSNAME_BUILD;
            }else if(result[3] == "p"){
                result_dict["type"] = VersionType.CLASSNAME_PATCH;
            }
            result.splice(3, 1)
        }

        // Check if the given version string is a Version String
        if(version_pattern.exec(str_version) != null){
            result = version_pattern.exec(str_version);
            result_dict["type"] = VersionType.VERSION
        }

        // Check if the given version string is a StrippedVersion Version
        if(stripped_version_pattern.exec(str_version) != null){
            result = stripped_version_pattern.exec(str_version);
            result_dict["type"] = VersionType.STRIPPED_VERSION
        }

        // Check if the given version string is a Number representation of a Version
        if(number_version_pattern.exec(str_version) != null) {
            result = number_version_pattern.exec(str_version);
            result_dict["type"] = VersionType.NUMBER;

            let reverse_nr = self.reverse(result[1]);

            let version_pices = [];

            for (let i = 0; i < reverse_nr.length; i = i + 3) {
                version_pices.push(reverse_nr.slice(i, i + 3));
            }

            result_dict["build"] = parseInt(self.reverse(version_pices[0]));

            if (version_pices.length > 1) {
                result_dict["minor"] = parseInt(self.reverse(version_pices[1]))
            } else {
                result_dict["minor"] = 0
            }

            if (version_pices.length > 2) {
                result_dict["major"] = parseInt(self.reverse(version_pices[2]))
            } else {
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

    /**
     * Returns the Current Type of version
     * @returns int
     */
    get_type(){
        let self = this;
        return self._type;
    }

    /**
     * Returns the Name of Current Type of version
     * @returns string
     */
    get_type_name(){
        let self = this;
        return Object.keys(VersionType).find(key => VersionType[key] === value);
    }

    /**
     * Returns Minor Version
     * @returns int of minor
     */
    get_minor_version(){
        let self = this;
        return self._minor_version;
    }

    /**
     * Returns Major Version
     * @returns int of major
     */
    get_major_version(){
        let self = this;
        return self._major_version;
    }

    /**
     * Returns Build Version
     * @returns int of build
     */
    get_build_version(){
        let self = this;
        return self._build_version;
    }

    /**
     * Returns Patch Version (Same as Build Version)
     * @returns int of patch
     */
    get_patch_version(){
        let self = this;
        return self._build_version;
    }

    /**
     * Check if Versions are compatible (This check ignores the build/patch version for comparision)
     * @param other_version A Different version to compare
     * @returns {boolean} true if the versions are compatible
     */
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