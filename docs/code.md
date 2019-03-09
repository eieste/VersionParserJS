## Classes

<dl>
<dt><a href="#Version">Version</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#filename_pattern">filename_pattern</a></dt>
<dd><p>Different Version Patterns</p>
</dd>
<dt><a href="#VersionType">VersionType</a> : <code>Readonly.&lt;{NUMBER: number, CLASSNAME_BUILD: number, STRIPPED_VERSION: number, VERSION: number, CLASSNAME: number, FILENAME: number, CLASSNAME_PATCH: number}&gt;</code></dt>
<dd><p>Types of version spelling there are Currently Supported.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#rjust">rjust(string, width, padding)</a> ⇒</dt>
<dd><p>Helper Function. Returns the string right justified in a string of specified length.</p>
</dd>
<dt><a href="#reverse">reverse(text)</a> ⇒ <code>string</code></dt>
<dd><p>Reverse a given string (Hello =&gt; olleH)</p>
</dd>
</dl>

<a name="Version"></a>

## Version
**Kind**: global class  

* [Version](#Version)
    * [new Version(raw_version)](#new_Version_new)
    * [.lt(other)](#Version+lt) ⇒ <code>boolean</code>
    * [.le(other)](#Version+le) ⇒ <code>boolean</code>
    * [.eq(other)](#Version+eq) ⇒ <code>boolean</code>
    * [.ge(other)](#Version+ge) ⇒ <code>boolean</code>
    * [.gt(other)](#Version+gt) ⇒ <code>boolean</code>
    * [.ne(other)](#Version+ne) ⇒ <code>boolean</code>
    * [.get_number()](#Version+get_number) ⇒ <code>number</code>
    * [.get_typed_version(type)](#Version+get_typed_version) ⇒
    * [.get_type()](#Version+get_type) ⇒
    * [.get_type_name()](#Version+get_type_name) ⇒
    * [.get_minor_version()](#Version+get_minor_version) ⇒
    * [.get_major_version()](#Version+get_major_version) ⇒
    * [.get_build_version()](#Version+get_build_version) ⇒
    * [.get_patch_version()](#Version+get_patch_version) ⇒
    * [.compatible_version_with(other_version)](#Version+compatible_version_with) ⇒ <code>boolean</code>

<a name="new_Version_new"></a>

### new Version(raw_version)
Create a new Version object from the given Version String


| Param | Description |
| --- | --- |
| raw_version | Unparsed version String |

<a name="Version+lt"></a>

### version.lt(other) ⇒ <code>boolean</code>
Compares current Version with a other version

**Kind**: instance method of [<code>Version</code>](#Version)  
**Returns**: <code>boolean</code> - returns true if the current version is lower than different version (current < different)  

| Param | Description |
| --- | --- |
| other | Different Version Object |

<a name="Version+le"></a>

### version.le(other) ⇒ <code>boolean</code>
Compares current Version with a other version

**Kind**: instance method of [<code>Version</code>](#Version)  
**Returns**: <code>boolean</code> - returns true if the current version is lower or equal than different version (current <= different)  

| Param | Description |
| --- | --- |
| other | Different Version Object |

<a name="Version+eq"></a>

### version.eq(other) ⇒ <code>boolean</code>
Compares current Version with a other version

**Kind**: instance method of [<code>Version</code>](#Version)  
**Returns**: <code>boolean</code> - returns true if the current version is equal to different version (current == different)  

| Param | Description |
| --- | --- |
| other | Different Version Object |

<a name="Version+ge"></a>

### version.ge(other) ⇒ <code>boolean</code>
Compares current Version with a other version

**Kind**: instance method of [<code>Version</code>](#Version)  
**Returns**: <code>boolean</code> - returns true if the current version is greater or equal to different version (current >= different)  

| Param | Description |
| --- | --- |
| other | Different Version Object |

<a name="Version+gt"></a>

### version.gt(other) ⇒ <code>boolean</code>
Compares current Version with a other version

**Kind**: instance method of [<code>Version</code>](#Version)  
**Returns**: <code>boolean</code> - returns true if the current version is greater than different version (current > different)  

| Param | Description |
| --- | --- |
| other | Different Version Object |

<a name="Version+ne"></a>

### version.ne(other) ⇒ <code>boolean</code>
Compares current Version with a other version

**Kind**: instance method of [<code>Version</code>](#Version)  
**Returns**: <code>boolean</code> - returns true if the current version is not the same as different version (current != different)  

| Param | Description |
| --- | --- |
| other | Different Version Object |

<a name="Version+get_number"></a>

### version.get\_number() ⇒ <code>number</code>
Calculates the Version Integer from paresed version

**Kind**: instance method of [<code>Version</code>](#Version)  
<a name="Version+get_typed_version"></a>

### version.get\_typed\_version(type) ⇒
Returns the version in a different spelling.

**Kind**: instance method of [<code>Version</code>](#Version)  
**Returns**: string A new Converted Versionstring  

| Param | Description |
| --- | --- |
| type | Defines the new spelling for current Version. Type should be used VersionType as enum |

<a name="Version+get_type"></a>

### version.get\_type() ⇒
Returns the Current Type of version

**Kind**: instance method of [<code>Version</code>](#Version)  
**Returns**: int  
<a name="Version+get_type_name"></a>

### version.get\_type\_name() ⇒
Returns the Name of Current Type of version

**Kind**: instance method of [<code>Version</code>](#Version)  
**Returns**: string  
<a name="Version+get_minor_version"></a>

### version.get\_minor\_version() ⇒
Returns Minor Version

**Kind**: instance method of [<code>Version</code>](#Version)  
**Returns**: int of minor  
<a name="Version+get_major_version"></a>

### version.get\_major\_version() ⇒
Returns Major Version

**Kind**: instance method of [<code>Version</code>](#Version)  
**Returns**: int of major  
<a name="Version+get_build_version"></a>

### version.get\_build\_version() ⇒
Returns Build Version

**Kind**: instance method of [<code>Version</code>](#Version)  
**Returns**: int of build  
<a name="Version+get_patch_version"></a>

### version.get\_patch\_version() ⇒
Returns Patch Version (Same as Build Version)

**Kind**: instance method of [<code>Version</code>](#Version)  
**Returns**: int of patch  
<a name="Version+compatible_version_with"></a>

### version.compatible\_version\_with(other_version) ⇒ <code>boolean</code>
Check if Versions are compatible (This check ignores the build/patch version for comparision)

**Kind**: instance method of [<code>Version</code>](#Version)  
**Returns**: <code>boolean</code> - true if the versions are compatible  

| Param | Description |
| --- | --- |
| other_version | A Different version to compare |

<a name="filename_pattern"></a>

## filename\_pattern
Different Version Patterns

**Kind**: global constant  
<a name="VersionType"></a>

## VersionType : <code>Readonly.&lt;{NUMBER: number, CLASSNAME\_BUILD: number, STRIPPED\_VERSION: number, VERSION: number, CLASSNAME: number, FILENAME: number, CLASSNAME\_PATCH: number}&gt;</code>
Types of version spelling there are Currently Supported.

**Kind**: global constant  
<a name="rjust"></a>

## rjust(string, width, padding) ⇒
Helper Function. Returns the string right justified in a string of specified length.

**Kind**: global function  
**Returns**: string  

| Param | Description |
| --- | --- |
| string | String to be filled |
| width | The width of the field containing the string |
| padding | Specifies the padding character |

<a name="reverse"></a>

## reverse(text) ⇒ <code>string</code>
Reverse a given string (Hello => olleH)

**Kind**: global function  
**Returns**: <code>string</code> - Reversed string output  

| Param | Description |
| --- | --- |
| text | Text to convert |

