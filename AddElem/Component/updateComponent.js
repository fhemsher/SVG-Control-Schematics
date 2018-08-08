var ComponentDoc
function getComponentLibrary()
{

if(!ComponentDoc)
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "Library/Component.svg", true);
    xhr.onload = function()
    {
        var xmlString = this.responseText

        //---DOMParser---
        var parser = new DOMParser();
        ComponentDoc = parser.parseFromString(xmlString, "text/xml").documentElement;
        //---clear previous table----
        var rows = componentTable.rows
        for(var k = rows.length-1; k>=0; k--)
            componentTable.deleteRow(rows[k])

           var rowCnt=1

            var row = componentTable.insertRow(0)
            row.align = "center"
            var titleCell = row.insertCell(0).innerHTML = "Title"
            var categoryCell = row.insertCell(1).innerHTML = "Category"
            var descriptionCell = row.insertCell(2).innerHTML = "Description"
           // var nameCell = row.insertCell(3).innerHTML = "Created By"
           // var dateCell = row.insertCell(4).innerHTML = "Date Created/Edited"

            var previewCell = row.insertCell(3)

            //----write table---
            var groups = ComponentDoc.childNodes

        for(var k = 0; k<groups.length; k++)
        {
            var group = groups.item(k)
           if(group.nodeName!="#text")
           {
            var id = group.getAttribute("id")
            var category = group.getAttribute("category")
            var title = group.getAttribute("title")
            var description = group.getAttribute("description")
            var name = group.getAttribute("name")
            var utcMS = +group.getAttribute("utcMS")
            var date = new Date(utcMS).toLocaleString()

            var svgContainer=document.createElementNS(NS,"svg")
        svgContainer.setAttribute("width","100%")
        svgContainer.setAttribute("height","100%")

            svgContainer.setAttribute("overflow","visible")
              var clone=group.cloneNode(true)
              clone.setAttribute("myscale","1.0")
              svgContainer.appendChild(clone)
              var idSVG="SVG_Component"+k
              svgContainer.setAttribute("id",idSVG)
           //var bb=clone.getBBox()
          // clone.setAttribute("viewBox","0 0 "+bb.width+" "+bb.height)
            // var svgString=new XMLSerializer().serializeToString(svg)
            var row = componentTable.insertRow(rowCnt++)

            var cntr = (rowCnt)/2+""
            if(cntr.indexOf('.')!=-1)
                var bg = "#aadc82"
                else
                    var bg = "#f0e99c"
                    row.style.background = bg

                    var titleCell = row.insertCell(0).innerHTML = title
                    var categoryCell = row.insertCell(1).innerHTML = category
                    var descriptionCell = row.insertCell(2).innerHTML = description
                    //var nameCell = row.insertCell(3).innerHTML = name
                    //var dateCell = row.insertCell(4).innerHTML = date
                    var previewCell = row.insertCell(3)
                     previewCell.style.padding="5px"

                     //previewCell.style.width=group.getAttribute("nativeWidth")+"px"
                     //previewCell.style.height=group.getAttribute("nativeHeight")+"px"
                     var svgString=new XMLSerializer().serializeToString(svgContainer)
                    previewCell.innerHTML ="<div style='width:40px;height:40px;'>"+svgString+"</div>"
                    previewCell.title="Click to place in drawing"
                    previewCell.setAttribute("onClick","this.style.border='4px inset violet';placeComponentInDrawing("+id+")")
                        var svg=document.getElementById(idSVG)
                    	var bb=svg.getBBox()
                    	var bbw=bb.width
                    	var bbh=bb.height
                          var divWH=40
                        //--use greater of bbw vs bbh--
                    	if(bbw>=bbh)
                    		var factor=bbw/divWH
                    	else
                    		var factor=bbh/divWH

                    	var vbWH=divWH*factor

                    	var vbX=(bbw-vbWH)/2
                    	var vbY=(bbh-vbWH)/2
                        //---IE/CH---
                    	if(!mySVG.viewBox.baseVal )
                    	{
                       	 	var ViewBox=svg.viewBox.baseVal
                    		ViewBox.x=vbX
                    		ViewBox.y=vbY
                    		ViewBox.width=vbWH
                    		ViewBox.height=vbWH
                    	}
                    	else
                    		svg.setAttribute("viewBox",vbX+" "+vbY+" "+vbWH+" "+vbWH)
              }

          }
         componentTableCloseButton.style.visibility = "visible"
        LoadedComponentArray=[]
        componentTableDiv.style.top = "60px"
        componentTableDiv.style.visibility = "visible"
        setComponentEditDrag()
         getComponentLibraryButton.style.borderStyle = "inset"
          hmiIntroDiv.style.visibility="hidden"
       CookieEmail=getCookie("email")
       CookieName=getCookie("name")


      if(CookieEmail)
      {  listMyComponentIDs()

      }



          disableAllButtons()
    }
    xhr.send()
    }
    else
    {
         componentTableCloseButton.style.visibility = "visible"
        LoadedComponentArray=[]
        componentTableDiv.style.top = "60px"
        componentTableDiv.style.visibility = "visible"
        setComponentEditDrag()
         disableAllButtons()
    }
}

