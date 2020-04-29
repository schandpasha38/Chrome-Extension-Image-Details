var htmlbody = document.querySelector("body");
var html = document.querySelector("html");
var htmlDoc;
var theImage = new Image();

((function () {
    if (document.querySelector("#imginfocontainer") === null) {
        detailsElement();
    } else {
        htmlDoc.removeEventListener("mouseover", infofunc);
        html.classList.remove("imageinfoplugin");
        document.querySelector("#imginfocontainer").remove();
    }
})());

function detailsElement() {
    html.classList.add("imageinfoplugin");
    var imgdetailsHTML = `<div id="imginfocontainer"> <div class="containerHeading"> <h3><b>Image Info</b><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFCSURBVEhL7ZWxa8JQEMaz1D+mqyS7yVbo1ko3oYtCl0qd2oLVUCf/LjtbXZvSpSUoXYwmDnq+i++FJPcMXAQnP/h45JL7frxcyDPOKi24vawsbMsNHHMs1i+uZZ+LOTKSCh8IHAuO9cIxezKSKrCtia6Jbdv8lJFUYic/2iamMUdGUukg6+EAVvd3mZrysn4F4WOT1FmQqPcMMPuHrfdNQAjYTKcAfz6E7SyIBVle12AzGhFQAhB1XPE63ceCoPOgsN0qBKDZEPQe9BEHgz8rBKBLQdCrxg3Ar5+AcEe659DldpKagQJtPe/gV8eG5IeMO1Kv7hCIBckD1AzSM9KBWJDovUsAygnIn0P08pS5x4KgI/eVAJQRFHYeSJ0NKeNCyKn+wn1tE9PiPHmTkVTxySgOnKNORgGAavVCRp7FlWHsACShnjgSV5uqAAAAAElFTkSuQmCC" alt="" srcset="" class="closecontainer"></h3> </div> <table class="infotable" border="1"> <tbody> <tr> <td width="30%"> <a id="extimglinkatag" href="#" target="_blank">Image Link <img id="gotoicon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACWSURBVDhP7ZM9DkAwAEa7ihs6AI7gCDYXsBqcwWi3mgwOInxf2ibSUP2x8ZKXNtG+NJqKnxEunnLPLStsYe4o13LPLfyYyakTXOsd7OBg2EASFKxgrZzhDvV/CwpqCrjBCUYHdYwjTxwVPMdIVNCMkRL2cuoXvIqZOAcTyFdgixGvE6ZqtOEUfPXp8fbMx/+kvvFvIsQB/ixVjiwZE3IAAAAASUVORK5CYII="></a> </td> <td width="70%"> <div class="extimglink"></div> </td> </tr> <tr> <td width="30%">Actual Dimension</td> <td id="tdadimension" width="70%"></td> </tr> <tr> <td width="30%">Dimension Used</td> <td id="tddimensionusd" width="70%"></td> </tr> <tr> <td width="30%">Alt text</td> <td id="tdalttxt" width="70%"></td> </tr> <tr> <td width="30%">File Size</td> <td id="imgfilesize" width="70%"></td> </tr> </tbody> </table> </div>`;
    htmlbody.insertAdjacentHTML("beforeend", imgdetailsHTML);
    document.querySelector(".closecontainer").addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector("#imginfocontainer").remove();
        htmlDoc.removeEventListener("mouseover", infofunc);
        html.classList.remove("imageinfoplugin");
    });
    dragElement(document.getElementById("imginfocontainer"));
    detailsElementUpdate();
};

function detailsElementUpdate() {
    htmlDoc = document.querySelector(".imageinfoplugin");
    htmlDoc.addEventListener("mouseover", infofunc);
};



//This function is for detailsElementUpdate
var imgcsssrc = function (data) {
    var fimgcsssrc = "";
    style = data.currentStyle || window.getComputedStyle(data, false),
        fimgcsssrc = style.backgroundImage.slice(4, -1).replace(/"/g, "");
    return fimgcsssrc;
}

function infofunc(e) {
    var txt = "";
    txt = e.target;
    if ((!(txt.classList.contains('closecontainer')) && !(txt.id === 'gotoicon') && txt.nodeName == 'IMG') || imgcsssrc(txt)) {
        imageinformationoush(txt);
    }
    e.stopPropagation();
};


//This is for infofunc for ajax request to get image details
function imageinformationoush(data) {
    if (htmlDoc === document.querySelector(".imageinfoplugin")) {
        var imgpath = data.src ? data.src : imgcsssrc(data);
        document.querySelector("#extimglinkatag").href = imgpath;
        document.querySelector(".extimglink").textContent = imgpath;
        theImage.src = imgpath;
        var imgnaturalWxH = theImage.naturalWidth + " x " + theImage.naturalHeight + " Pixels";
        document.querySelector("#tdadimension").textContent = imgnaturalWxH;
        var imgDimusdedWxH = data.clientWidth + " x " + data.clientHeight + " Pixels";
        document.querySelector("#tddimensionusd").textContent = imgDimusdedWxH;
        var alt = data.alt ? data.alt : "No alt Available";
        document.querySelector("#tdalttxt").textContent = alt;
        var fsize = "";
        if (imgpath.match(/.(svg|jpg|jpeg|png|gif)$/i) || !imgpath.match(/^data:/i)) {
            var obj = new XMLHttpRequest();
            obj.open('HEAD', imgpath, true);
            obj.onreadystatechange = function () {
                if (obj.readyState == 4) {
                    if (obj.status == 200) {
                        var temp = obj.getResponseHeader('content-length');
                        fsize = formatBytes(temp);
                        document.querySelector("#imgfilesize").textContent = fsize;
                    }
                } else {
                    fsize = "Unable to Fetch Details";
                };
            };
            obj.send();
        };
    };
};


function formatBytes(filesize) {
    if (filesize < 1024)
        return filesize + " Bytes";
    else if (filesize < 1048576)
        return (filesize / 1024).toFixed(2) + " KB";
    else if (filesize < 1073741824)
        return (filesize / 1048576).toFixed(2) + " MB";
    else return (filesize / 1073741824).toFixed(2) + " GB"
};


function dragElement(div) {
    var mousePosition;
    var offset = [0, 0];
    var div;
    var isDown = false;

    div.addEventListener('mousedown', function (e) {
        isDown = true;
        offset = [
            div.offsetLeft - e.clientX,
            div.offsetTop - e.clientY
        ];
    }, true);

    document.addEventListener('mouseup', function () {
        isDown = false;
    }, true);

    document.addEventListener('mousemove', function (event) {
        event.preventDefault();
        if (isDown) {
            mousePosition = {
                x: event.clientX,
                y: event.clientY
            };
            div.style.left = (mousePosition.x + offset[0]) + 'px';
            div.style.top = (mousePosition.y + offset[1]) + 'px';
        }
    }, true);
};