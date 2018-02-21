$(function() {

    $("#bookCreateForm").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "api/books",
            data: $('#bookCreateForm').serialize(),
            success: function(response) {
              console.log(response);
                $("input").val("");
                $(".resultDiv").empty();
                $(".resultDiv").html("<b>Name of Book :</b>"+response.book_title+" <b>Book Id :</b>"+response.id);
            },
            error: function(err) {
                $(".resultDiv").empty();
                $(".resultDiv").append(err.responseText);
            }
        });
    });
  
    $("#getAllBooks").on("click", function(e) {
        e.preventDefault();
        $.ajax({
            type: "get",
            url: "api/books",
            success: function(response) {
                $("input").val("");
if(response.length!==0){
                $(".resultDiv").empty();
                var ResultDiv = $("<div>");
                response.map(function(value, index) {
                    ResultDiv.append($("<div>").addClass("infoDiv").html("<p><em><b>Book Name :</b></em>" + value.book_title + "</p><p><em><b>Book Id :</b></em>" + value.id +"<p><em><b>Comment Count :</b></em>"+ value.count));
                })
                $(".resultDiv").append(ResultDiv);
}
              else
                $(".resultDiv").text("you dont have any book,you idiot");

            },
            error: function(err) {
                $(".resultDiv").empty();
                $(".resultDiv").append(err.responseText);
            }
        });
    });
      
  $("#deleteAllBooks").on("click", function(e) {
        e.preventDefault();
        $.ajax({
            type: "delete",
            url: "api/books",
            success: function(response) {
                $("input").val("");
                $(".resultDiv").empty();
              $(".resultDiv").text(response);
                
            },
            error: function(err) {
                $(".resultDiv").empty();
                $(".resultDiv").append(err.responseText);
            }
        });
    });

  $("#bookGetForm").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "get",
            url: "/api/books/" + $("#bookGetForm").children().eq(0).val(),
            success: function(response) {
                $("input").val("");
                $(".resultDiv").empty();
                var ResultDiv = $("<div>");
                    ResultDiv.append($("<div>").addClass("infoDiv").html("<p><em><b>Book Name :</b></em>" + response.book_title +
                        "</p><p><em><b>Book Id :</b></em>" + response._id +
                        "</p><p><em><b>Comment Text :</b></em>" + response.book_comment.join("-")));

                $(".resultDiv").append(ResultDiv);
            },
            error: function(err) {
                $(".resultDiv").empty();
                $(".resultDiv").append(err.responseText);
            }
        });
    });

    $("#bookUpdateForm").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "api/books/" + $("#bookUpdateForm").children().eq(0).val(),
            data: $("#bookUpdateForm").serialize(),
            success: function(response) {
              console.log(response);
                $("input").val("");
                $(".resultDiv").empty();
                var ResultDiv = $("<div>");
                    ResultDiv.append($("<div>").addClass("infoDiv").html("<p><em><b>Book Name :</b></em>" + response.book_title +
                        "</p><p><em><b>Book Id :</b></em>" + response._id +
                        "</p><p><em><b>Comment Text :</b></em>" + response.book_comment.join("-")));
                $(".resultDiv").append(ResultDiv);
            },
            error: function(err) {
                $(".resultDiv").empty();
                $(".resultDiv").append(err.responseText);
            }
        });
    });
    $("#bookDeleteForm").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "delete",
             url: "/api/books/" + $("#bookDeleteForm").children().eq(0).val(),
            success: function(response) {
                $("input").val("");
                $(".resultDiv").empty();
                $(".resultDiv").html(response);
            },
            error: function(err) {
                $(".resultDiv").empty();
                $(".resultDiv").append(err.responseText);
            }
        });
    });
});