function refreshComponentLibrary()
{
   var cw=addElemComponentCw
    ComponentDoc=null
    closeDrawComponent()
    getComponentLibrary()
   cw.refreshComponentLibraryButton.disabled=true
}


function placeComponentInDrawing(id)
{



   var component=id.cloneNode("true")





   component.setAttribute("parentid",component.id)

   component.removeAttribute("title")
   component.removeAttribute("description")

    var utcms=new Date().getTime()
    var id="component"+utcms
   component.setAttribute("id",id)

    component.setAttribute("class", "dragTargetObj")
    var rects=component.getElementsByTagName("rect")
    var coverRect=rects[rects.length-1]
    coverRect.style.cursor = "move"

     var rects=component.getElementsByTagName("rect")
        var coverRect=rects[rects.length-1]
        coverRect.setAttribute('onmousedown',"editDrawComponent("+id+",evt)")

    LoadedComponentArray.push(component)

   domElemG.appendChild(component)

  //---reduce scale of large custom components----
    var bb=component.getBBox()
    if(bb.width>150 || bb.height>150)
    {
     addScale(component,.3)  //---transformAdd.js---

    }



}


function closeComponentTable()
{
   for(var k=0;k<LoadedComponentArray.length;k++)
   {
        var component=LoadedComponentArray[k]
        var rects=component.getElementsByTagName("rect")
        var coverRect=rects[rects.length-1]
        coverRect.setAttribute('onmousedown',"editDrawComponent("+component.id+",evt)")
        component.removeAttribute("class")
        coverRect.style.cursor="default"
    }
   mySVG.removeAttribute("onmousedown")
   mySVG.removeAttribute("onmousemove")
   mySVG.removeAttribute("onmouseup")

   LoadedComponentArray=[]
  showSourceSVG()
 componentTableDiv.style.visibility='hidden'
  componentTableCloseButton.style.visibility = "hidden"
  getComponentLibraryButton.style.borderStyle = ""
   enableAllButtons()
}


var InsertComponent
function addComponent(myId)
{
    for(var k = 0; k<ComponentDoc.childNodes.length; k++)
    {
        var component = ComponentDoc.childNodes.item(k)
        var componentId = component.getAttribute("id")
        {
            if(componentId==myId)
            {
                InsertComponent = component.cloneNode(true)
                previewTitleDiv.innerHTML = component.getAttribute("title")
                var width = +component.getAttribute("width")
                var height = +component.getAttribute("height")
               previewComponentFrameDiv.style.width = (width+10)+"px"
               // previewComponentFrameDiv.style.height = (height+60) +"px"

                previewComponentFrame.style.width = width+"px"
                previewComponentFrame.style.height = height+"px"
                previewComponentFrame.contentWindow.document.body.innerHTML += new XMLSerializer().serializeToString(component)
                previewComponentFrameDiv.style.display = "block"

                var pos = getPosition(openLibraryButton)
                previewComponentFrameDiv.style.top = (pos.y+10)+"px"
                d3.select("#previewComponentFrameDiv").transition(900).style("height",(height+60)+"px" )
               // d3.select("#previewComponentFrameDiv").transition(900).style("width",(width+10)+"px" )

                break
            }

        }

    }
}

