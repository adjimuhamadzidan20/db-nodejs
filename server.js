// set up library nodejs
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

// inisialisi express
const app = express();

// untuk menangkap data metode post
app.use(bodyParser.urlencoded({ extended: true }))

// template html engine ejs
app.set("view engine", "ejs")
app.set("views", "views")

// setup mysql
const db = mysql.createConnection({
	host: "localhost",
	database: "cuy_university",
	user: "root",
	password: "",  
})

// koneksi database
db.connect((error) => {
	if (error) throw error
	console.log('Database Connect Success..')
	
	// menampilkan data
	app.get("/", (req, res) => {
		const sql = "SELECT * FROM tb_mahasiswa";
		db.query(sql, (error, result) => {
			const users = JSON.parse(JSON.stringify(result))
			// console.log('Hasil database', users)
			res.render("index", {users: users, title: "Data Mahasiswa"})
		})	
	})

	// memasukan data
	app.post("/tambah", (req, res) => {
		const sqlInsert = `INSERT INTO tb_mahasiswa (nama_lengkap, kelas, alamat) VALUES ('${req.body.nama}', '${req.body.kelas}', '${req.body.alamat}');`
		db.query(sqlInsert, (error, result) => {
			if (error) throw error
			res.redirect("/")
		})
	})

})

// cek server
app.listen(8000, () => {
	console.log('Server siap..');
})

