function clearZero(Txt) {
    let i = 0
    for(i=0; i<Txt.length; i++){  // ตัดเลข 0 ที่อยู่ข้างหน้าทิ้ง
        if(Txt[i] !== "0"){
            break;
        }
    }
    return Txt.slice(i);
}

function reverseNumber(txt) {
    let reverseTxt = "";
    for(i=0; i<txt.length; i++){
        reverseTxt = txt[i] + reverseTxt;
    }    
    return reverseTxt
}

function number2sound(nTextFromDoc) {
    // เสียงของตัวเลข เช่น หนึ่ง สอง สาม ... ซึ่งเมื่ออยู่กับค่าหลักบางหลักจะออกเสียงต่างกันเช่น เอ็ด ยี่
    //     [ 0,  เสียงของตัวเลขเมื่ออยู่หลักหน่วย
    //       1,  เสียงของตัวเลขเมื่ออยู่หลักสิบ
    //       2,  เสียงของตัวเลขเมื่ออยู่หลักร้อย
    //       3,  เสียงของตัวเลขเมื่ออยู่หลักพัน
    //       4,  เสียงของตัวเลขเมื่ออยู่หลักหมื่น
    //       5 ] เสียงของตัวเลขเมื่ออยู่หลักแสน 
    let numberSound = [
        [ "", "เอ็ด", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า", "เสียงตัวเลขหลักหน่วย"],
        [ "",   "",   "ยี่",  "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า", "เสียงตัวเลขหลักสิบ" ],
        [ "", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า", "เสียงตัวเลขหลักร้อย" ],
        [ "", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า", "เสียงตัวเลขหลักพัน" ],
        [ "", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า", "เสียงตัวเลขหลักหมื่น" ],
        [ "", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า", "เสียงตัวเลขหลักแสน" ]
    ];
    let numberSoundCol1 = [ "ศูนย์", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า" ];
    // เสียงของค่าหลัก เช่น หลักหน่วย หลักสิบ ... หา index โดย mod ด้วย 6
    //               [ 0,   1,    2,     3,     4,    5  ]
    let valueSound = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน"];
    
    let i = 0;
    let nText = "";
    let nText2 = ""; // for reverse number
    let nTextLenght = 0;
    let n = 0;
    let nCol = 0;  // ค่าของหลัก เช่น หน่วย สิบ ร้อย ...
    let vSound = "", nSound = ""; 
    let nSoundFromDoc = "";

    // เริ่มโปรแกรม
    if (nTextFromDoc === "") {
        return "";  // ไม่มีตัวเลขให้ออกเสียง
    }

    if(nTextFromDoc.length === 1){   // เป็นตัวเลขหลักเดียว
        return nSoundFromDoc = numberSoundCol1[nTextFromDoc];
    }

    nText = clearZero(nTextFromDoc);
    if(nText.length === 0){  // ถ้าไม่มีข้อมูลเหลือแสดงว่าป้อนค่าเป็น 0 มามากกว่า 1 ตัว
        return "ศูนย์"
    }

    nTextLenght = nText.length;
    n = 0;
    nCol = 0;  // ค่าของหลัก เช่น หน่วย สิบ ร้อย ...
    vSound = "", nSound = ""; 
    nSoundFromDoc = "";
    
    // ทำการ reverse ตัวเลข 1234 --> 4321
    nText2 = reverseNumber(nText);

    // ออกเสียงตัวเลข
    nSoundFromDoc = "";
    for (i=0; i<nTextLenght; i++){
        n = Number(nText2[i]);   // ตัวเลขที่ต้องการออกเสียง
        nCol = i % 6;            // ค่าของหลัก 0=หน่วย 1=สิบ ...
            
        if(i === nTextLenght-1 && nCol == 0){  // ตัวเลขที่อยู่ซ้ายมือสุดและเป็นหลักหน่วยต้องออกเสียง หนึ่ง เสมอ
            nSound = numberSoundCol1[n];
        }
        else{
            nSound = numberSound[nCol][n];
        }

        if(n === 0){   // เลข 0 ไม่ออกเสียงหลัก
            vSound = "";
        }
        else{
            vSound = valueSound[nCol];
        }             
            
        if(nCol === 0 && i >= 6){  // ถ้ามีตัวเลขตั้งแต่ 6 ตัวต้องออกเสียง ล้าน ที่หลักหน่วย
            vSound = vSound + "ล้าน";
        }

        nSoundFromDoc = nSound + vSound + nSoundFromDoc;
    }
    
    return nSoundFromDoc;
}

function numberFormat(nTextFromDoc) {
    if (nTextFromDoc === "") {
        return "";  // ไม่มีตัวเลข
    }

    let nText = clearZero(nTextFromDoc);  // ตัวเลขที่ต้องการ format
    if(nText.length === 0){  // ถ้าไม่มีข้อมูลเหลือแสดงว่าป้อนค่าเป็น 0 มามากกว่า 1 ตัว
        return "0"
    }

    let nText2 = "";  // for reverse number
    let i = 0;
    let txt = "";  // เก็บผลลัพธ์

    // ทำการ reverse ตัวเลข 1234 --> 4321
    nText2 = reverseNumber(nText);

    for (i = 0; i<nText2.length; i++){   
        txt = nText2[i] + txt;
        if ((i+1) % 3 === 0 && i !== nText2.length-1){  // เติม , คั่นทุก 3 ตัวเลข
            txt = "," + txt;
        }        
    }
    return txt;
}

function numberPad(n){
    /* รับค่า event OnClick จากหน้า webpage 0..9 = Clear */
    let eqFlag = !(document.getElementById("nSound").innerHTML === "");

    if(n === "Clear") {
        document.getElementById("nText").innerHTML = "";
        document.getElementById("nSound").innerHTML = "";
        eqFlag = false;
    }
    
    else if(n === "=" && !eqFlag) {
        if(document.getElementById("nText").innerHTML !== ""){
            document.getElementById("nSound").innerHTML = "อ่านว่า "+
            number2sound(document.getElementById("nText").innerHTML);

            document.getElementById("nText").innerHTML = 
            numberFormat(document.getElementById("nText").innerHTML);

            eqFlag = true;
        }
    }
    
    else if(!eqFlag) {
        document.getElementById("nText").innerHTML += n;
    }
}