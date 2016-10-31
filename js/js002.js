function sayHello(){
    //console.log("Hello");
var str = $("#input").val();


    $("#output").text(str)
}

    $("#test").bind('click',sayHello);