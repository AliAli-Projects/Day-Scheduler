

//initial time always on
var timeEl = $("#currentDay");
timeEl.text(moment().format("MMM Do YYYY -- HH: mm: ss "))

// update time
setInterval(function() {
    timeEl.text(moment().format("MMM Do YYYY -- HH: mm: ss "));
}, 1000);

// Generate all the timeblock 

var timeBlock = $(".timearea");

function createRow(workHours) {


    // create a div with class "row"
    var row = $("<div>").attr("class", "row");
    var timeCol = $("<div>").attr("class", "col-1 time");
    var timeSpan = $("<span>").text(workHours + ":00");
    // display the content
    timeCol.append(timeSpan);
    row.append(timeCol);

    
    // select current time
    var timeNow = moment();

    // check time correspondly 
    // colume hour < current hour = past
    var isPast = workHours < Number(timeNow.format("H"));
    // colume hour between current hour and current hour +1 = current
    var isNow = workHours >= Number(timeNow.format("H")) && workHours < Number(timeNow.format("H") + 1);
    // colume hour > current hour =future
    var isFuture = workHours > Number(timeNow.format("H"));

    //  responsive element
    var cssClass;
    // css responsively 
    if (isPast) { cssClass = 'past' };
    if (isNow) { cssClass = 'present' };
    if (isFuture) { cssClass = 'future' };

    // create a div with class "col-10",add responsive class
    var textCol = $("<div>").attr("class", "col-10 " + cssClass);
    // create textarea 
    var textArea = $("<textarea>").attr("class", "col-12 " + cssClass);

    // Check if there's any exisiting content in Local storage
    var exisitingContent = localStorage.getItem(workHours + ":00");
    // display corresponding content into textarea
    if (exisitingContent) {
        textArea.val(exisitingContent);
    }

    textCol.append(textArea);
    row.append(textCol);

    // create a div with class col1
    var btnCol = $("<div>").attr("class", "col-1 ");
    // create a button with bootstrap class
    var buttonMain = $("<button>").attr("class", "btn btn-primary");
    // create a icon with fontawesome icon class "fas fa-archive"
    var iconSave = $("<i>").attr({ class: "fas fa-archive", id: "save-icon" });

    // append corresponding
    buttonMain.append(iconSave);
    btnCol.append(buttonMain);
    row.append(btnCol);

    return row;

}
// generate all work hour time block from the array
var workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

for (i = 0; i < workHours.length; i++) {
    var displayHours = workHours[i]
    var rowDisplay = createRow(displayHours);
    timeBlock.append(rowDisplay);
}

// when the user click on the save button-
$(document).on("click", ".btn", function(event) {
    // function that saves the content in the corresponding textarea to local storage-

    // 1. grab the content of textarea

    // jqwery button element 
    var jqButton = $(event.target);
    // locate target textarea
    var textEl = jqButton.parent().prev().children();
    // get the value from textarea
    var userInput = textEl.val()
    console.log(userInput);

    // 2. use the time as key of local Storage

    // locate corresponding span elements and its text content
    var timeSpan = jqButton.parent().prev().prev().children();
    var timeSpanText = timeSpan.text();

    // 3. Save to local storage , give key and value accordingly

    localStorage.setItem(timeSpanText, userInput);

});