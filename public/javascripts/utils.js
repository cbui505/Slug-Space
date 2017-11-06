var util = (function(){
    // takes in an element containing
    // reference to the source 
    function renderTemplate(source, context){
        var template,
            html; 

            template = Handlebars.compile(source); 
        //compile returns a function
        if(template){
            html = template(context);
            return html; 
        }else{
            console.error("template not compiled properly");
        }
    }

}());