var nameArray = new Array();
var imageArray = new Array();
var descriptionArray = new Array();
var referenceArray = new Array();
var urlArray = new Array();
var rowID; // hold the user selection
var xmlData; // hold xml data

/* -----------------XML CALLs---------------------------------------*/

$(document).on("pagecreate", "#mainPage", function () {
    console.log("in xml home");
    $.ajax({
        type: "GET",
        url: "group.xml",
        dataType: "xml",
        success: function (xml) {
            buildmenu(xml);
        },
        error: function (e) {
            alert(e.status + "-" + e.statusText);
        }
    });
});

// build up individual page
function buildind(xml, choice) {
	console.log($(xml).find("brandname:nth(" + choice + ")").text() + " ; " + $(xml).find("drugname:nth(" + choice + ")").text() + " ; " + $(xml).find("description:nth(" + choice + ")").text());

	// clear all information before append
	$("h2").html("");
	$("h3").html("");
	$("h4").html("");
	$("h5").html("");
	$("#contraind1").html("");
	$("#contraind2").html("");

	var company = $(xml).find("companyname").text();
	var companylink = $(xml).find("companyname").attr("url");
	// build up drug information
	$("#brandname").append("Brand Name: " + ($(xml).find("brandname:nth(" + choice + ")").text()));
	$("#drugname").append("Drug Name: " + ($(xml).find("drugname:nth(" + choice + ")").text()));
	$("#drugdescription").append("Description: " + ($(xml).find("description:nth(" + choice + ")").text()));
	$("#administration").append("Administration: " + ($(xml).find("administration:nth(" + choice + ")").text()));
	$("#contraind1").append("1st contraindication: " + ($(xml).find("contraindication1:nth(" + choice + ")").text()));
	$("#contraind2").append("2nd contraindication: " + ($(xml).find("contraindication1:nth(" + choice + ")").text()));
	$("#distribute").append("Distributed by " + ($(xml).find("companyname").text()));

	//$("#pic").html("<img src='_css/images/" +
						//$(xml).find("itemimage:nth(" + choice + ")").text() +
						//"' width='100'>");
}



function buildmenu(xml) {
    console.log("in xml buildmenu");

    xmlData = xml;

    // loop through pill item nodes
    $(xml).find("product").each(function (n) {
        $("ul#pillList").append(
            "<li li-id='" + n + "'>" +
            "<a href='#individual' class='ui-btn ui-icon-pills ui-btn-icon-left'>" +
            $(this).find("brandname").text() +
            "</a>" +
            "</li>"
        );

    });

	// needed after dynamic creation of a listview
    $("ul#pillList").listview("refresh");// needed after dynamic creation of a listview

	// navbar formatting after dynamic creation
	$("#navind").navbar("destroy");
	$("#navind").navbar();
} // end of buildmenu

$(document).on("click", "ul#pillList >li", function() {
	rowID = $(this).closest("li").attr("li-id");
	buildind(xmlData, rowID);
});

$(document).on("click", "ul#listhome >li", function() {
	rowID = $(this).closest("li").attr("li-id");
});

$(document).on("click", "ul#listind >li", function() {
	rowID = $(this).closest("li").attr("li-id");
	buildind(xmlData, rowID);
});









/* -----------------JSON CALL---------------------------------------*/

$(document).on('pagecreate', '#mainPage', function () {
    $.getJSON("JSON04-nutritiondefinitions.json", function (data) {
        console.log(data);

        $("#nutritionList").html("");

        var start = data.nutritionInfo.nameGroup;

        for (x = 0; x < start.length; x++) {
            nameArray[x] = start[x].name;
            imageArray[x] = start[x].photo;
            descriptionArray[x] = start[x].description;
            referenceArray[x] = start[x].reference;
            urlArray = start[x].url;
            // build listview items
            $("#nutritionList").append(
                "<li li-id='" + x + "'>" +
                "<a href='#nutritionInfo' class='ui-btn ui-icon-" + start[x].icon + " ui-btn-icon-left'>" + start[x].name +
                "</a>" + "</li>"
            );

        }
        //TESTING
        console.log(nameArray);
        console.log(imageArray);
        console.log(descriptionArray);
        console.log(referenceArray);
        // **NOT STORING PROPERLY**
        console.log(urlArray)

    });

    $("#nutritionList").listview("refresh"); // needed after dynamic creation of a listview

    // navbar formatting after dynamic creation
	//$("#navMain").navbar("destroy");
	//$("#navMain").navbar();

});


$(document).on("click", "#nutritionList >li", function () {
    rowID = $(this).closest("li").attr("li-id");
});


