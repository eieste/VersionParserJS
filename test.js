let version_parser = require("./index.js");

let a = new version_parser.Version("v_1_1_1");
console.log("Type"+a._type);
console.log("Major"+a._major_version);
console.log("Minor"+a._minor_version);
console.log("Build"+a._build_version);

console.log("----------");
let b = new version_parser.Version("v3.2.1");
console.log("Type"+b._type);
console.log("Major"+b._major_version);
console.log("Minor"+b._minor_version);
console.log("Build"+b._build_version);
console.log("----------");

let c = new version_parser.Version("VM1m2b3");
console.log("Type"+c._type);
console.log("Major"+c._major_version);
console.log("Minor"+c._minor_version);
console.log("Build"+c._build_version);

console.log("----------");


// v324.12.18
// v324.012.018
//   324012018
//   810.210.423

let d = new version_parser.Version("324012018");
console.log("Type"+d._type);
console.log("Major"+d._major_version);
console.log("Minor"+d._minor_version);
console.log("Build"+d._build_version);


console.log(d.get_number());
console.log(c.get_number());

console.log(d.gt(c));