$(function() {

    $("#projectCreateForm").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "api/",
            data: $('#projectCreateForm').serialize(),
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
    $("#getAllProjectSubmit").on("click", function(e) {
        e.preventDefault();
        $.ajax({
            type: "get",
            url: "/api/getallproject/",
            success: function(response) {
                console.log(response);
                $(".resultDiv").empty();
                var ResultDiv = $("<div>").addClass("infoDiv");
                response.map(function(value, index) {
                    ResultDiv.html("<p><em><b>Project Name :</b></em>" + value.project_name + "</p><p><em><b>Project Id :</b></em>" + value._id);
                })
                $(".resultDiv").append(ResultDiv);
            },
            error: function(err) {
                $(".resultDiv").empty();
                $(".resultDiv").append(err.responseText);
            }
        });
    });

    $("#issueCreateForm").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "api/issues/" + $("#issueCreateForm").children().eq(0).val(),
            data: $('#issueCreateForm').serialize(),
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

    $("#issueGetForm").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "get",
            url: "/api/issues/" + $("#issueGetForm").children().eq(0).val(),
            success: function(response) {
                console.log(response);
                $(".resultDiv").empty();
                var ResultDiv = $("<div>");
                response.map(function(value, index) {
                    ResultDiv.append($("<div>").addClass("infoDiv").html("<p><em><b>Issue Name :</b></em>" + value.issue_title +
                        "</p><p><em><b>Issue Id :</b></em>" + value._id +
                        "</p><p><em><b>Issue Text :</b></em>" + value.issue_text +
                        "</p><p><em><b>Issue Status :</b></em>" + value.status +
                        "</p><p><em><b>Issue isOpen :</b></em>" + value.open + "</p>"));
                })
                $(".resultDiv").append(ResultDiv);
            },
            error: function(err) {
                $(".resultDiv").empty();
                $(".resultDiv").append(err.responseText);
            }
        });
    });

    $("#issueUpdateForm").submit(function(e) {
        e.preventDefault();
        let object = "";
        object = $('#issueUpdateForm').serialize();
        if ($("#extra").is(':checked')) {
            object = object + "&open=false";
        }
        var url = "api/issues/" + $(this).children().val();;
        $.ajax({
            type: "put",
            url: url,
            data: object,
            success: function(response) {
                $("#extra").prop("checked", false);
                $("input").val("");
                $(".resultDiv").empty();
                $(".resultDiv").append($("<span>").text(response));
            },
            error: function(err) {
                $(".resultDiv").empty();
                $(".resultDiv").append(err.responseText);
            }
        });
    });
    $("#issueDeleteForm").submit(function(e) {
        e.preventDefault();
        var url = "api/issues/" + $(this).prevAll().eq(1).val();
        $.ajax({
            type: "delete",
            url: url,
            data: $('#issueDeleteForm').serialize(),
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