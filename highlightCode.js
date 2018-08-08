function showSourceJS()
{
    var jsString = myScript.text

    jsString = jsString.replace(/\</g, "&lt;")
    jsString = jsString.replace(/\>/g, "&gt;")
    jsCodeDiv.innerHTML = '<pre><code id="codeJS" class="javascript">'+jsString+'</code></pre>'

    var aCode = document.getElementById('codeJS');
    hljs.highlightBlock(aCode);

}
function showSourceSVG()
{
    var svgString = svgDiv.innerHTML
    svgString = svgString.replace(/\</g, "&lt;")
    svgString = svgString.replace(/\>/g, "&gt;\n")
    svgSourceDiv.innerHTML = '<pre><code id="codeSVG" class="xml">'+svgString+'</code></pre>'

    var aCode = document.getElementById('codeSVG');

    hljs.highlightBlock(aCode);

    svgSourceDiv.style.height = +svgSourceDiv.scrollHeight+"px"

}
function showSaveSVG()
{
    svgSaveDiv.style.height="1px"
    var saveSVG = mySVG.cloneNode(true)
    saveSVG.setAttribute("id", "schematicSVG")
    saveSVG.removeAttribute("onmousedown")
    saveSVG.removeAttribute("onmouseup")
    saveSVG.removeAttribute("onmousemove")
    saveSVG.removeAttribute("onclick")
   for(var k = saveSVG.childNodes.length-1; k>=0; k--)
    {
            var elem = saveSVG.childNodes.item(k)
         if(elem.nodeName!="#text")
        {
            var id = elem.getAttribute("id")
            elem.removeAttribute("pointer-events")
            if(id=="endArrowDefs")saveSVG.removeChild(elem)
            if(id=="domDrawX")saveSVG.removeChild(elem)


        }
    }
    var zooomG=saveSVG.getElementsByTagName("g")[0]
     for(var mm = zooomG.childNodes.length-1; mm>=0; mm--)
    {
        var elem = zooomG.childNodes.item(mm)
        if(elem.nodeName!="#text")
        {
                 var id = elem.getAttribute("id")
                  if(id=="gridLayer")zooomG.removeChild(elem)
                   if(id=="domActiveElemG")zooomG.removeChild(elem)
                if(id=="domWrapper")zooomG.removeChild(elem)
                if(id=="coverRect")zooomG.removeChild(elem)
                if(id=="dragDot")zooomG.removeChild(elem)

                if(id=="pvStripChart")zooomG.removeChild(elem)
                if(id=="processRect")zooomG.removeChild(elem)
                if(id=="componentRect")zooomG.removeChild(elem)
                if(id=="topG")
                {
                    //---remove non needed attributes---
                    var pathG = elem.childNodes.item(0)
                    pathG.removeAttribute("pointer-events")
                    for(var p = 0; p<pathG.childNodes.length; p++)
                    {
                        pathG.childNodes.item(p).removeAttribute("onmousedown");
                        pathG.childNodes.item(p).removeAttribute("style");
                        pathG.childNodes.item(p).removeAttribute("class");
                        pathG.childNodes.item(p).removeAttribute("id")
                        pathG.childNodes.item(p).removeAttribute("vector-effect")
                    }


                    var elemG = elem.childNodes.item(1)
                    elemG.removeAttribute("pointer-events")
                    for(var e = 0; e<elemG.childNodes.length; e++)
                    {
                        elemG.childNodes.item(e).removeAttribute("onmousedown");
                        elemG.childNodes.item(e).removeAttribute("style");
                        elemG.childNodes.item(e).removeAttribute("class");
                        elemG.childNodes.item(e).removeAttribute("id")
                        elemG.childNodes.item(e).removeAttribute("cursor")
                    }


                }
            if(id=="domAddSymbolG")
            {
                //---remove non needed attributes---
                for(var e = 0; e<elem.childNodes.length; e++)
                {
                    elem.childNodes.item(e).removeAttribute("onmousedown");
                    elem.childNodes.item(e).removeAttribute("id");
                    elem.childNodes.item(e).removeAttribute("class");
                    elem.childNodes.item(e).removeAttribute("onclick")
                    elem.childNodes.item(e).removeAttribute("cursor")
                }
            }
            if(id=="domAddIconG")
            {
                //---remove non needed attributes---
                for(var e = 0; e<elem.childNodes.length; e++)
                {
                    elem.childNodes.item(e).removeAttribute("onmousedown");
                    elem.childNodes.item(e).removeAttribute("id");
                    elem.childNodes.item(e).removeAttribute("class");
                    elem.childNodes.item(e).removeAttribute("onclick")
                    elem.childNodes.item(e).removeAttribute("cursor")
                }
            }
            if(id=="domAddHmiG")
            {



                //---remove non needed attributes---
                for(var e = 0; e<elem.childNodes.length; e++)
                {
                     if(elem.childNodes.item(e).nodeName!="#text")
                     {
                        elem.childNodes.item(e).removeAttribute("onmousedown");
                        elem.childNodes.item(e).removeAttribute("pointer-events");
                        //var rects=elem.childNodes.item(e).getElementsByTagName("rect")
                        //if(rects.length!=0)
                        //rects[rects.length-1].removeAttribute("onmousedown");
                   // elem.childNodes.item(e).removeAttribute("id"); //---keep id---
                    elem.childNodes.item(e).removeAttribute("style");
                    elem.childNodes.item(e).removeAttribute("class");
                    elem.childNodes.item(e).removeAttribute("onclick")
                    elem.childNodes.item(e).removeAttribute("cursor")
                    }
                }
            }
            if(id=="domAddComponentG")
            {
                //---remove non needed attributes---
                for(var e = 0; e<elem.childNodes.length; e++)
                {
                     if(elem.childNodes.item(e).nodeName!="#text")
                     {

                        var rects=elem.childNodes.item(e).getElementsByTagName("rect")
                         if(rects.length!=0)
                        rects[rects.length-1].removeAttribute("onmousedown");
                        var category=elem.childNodes.item(e).getAttribute("category")
                        if(category)
                        {
                        category=category.replace(/\&/,"&amp;")
                        elem.childNodes.item(e).setAttribute("category",category)
                        }
                       // elem.childNodes.item(e).removeAttribute("id"); //---keep id---
                        elem.childNodes.item(e).removeAttribute("style");
                        elem.childNodes.item(e).removeAttribute("class");
                        elem.childNodes.item(e).removeAttribute("onclick")
                        elem.childNodes.item(e).removeAttribute("cursor")
                      }

                }
            }
             if(id=="domAddIsaG")
            {
                //---remove non needed attributes---
                for(var e = 0; e<elem.childNodes.length; e++)
                {
                     if(elem.childNodes.item(e).nodeName!="#text")
                     {

                        var rects=elem.childNodes.item(e).getElementsByTagName("rect")
                         if(rects.length!=0)
                        rects[rects.length-1].removeAttribute("onmousedown");
                        var category=elem.childNodes.item(e).getAttribute("category")
                        if(category)
                        {
                        category=category.replace(/\&/,"&amp;")
                        elem.childNodes.item(e).setAttribute("category",category)
                        }
                       // elem.childNodes.item(e).removeAttribute("id"); //---keep id---
                        elem.childNodes.item(e).removeAttribute("style");
                        elem.childNodes.item(e).removeAttribute("class");
                        elem.childNodes.item(e).removeAttribute("onclick")
                        elem.childNodes.item(e).removeAttribute("cursor")
                      }

                }
            }


            if(id=="domAddProcessG")
            {
                //---remove non needed attributes---
                for(var e = 0; e<elem.childNodes.length; e++)
                {
                     if(elem.childNodes.item(e).nodeName!="#text")
                     {
                        var rects=elem.childNodes.item(e).getElementsByTagName("rect")
                         if(rects.length!=0)
                        rects[rects.length-1].removeAttribute("onmousedown");
                       // elem.childNodes.item(e).removeAttribute("id"); //---keep id---
                        elem.childNodes.item(e).removeAttribute("style");
                        elem.childNodes.item(e).removeAttribute("class");
                        elem.childNodes.item(e).removeAttribute("onclick")
                        elem.childNodes.item(e).removeAttribute("cursor")
                    }
                }
            }

        }
    }

    var svgString = new XMLSerializer().serializeToString(saveSVG)


  svgString = svgString.replace(/\</g, "&lt;")
  svgString = svgString.replace(/\>/g, "&gt;\n")



    svgSaveDiv.innerHTML = '<pre><code id="saveSVG" class="xml">'+svgString+'</code></pre>'

    var sCode = document.getElementById('saveSVG');

    hljs.highlightBlock(sCode);

    svgSaveDiv.style.height = +svgSaveDiv.scrollHeight+"px"


}
