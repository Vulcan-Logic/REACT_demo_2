/* 
    Project: REACT Demo for Education Horizons Group
    Sprint: 1
    Task: 1
    Author: Vineet W. Singh 
    Start Date: 20/4/21
    Date of last edit: 23/4/2021
    Date of last review:
*/

//generate combinations of colors based on rgb and converted to hsv 
const getInitialColors = () => {
    let hsvValues = [];
    let red, green, blue;
    //red values step of 8
    for (red = 8; red <= 256; red += 8) {
        //green values step of 8
        for (green = 8; green <= 256; green += 8) {
            //blue values step of 8
            for (blue = 8; blue <= 256; blue += 8) {
                let hsvVal = rgb2hsv(red - 1, green - 1, blue - 1);
                //add to hsv array
                hsvValues.push([hsvVal.h, hsvVal.s, hsvVal.v]);
            }
        }
    }
    return(hsvValues);
};

//function to sort colors on basis of hsv values
const getSortedColors = () => {
    let arr=[],
        colorValues = [],
        colorDetails = [],
        ctr, returnArr = [],
        finalArr = [];
    //get a ranking value based on s and v values:
    arr=getInitialColors().map(color=>[color[0],color[1],color[2],makeHSVRanking(color[0],color[1],color[2])]);
    //sort the array according to rank - might need to be modified into a custom function
    arr=arr.sort((a, b) => a[3] - b[3]);
    //get individual colors 
    arr.forEach(item => {
        if (!colorValues.includes(item[0])) colorValues.push(item[0]);
    });
    //get arrays of colors of each color (hue value)
    colorValues.forEach(item1 => {
        colorDetails.push(arr.filter(item2 => item2[0] === item1));
    });
    //reverse array order for alternating colors
    const lenColorDetails = colorDetails.length;
    for (ctr = 0; ctr < lenColorDetails; ctr++) {
        if (ctr % 2 === 1) colorDetails[ctr] = colorDetails[ctr].reverse();
    }
    //re-assemble into one large array
    colorDetails.forEach(item4 => {
        item4.forEach(item5 => {
            returnArr.push(item5);
        })
    });
    //strip out ranking variable for reconversion back into color values h,s,v
    returnArr.forEach(item6 => item6 = finalArr.push([item6[0], item6[1], item6[2]]));
    //convert into equivalent hex value
    return (finalArr.map(item => HSVtoHEX(item[0]/360, item[1]/100, item[2]/100)));
};

const getUnsortedColors=()=>{
    //get unsorted HSV colors and convert them into hex values and return this array
    return(getInitialColors().map(item => HSVtoHEX(item[0]/360, item[1]/100, item[2]/100)));
};

const makeHSVRanking = (h, s, v) => {
    let t;
    if (s > v) t = s * v / 20000;
    else if (v > s) t = (20000 - (v * s)) / 20000;
    else if (v === s) {
        if ((v * s) > 2500) t = (20000 - (v * s)) / 20000;
        else t = (v * s) / 20000;
    }
    return (h + t);
};

//get the color array depending on type
const getColorArray = (sorted) => {
    //set which color generating method to use
    if (!sorted) 
        //return unsorted colors modified into hex values
        return(getUnsortedColors());
    else
    //return sorted colors modified into hex values
        return (getSortedColors());
};

//get a matrix of colors organised in rows and columns
export const getImageMatrix = (sorted) => {
    let ctr;
    const colArray = getColorArray(sorted);
    const rows = [];
    while (colArray.length>0){
        rows.push(colArray.slice(0,128));
        colArray.splice(0,128);
    }
    const rowsLen = rows.length;
    for (ctr = 0; ctr < rowsLen; ctr++) {
        if (ctr % 2 === 1) rows[ctr] = rows[ctr].reverse();
    }
    return (rows);
};

/* convert HSV value to hex code - accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR 
 * h, s, v (0<= h,s,v <=1)
*/
function HSVtoHEX(h, s, v) {
    let r, g, b, i, f, p, q, t, rHex, gHex, bHex;
    if (arguments.length === 1) {
        s = h.s; 
        v = h.v; 
        h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
        default: break;
    }
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    if (r>15) rHex= r.toString(16);
    else if (r<10) rHex=`0${r}`;
        else rHex=`${r}`;
    if (g>15) gHex= g.toString(16);
    else if (g<10) gHex=`0${g}`;
        else gHex=`${g}`;
    if (b>15) bHex=b.toString(16);
    else if (b<10) bHex=`0${b}`;
        else bHex=`${b}`;
    return(`#${rHex}${gHex}${bHex}`);
}

