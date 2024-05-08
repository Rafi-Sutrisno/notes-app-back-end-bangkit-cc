// Cross-Origin Resource Sharing (CORS).<br>
// nodemon (tidak perlu ulang npm run start)<br>
// ESLint (mengevaluasi tulisan)<br>
// nanoid (random unique string for id)<br>

Kriteria :

Kriteria 1: Web Server Dapat Menyimpan Catatan
- method POST
- handle request

Kriteria 2: Web Server Dapat Menampilkan Catatan
- method GET

Kriteria 3: Web Server Dapat Mengubah Catatan
- method PUT

Kriteria 4: Web Server Dapat Menghapus Catatan
- method DELETE


Deploy Google Cloud Compute Engine
- buat Firewall rule dan VM Instances 
-  SSH ke instances
- install git dengan command :
```shell
sudo apt-get install git 
```
- clone repository ini
- masuk ke direktori project
- pasang Node.js dengan command :
```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```
```shell
nvm install <versi nodejs>
```
- masuk ke direktori project dan jalankan 
```shell
npm run start
```
- pada script server.js ubah line 7 (host) menjadi :
```js
host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
```
- pada package.json tambahkan kode tersebut pada "scripts"
```json
"start-prod": "NODE_ENV=production node ./src/server.js",
```
- server berhasil dijalankan
- cara menggunakan server ini adalah dengan masuk ke http://notesapp-v1.dicodingacademy.com/
- lalu tekan Change URl dan masukkan URL web server terbaru
- agar server bisa berjalan secara terus menerus gunakan Process Manager
```
npm install -g pm2
```
```
pm2 start npm --name "notes-api" -- run "start-prod"
```
<br><br/>
Process Manager :
- restart :
```
pm2 restart notes-api
```
- delete :
```
pm2 stop notes-api
```
- run again :
```
pm2 start notes-api
```