$(document).on("pagebeforeshow", "#nutritionInfo", function () {
    $.getJSON("JSON04-nutritiondefinitions.json", function (data) {

    // clear block before adding data
    $("#ref").html("");
    $("#img").html("");


    // Update nutrition data
    $("#nutritionTitle").html(nameArray[rowID]);
    $("#description").html(descriptionArray[rowID]);
    $("#ref").html("Reference: <br>" + referenceArray[rowID] + "<br>" + "<a href=" + data.nutritionInfo.nameGroup[rowID].url +"'>For More Info</a>");

    $("#img").html("<img src='css/images/" + data.nutritionInfo.nameGroup[rowID].image + "' width='60%'>");
    //**Is this needed on this page?**
    //$("#nutritionList").listview("refresh");

    // navbar formatting after dynamic creation
	//$("#navNut").navbar("destroy");
	//$("#navNuts").navbar();
});
    });


/* -------------------POP UP INFO ON THE MAIN PAGE-------------------------------------*/

$(document).on('pagecreate', '#mainPage', function () {
    $.getJSON("students.json", function (data) {

        // Sandra Info
        $("#studentInfo").append("Student Name: " + data.students[0].fullname + "<br>" +
            "Student Num # " + data.students[0].snumber + "<br>" +
            "Login: " + data.students[0].slogin + "<br>");
        var myImage = data.students[0].spicture;
        $("#myImage").append("<img src='css/images/" + myImage + "' width='60%'>");

        // Sophie Info
        $("#studentInfoS").append("Student Name: " + data.students[1].fullname + "<br>" +
            "Student Num # " + data.students[1].snumber + "<br>" +
            "Login: " + data.students[1].slogin + "<br>");
        var myImageS = data.students[1].spicture;
        $("#myImageS").append("<img src='css/images/" + myImageS + "' width='60%'>");

        // Tom Info
        $("#studentInfoT").append("Student Name: " + data.students[2].fullname + "<br>" +
            "Student Num # " + data.students[2].snumber + "<br>" +
            "Login: " + data.students[2].slogin + "<br>");
        var myImageT = data.students[2].spicture;
        $("#myImageT").append("<img src='css/images/" + myImageT + "' width='60%'>");



    });
});

/* -------------------POP UP INFO ON THE INDIVIDUAL PAGE-------------------------------------*/

$(document).on('pagecreate', '#individual', function () {
    $.getJSON("students.json", function (data) {

        // Sandra Info
        $("#studentInfo2").append("Student Name: " + data.students[0].fullname + "<br>" +
            "Student Num # " + data.students[0].snumber + "<br>" +
            "Login: " + data.students[0].slogin + "<br>");
        var myImage = data.students[0].spicture;
        $("#myImage2").append("<img src='css/images/" + myImage + "' width='60%'>");

        // Sophie Info
        $("#studentInfoS2").append("Student Name: " + data.students[1].fullname + "<br>" +
            "Student Num # " + data.students[1].snumber + "<br>" +
            "Login: " + data.students[1].slogin + "<br>");
        var myImageS = data.students[1].spicture;
        $("#myImageS2").append("<img src='css/images/" + myImageS + "' width='60%'>");

        // Tom Info
        $("#studentInfoT2").append("Student Name: " + data.students[2].fullname + "<br>" +
            "Student Num # " + data.students[2].snumber + "<br>" +
            "Login: " + data.students[2].slogin + "<br>");
        var myImageT = data.students[2].spicture;
        $("#myImageT2").append("<img src='css/images/" + myImageT + "' width='60%'>");



    });
});

/* -------------------POP UP INFO ON THE NUTRITIONAL INFO PAGE-------------------------------------*/
$(document).on('pagecreate', '#nutritionInfo', function () {
    $.getJSON("students.json", function (data) {

        // Sandra Info
        $("#studentInfo3").append("Student Name: " + data.students[0].fullname + "<br>" +
            "Student Num # " + data.students[0].snumber + "<br>" +
            "Login: " + data.students[0].slogin + "<br>");
        var myImage = data.students[0].spicture;
        $("#myImage3").append("<img src='css/images/" + myImage + "' width='60%'>");

        // Sophie Info
        $("#studentInfoS3").append("Student Name: " + data.students[1].fullname + "<br>" +
            "Student Num # " + data.students[1].snumber + "<br>" +
            "Login: " + data.students[1].slogin + "<br>");
        var myImageS = data.students[1].spicture;
        $("#myImageS3").append("<img src='css/images/" + myImageS + "' width='60%'>");

        // Tom Info
        $("#studentInfoT3").append("Student Name: " + data.students[2].fullname + "<br>" +
            "Student Num # " + data.students[2].snumber + "<br>" +
            "Login: " + data.students[2].slogin + "<br>");
        var myImageT = data.students[2].spicture;
        $("#myImageT3").append("<img src='css/images/" + myImageT + "' width='60%'>");



    });
});
















