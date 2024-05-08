// Cross-Origin Resource Sharing (CORS).
// nodemon (tidak perlu ulang npm run start)
// ESLint (mengevaluasi tulisan)
// nanoid (random unique string for id)

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