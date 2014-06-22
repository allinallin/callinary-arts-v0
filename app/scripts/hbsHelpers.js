(function(Handlebars) {

	Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

	    switch (operator) {
	        case '==':
	            return (v1 == v2) ? options.fn(this) : options.inverse(this);
	        case '===':
	            return (v1 === v2) ? options.fn(this) : options.inverse(this);
	        case '<':
	            return (v1 < v2) ? options.fn(this) : options.inverse(this);
	        case '<=':
	            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
	        case '>':
	            return (v1 > v2) ? options.fn(this) : options.inverse(this);
	        case '>=':
	            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
	        case '&&':
	            return (v1 && v2) ? options.fn(this) : options.inverse(this);
	        case '||':
	            return (v1 || v2) ? options.fn(this) : options.inverse(this);
	        default:
	            return options.inverse(this);
	    }
	});
	
	Handlebars.registerHelper('if_even', function(conditional, options) {
	    if ((conditional % 2) === 0) {
	        return options.fn(this);
	    } else {
	        return options.inverse(this);
	    }
	});

	Handlebars.registerHelper('if_odd', function(conditional, options) {
	    if ((conditional % 2) !== 0) {
	        return options.fn(this);
	    } else {
	        return options.inverse(this);
	    }
	});

})(window.Handlebars);