function listMyComponentIDs()
{

       //---clear previous table----
        var rows = componentListTable.rows
        for(var k = rows.length-1; k>=0; k--)
            componentListTable.deleteRow(rows[k])

              var myEmail=CookieEmail

            //----write table---
            var groups = ComponentDoc.childNodes
            var cnt=0
        for(var k = 0; k<groups.length; k++)
        {
            var group = groups.item(k)
           if(group.nodeName!="#text")
           {
            var id = group.getAttribute("id")
            var title = group.getAttribute("title")
            var description = group.getAttribute("description")
            var email = group.getAttribute("email")

            if(email==myEmail)
            {
                var row = componentListTable.insertRow(cnt++)
                row.id="row"+id
               // var idCell = row.insertCell(0).innerHTML = id
                var titleCell = row.insertCell(0).innerHTML = title
                var descriptionCell = row.insertCell(1).innerHTML = description
                var removeCell = row.insertCell(2).innerHTML ="<button style=background:red onClick=this.disabled=true;removeMyComponent('"+id+"')>remove</button>"
            }
           }

        }
        componentListTable.style.display = "block"


}


function removeMyComponent(id)
{

    var svgString = "<remove myId='"+id+"' myEmail='"+CookieEmail+"' />"

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "_ASP/removeComponent.asp", true);
    xhr.onload = function()
    {
        if (this.status == 200)
        {

           document.getElementById("row"+id).style.background="gainsboro"

        }


    };

    xhr.send(svgString);

}


function scrollToTop(scrollDuration) {
    var scrollStep = -window.scrollY / (scrollDuration / 15),
        scrollInterval = setInterval(function(){
        if ( window.scrollY != 0 ) {
            window.scrollBy( 0, scrollStep );
        }
        else clearInterval(scrollInterval);
    },15);
}


//=============================Retrieve(Edit)/Remove==============================
function componentRetrieveButtonClicked()
{

    coverRect.style.display="none"
    sendComponentUpdateMessageSpan.innerHTML = ""

    var myId = retrieveComponentIdValue.value
    var myEmail = retrieveComponentEmailValue.value
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "LIBRARY/Component.svg", true);
    xhr.onload = function()
    {
        var xmlString = this.responseText

        //---DOMParser---
        var parser = new DOMParser();
        ComponentDoc = parser.parseFromString(xmlString, "text/xml").documentElement;
        var components = ComponentDoc.childNodes

        for(var k = 0; k<components.length; k++)
        {
            var component  = components.item(k)
           if(component.nodeName!="#text")
           {
            var id = component.getAttribute("id")
            var email = component.getAttribute("email")

            if(id==myId&&myEmail==email)
            {


                //---split component()----
                splitComponent(component)
               var category=component.getAttribute("category")
                for(j=0;j<myComponentCategoryUpdateSelect.length;j++)
                {
                   var cat=myComponentCategoryUpdateSelect.options[j].text
                   if(cat==category)
                   {
                     myComponentCategoryUpdateSelect.selectedIndex=j
                    break
                   }
                }


                myComponentTitleUpdateValue.value = component.getAttribute("title")
                myComponentDescriptionUpdateValue.value = component.getAttribute("description")
                myComponentNameUpdateValue.value = component.getAttribute("name")
                myComponentEmailUpdateValue.value = email
                retrieveComponentUpdateDiv.style.display = "block"
                  scrollToTop(600)
                break;
            }
           }
        }

    }
    xhr.send()
}

