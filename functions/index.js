const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase)
exports.defaultName = functions.firestore
.document("users/{userId")
.onWrite((change) => {
    if(!change.after.exists){
        return null
    }
    const {email, displayName, initialized} = change.after.data();
    if(email && !initialized){
        return change.after.ref.update({
            email: email,
            displayName: !displayName ? "Anonymous" : displayName,
            initialized: true,
        })
    }

    return null;

})
/* 
ไม่มีเอกสารอยู่เป็น true
มีเอกสารเป็น false

- ข้อมูลเอกสารหลังเขียนลงไปในคอลเล็กชัน จะเก็บอยู่ที่ change.after.data() หากต้องการดูค่าในฟิลด์ใดก็ให้ประกาศตัวแปรมาเก็บค่าในแต่ละฟิลด์ ในตัวอย่างคือฟิลด์ email, displayName, initialized 

- ตรวจสอบว่ามีการกำหนด email และไม่พบการกำหนดค่าในฟิลด์ initialized (แสดงว่าเป็นการกรอกเอกสารในครั้งแรก)
- รีเทิร์นเป็น null เมื่อไม่ตรงกับเงื่อนไขใดๆ นั่นหมายความว่าใช้ค่าเดิมไม่ต้องแก้ไข

*/