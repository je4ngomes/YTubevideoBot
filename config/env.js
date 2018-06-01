const fs = require('fs');
const path = require('path');

const configEnvVar = {
    config(dir) {
        this._data = fs.readFileSync(
            path.resolve(dir), 
            { encoding: 'utf8' }
        );

        return this;
    },
    
    setEnv() {
        return this._entries
                    .reduce((prev, curr) => this.envObj(prev, curr), process.env);
    },

    envObj: (prev, [key, value]) => ({...prev, [key]: value}),

    formatRows() {
        this._state = this._state.filter(this.remove.blankLines);
        return this;
    },

    keyValuePair() {
        this._state = this._state.map(row => row.split('='));
        return this;
    },

    remove: {
        newLines() {
            configEnvVar._state = configEnvVar._data.split('\n');
            return configEnvVar;
        },
        blankLines: row => row.length > 1 ? true : false,
        whiteSpaces() {
            configEnvVar._state
                .forEach(function(row) {          
                    const keyValue = row.map(keyValue => /[\s]+/.test(keyValue) ? keyValue.trim() : keyValue);
                    configEnvVar._entries.push(keyValue);
                });

            return configEnvVar;
        } 
    },
    _state: null,
    _entries: [],
    _data: null
};

module.exports.config = (dirname) => {
    process.env = configEnvVar
        .config(dirname)
        .remove.newLines()
        .keyValuePair()
        .formatRows()
        .remove.whiteSpaces()
        .setEnv();
};