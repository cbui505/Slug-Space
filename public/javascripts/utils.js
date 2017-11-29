var utils = (function(){
    function renderTemplate(source,context){
        var html; 
        var template = Handlebars.compile(source);
        if(template){
            html = template(context);
        }
        return html;
    }
    return {
        renderTemplate: renderTemplate,
    };
}());