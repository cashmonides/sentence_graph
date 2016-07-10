//todo make a new directory that contains the whole tree


var Kernel = function (form_list, clause_type, voice, verb_type, level) {

    this.form_list = form_list;                                                     //list of Form objects (with each Form object having a property - what Element enum it is (subject, object, verb, etc.)
    this.clause_type = clause_type;                                                 //main, iq, is, cond_prot, cond_apod. purpose, ic
    this.voice = voice;                                                             //active, passive
    this.verb_type = verb_type;                                                     //transitive, intransitive, copula
    this.level = level;

    this.get_form = function (position) {
        return form_list[position];
    };

    this.get_size = function () {
        return this.form_list.length;
    };

    this.visit = function (visitor) {
        for (var i in this.form_list) {
            visitor(this, this.form_list[i]);
        }
    };



    //todo is it worth making an easy function does_form_list_have?

};


var Conjunction = function (form, left, right, clause_type) {
    this.form = form;
    this.left = left;
    this.right = right;
    this.clause_type = clause_type;

    this.get_form = function (position) {
        if (position === 1) {
            return form;
        } else {
            throw "invalid position for conjunction";
        }
    };

    this.get_size = function () {
        return 1;
    };

    this.visit = function (visitor) {
        this.left.visit(visitor);
        visitor(this, form);
        this.right.visit(visitor);
    };


};








/*
old kernel below

var Kernel = function(form_list, level, clause_type){
    this.form_list = form_list;
    this.level = level;
    this.clause_type = clause_type;

    this.get_form = function (position) {
        return form_list[position];
    };

    this.get_size = function () {
        return this.element_list.length;
    };

    this.visit = function (visitor) {
        for (var i in this.form_list) {
            visitor(this, this.form_list[i]);
        }
    };


};
    */