var ComponentEditArray=[]
function splitComponent(component)
{


 var matrix = component.transform.baseVal.consolidate().matrix;

        var transX = matrix.e
        var transY = matrix.f
     console.log(transX)
ComponentEditArray=[]
   //---place at center---
   var cx=+mySVG.getAttribute("width")/2
   var cy=+mySVG.getAttribute("height")/2
   clearButtonClicked()

component.removeChild(component.lastChild) //--the cover rect---
   var elems=component.childNodes
   var utcMS=new Date().getTime()
   for(var k=0;k<elems.length;k++)
   {



       var clone=elems.item(k).cloneNode(true)



        var cloneTfmRequest = mySVG.createSVGTransform()
        var myTransList = clone.transform
        var objTransList = myTransList.baseVal
        cloneTfmRequest.setTranslate(transX, transY)
        objTransList.appendItem(cloneTfmRequest)
        objTransList.consolidate()



       parent=clone.getAttribute('parent')
       if(parent=="domAddElemG")
       {
         if(clone.nodeName=="circle")
         {
            clone.id="circle"+(utcMS+k)
            clone.setAttribute("onmousedown", "editCircleDraw("+clone.id+",evt)")
            clone.setAttribute("class", "addElem")
            domAddElemG.appendChild(clone)
         }
         if(clone.nodeName=="ellipse")
         {
            clone.id="ellipse"+(utcMS+k)
            clone.setAttribute("onmousedown", "editEllipseDraw("+clone.id+",evt)")
            clone.setAttribute("class", "addElem")
            domAddElemG.appendChild(clone)
         }
         if(clone.nodeName=="text")
         {
            clone.id="text"+(utcMS+k)
            clone.setAttribute("onmousedown", "editTextDraw("+clone.id+",evt)")
            clone.setAttribute("class", "addElem")
            domAddElemG.appendChild(clone)
         }
         if(clone.nodeName=="rect")
         {
            clone.id="rect"+(utcMS+k)
            clone.setAttribute("onmousedown", "editRectDraw("+clone.id+",evt)")
            clone.setAttribute("class", "addElem")
            domAddElemG.appendChild(clone)
         }
         if(clone.nodeName=="polygon")
         {
            clone.id="polygon"+(utcMS+k)
            clone.setAttribute("onmousedown", "editPolygonDraw("+clone.id+",evt)")
            clone.setAttribute("class", "addElem")
            domAddElemG.appendChild(clone)
         }
       }
       if(parent=="domAddPathG")
       {
            clone.id="path"+(utcMS+k)
            clone.setAttribute("onmousedown", "editPathDraw("+clone.id+",evt)")
            clone.setAttribute("class", "addPath")
            domAddPathG.appendChild(clone)
       }
       if(parent=="domAddIconG")
       {
            clone.id="icon"+(utcMS+k)
            clone.setAttribute("onmousedown", "editIconStart(evt)")

            domAddIconG.appendChild(clone)
       }
       if(parent=="domAddSymbolG")
       {
            clone.id="symbol"+(utcMS+k)
            clone.setAttribute("onmousedown", "editSymbolDraw("+clone.id+",evt)")

            domAddSymbolG.appendChild(clone)
       }
           if(parent=="domAddHmiG")
            {
                for(var p = 0; p<elem.childNodes.length; p++)
                {
                    var el = elem.childNodes.item(p)
                    if(el.nodeName!="#text")
                    {
                        var myNodeName = el.nodeName

                        el.setAttribute("class", "dragTargetObj")

                        if(myNodeName=="ellipse")
                        {
                            var myId="control"+p
                             el.setAttribute("id", myId)
                            el.setAttribute("onmousedown", "editControlDraw("+myId+",evt)");

                        }
                        if(myNodeName=="g" && el.getAttribute("myStatus"))
                        {
                            var myId="pilotLight"+p
                             el.setAttribute("id", myId)
                            el.setAttribute("onmousedown", "editPilotLightDraw("+myId+",evt)");

                        }
                        if(myNodeName=="g" && el.firstChild.nodeName=="ellipse")
                        {
                             var myId="PID"+p
                             el.setAttribute("id", myId)
                            el.setAttribute("onmousedown", "editPIDDraw("+myId+",evt)");

                        }
                        if(myNodeName=="g" && el.getAttribute("max"))
                        {
                              var myId="gauge"+p
                             el.setAttribute("id", myId)
                            el.setAttribute("onmousedown", "editGaugeDraw("+myId+",evt)");
                        }
                        domAddHmiG.appendChild(el.cloneNode(true))
                    }
                }

            }
       if(parent=="domElemG")
       {
            clone.id="component"+(utcMS+k)
            clone.setAttribute("onmousedown", "editComponentDraw("+clone.id+",evt)")
            domElemG.appendChild(clone)
       }
       ComponentEditArray.push(clone)

    }


    showSourceSVG()
}
