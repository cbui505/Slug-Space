var utils = (function(){
    function renderTemplate(source,context){
        var html; 
        var template = Handlebars.compile(source);
        console.log(template);
        if(template){
            html = template(context);
        }
        return html;
    }
    return {
        renderTemplate: renderTemplate,
    };
}());