# วิธีการใช้งาน CASAN-BE-TEMPLATE
* 1. Install node package โดยใช้คำสั่ง 
```bash
npm i
```
* 2. สร้างไฟล์ .env และกำหนดค่าต่างๆ ตาม environment ของเรา
```bash
MONGODB_URI=mongodb://[user]:[pwd]]@[host]:[[port]]/[dbname]?authSource=admin
JWT_SECRET=[secret key]
```
* 3. ทดสอบ API ว่าสามารถทำงานได้หรือไม่ โดยใช้คำสั่ง 
```bash
npm run start:dev
```

# วิธีการใช้งาน Schemetic CLI สำหรับ NestJS
* 1. ติดตั้ง CASAN Schemetic CLI โดยใช้คำสั่ง 
```bash
npm i --save-dev casan-schematics
```
* 2. Generate NestJS module โดยใช้คำสั่ง 
```bash
schematics casan-schematics:nestjs-mongo-module --name=diagnose
```