//convert rgb to hsv values.
function rgb2hsv (r, g, b) {
    let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    v = Math.max(rabs, gabs, babs);
    diff = v - Math.min(rabs, gabs, babs);
    diffc = c => (v - c) / 6 / diff + 1 / 2;
    percentRoundFn = num => Math.round(num * 100) / 100;
    if (diff === 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(rabs);
        gg = diffc(gabs);
        bb = diffc(babs);

        if (rabs === v) {
            h = bb - gg;
        } else if (gabs === v) {
            h = (1 / 3) + rr - bb;
        } else if (babs === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: percentRoundFn(s * 100),
        v: percentRoundFn(v * 100)
    };
}//end rgb2hsv



/*old versions - no longer used
const getRectArrays=()=>{
    const cellHeight=4, cellWidth=6;
    //get image colors
    const imageMatrixRows = getImageMatrix();
    let cellY=0,rowCtr=0;
    imageMatrixRows.forEach(cells=>{
        //for a new row reset the X value to 0, cell counter that will calculate starting position of X to 0
        let cellX=0, cellCtr=0;
        //calculate where the new starting Y value is 
        cellY=cellHeight*rowCtr;
        cells.forEach(cell=>{
            cellX=cellWidth*cellCtr;
            if (cellCtr%16===0){
                console.log([rowCtr,cellCtr,cellX,cellY,cell]);
            }
            cellCtr++;
        });
        rowCtr++;
    });
};*/

/*
const getRGBColorArray=()=>{
    let rgbValues=[];
    let red, green, blue;
    //red values step of 8
    for (red=8; red<=256; red+=8){
        //green values step of 8
        for (green=8; green<=256; green+=8){
            //blue values step of 8
            for (blue=8; blue<=256; blue+=8){
                //add to hsv array
                rgbValues.push([red-1,green-1,blue-1]);
            }
        }    
    }
    const rgbHexValues=rgbValues.map(item=>RGBtoHex(item[0],item[1],item[2]));
    return(rgbHexValues);
};
*/

/*
//convert RGB to hex 
const RGBtoHex=(r,g,b)=>{
    let rHex,gHex,bHex;
    if (r>15) rHex= r.toString(16);
    else if (r<10) rHex=`0${r}`;
        else rHex=`${r}`;
    if (g>15) gHex= g.toString(16);
    else if (g<10) gHex=`0${g}`;
        else gHex=`${g}`;
    if (b>15) bHex=b.toString(16);
    else if (b<10) bHex=`0${b}`;
        else bHex=`${b}`;
    return(`#${rHex}${gHex}${bHex}`);
};

//get a matrix of colors organised in rows and columns
export const getImageMatrix=(sorted)=>{
    const colArray = getColorArray(sorted);
    let rowItemCount=0,rowCount=0;
    const rows=[];
    let cells=[];
    rows.push(cells);
    colArray.forEach(item=>{
        //check if row item count is below 128, the number of horizontal cells in a row
        if (rowItemCount===128){
            //start a new row
            cells=[];
            rows.push(cells);
            rowCount++;
            rowItemCount=0;
        }
        //no new row needed add color to cells
        rows[rowCount].push(item);
        rowItemCount++;
    });
    return(rows);
};

//get the color array depending on type
const getColorArray=(sorted)=>{
    //set which color generating method to use
    return(getSortedHSVColorArray(sorted));
};

//generate combinations of rgb & hsv values in steps of 8
const getSortedHSVColorArray=(sorted)=>{
    let hsvValues=[];
    let red, green, blue;
    //red values step of 8
    for (red=8; red<=256; red+=8){
        //green values step of 8
        for (green=8; green<=256; green+=8){
            //blue values step of 8
            for (blue=8; blue<=256; blue+=8){
                let hsvVal=rgb2hsv(red-1,green-1,blue-1);
                //add to hsv array
                hsvValues.push([hsvVal.h,hsvVal.s,hsvVal.v]);
            }
        }    
    }
    if (sorted) hsvValues=hsvValues.sort(mySort);
    const colorHexValues=hsvValues.map(item=>HSVtoHEX(item[0]/360,item[1]/100,item[2]/100));
    return(colorHexValues);
};
//custom sort function to sort array on three fields
const mySort=(a,b)=>{
    let h1=parseFloat(a[0]);
    let h2=parseFloat(b[0]);
    
    let s1=parseFloat(a[1]);
    let s2=parseFloat(b[1]);

    let v1=parseFloat(a[2]);
    let v2=parseFloat(b[2]);

    if (h1<h2) return(-1);
    else if (h1>h2) return(1);
    else if (v1<v2) return(-1);
    else if (v1>v2) return(1);
    else if (s1>s2) return(-1);
    else if (s1<s2) return(1);
    return(0);
}
*/



//getColorArray().forEach(color=>console.log(color));








