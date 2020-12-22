var assert = require("assert");
var api = require('../routes/api.js');


describe("composeGreet", function(){
    it("shall add hello to name", function(){
        assert(api.composeGreet('Ignacio')==="hello Ignacio\n");
    })
})
