var express = require('express');
// var sql = require("mssql");
var sql = require("mssql/msnodesqlv8");
var app = express();
const path = require('path');
app.use('/public', express.static(path.join(__dirname, 'public')));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var sql = require("./libs/sql");
const multer = require('multer');
app.get('/getAllProduct', function (req, res) {
    // connect to your database
    sql.executeSQL("select * from SanPham", (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.get('/TTC', function (req, res) {
    // config for your database
    sql.executeSQL("select * from SanPham where MaLoai = 'TTC'", (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.get('/CPM', function (req, res) {
    // config for your database
    sql.executeSQL("select * from SanPham where MaLoai = 'CPM'", (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/search', function (req, res) {
    // config for your database
    sql.executeSQL(`select * from SanPham, LoaiSanPham where SanPham.MaLoai = LoaiSanPham.MaLoai and SanPham.TenSanPham like '%${req.body.rssearch}%' or SanPham.DonGia like '%${req.body.rssearch}%';`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/searchandsort', function (req, res) {
    // config for your database
    sql.executeSQL(`select * from SanPham, LoaiSanPham where SanPham.MaLoai = LoaiSanPham.MaLoai and SanPham.TenSanPham like '%${req.body.searchandsort}%' or SanPham.DonGia like '%${req.body.searchandsort}%' order by DonGia ${req.body.sortsearch};`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.get('/getProductById/:id', function (req, res) {
    // config for your database
    sql.executeSQL(`select * from sanpham where SanPham.MaSanPham='${req.params["id"]}'`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
// app.post('/sortTTC', function (req, res) {
//     // config for your database
//     sql.executeSQL(`select * from SanPham where MaLoai = 'TTC' order by DonGia ${req.body.sort};`, (recordset) => {
//         res.send(recordset.recordsets[0]);
//     })
// });
// app.post('/sortCPM', function (req, res) {
//     // config for your database
//     sql.executeSQL(`select * from SanPham where MaLoai = 'CPM' order by DonGia ${req.body.sortCPM};`, (recordset) => {
//         res.send(recordset.recordsets[0]);
//     })
// });
app.post('/searchsdt', function (req, res) {
    // config for your database
    sql.executeSQL(`select * from KhachHang Where SoDienThoai = '${req.body.sdtsearch}'`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/InputKH', function (req, res) {
    // config for your database
    sql.executeSQL(`INSERT INTO KhachHang(TenKhachHang,SoDienThoai,MatKhau,DiaChi,Admin) VALUES (N'${req.body.ten}',
    '${req.body.sdt}','${req.body.pass}',N'${req.body.diachi}',1);`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/userLogin', function (req, res) {
    // config for your database
    sql.executeSQL(`select * from KhachHang where SoDienThoai = '${req.body.sdtlg}' and MatKhau ='${req.body.passlg}' `, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/showkh', function (req, res) {
    // config for your database
    sql.executeSQL("select * from KhachHang", (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/showsp', function (req, res) {
    // config for your database
    sql.executeSQL("select * from SanPham", (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/addhd', function (req, res) {
    // config for your database
    sql.executeSQL(`INSERT INTO HoaDon (MaSanPham, SoDienThoaiKH, SoLuong, NgayBan) 
    VALUES ('${req.body.masp}', '${req.body.sdt}', ${req.body.soluong},'${req.body.ngayban}');`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.get('/getShoppingCard/:lstSP', function (req, res) {
    // config for your database
    sql.executeSQL("select * from SanPham where MaSanPham in (" + req.params.lstSP + ")", (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/doithongtin/', function (req, res) {
    // config for your database
    sql.executeSQL(`update KhachHang set TenKhachHang =N'${req.body.ten}', DiaChi = N'${req.body.diachi}',MatKhau ='${req.body.pass}' where SoDienThoai = '${req.body.sdt}'`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});

app.post('/buyProducts', async function (req, res) {
    var sdt = req.body.sdt;
    var lstSP = req.body.lstSP;
    var data1 = await sql.executeSQLP(`insert into HoaDon(SoDienThoaiKH,NgayBan,TongTien) values('${req.body.sdt}',getdate(),${req.body.tongtien})`);
    var data2 = await sql.executeSQLP("select @@IDENTITY as MaHD");
    console.log(data1);

    var maHD = data2.recordsets[0][0].MaHD;
    for (var i = 0; i < lstSP.length; i++) {
        var item = lstSP[i];
        await sql.executeSQLP("insert into ChiTietHoaDon(MaHD,MaSanPham,SoLuong,GiaBan) values('" + maHD + "','" + item.maSP + "','" + item.soluong + "','" + item.gia + "')");
        await sql.executeSQLP("update SanPham set SoLuongCon = SoLuongCon - "+ item.soluong +" where MaSanPham = "+ item.maSP +"");

    }
    res.send("ok");
});
app.get('/showlsp', function (req, res) {
    // config for your database
    sql.executeSQL("select * from LoaiSanPham", (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/addlsp', function (req, res) {
    // config for your database
    sql.executeSQL(`INSERT INTO LoaiSanPham Values('${req.body.maloai}',N'${req.body.tenloai}')`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/searchmaloai', function (req, res) {
    // config for your database
    sql.executeSQL(`select * from LoaiSanPham Where MaLoai = '${req.body.maloai}'`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/updatemaloai', function (req, res) {
    // config for your database
    sql.executeSQL(`update LoaiSanPham set TenLoai = N'${req.body.tenloai}' where MaLoai = '${req.body.maloaiup}'`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/deleteloai', function (req, res) {
    // config for your database
    sql.executeSQL(`DELETE FROM LoaiSanPham WHERE MaLoai = '${req.body.dlmaloaiup}'`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/showtype', function (req, res) {
    // config for your database
    sql.executeSQL("select * from LoaiSanPham", (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/showsp', function (req, res) {
    // config for your database
    sql.executeSQL("select * from SanPham", (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
// Configure Multer to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Public/Image');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// Handle file upload POST requests
app.post('/upload', upload.single('file'), function (req, res) {
    console.log(req.file)
    if (!req.file) {
        res.send('Không có ảnh được chọn.');
    } else {
        res.send('Tải ảnh thành công.');
    }
});
app.post('/addsp', function (req, res) {
    // config for your database
    sql.executeSQL(`INSERT INTO SanPham (MaLoai, TenSanPham, DonGia, SoLuongCon, AnhSP,MoTa,Ishot)
    VALUES ('${req.body.iptype}', N'${req.body.ipten}',${req.body.ipgia}, '${req.body.ipsl}', '${req.body.ipanh}',N'${req.body.ipmota}',${req.body.iphot});`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/deletesp', function (req, res) {
    // config for your database
    sql.executeSQL(`DELETE FROM SanPham WHERE MaSanPham = ${req.body.masp};`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/updatesp', function (req, res) {
    // config for your database
    sql.executeSQL(`update SanPham set MaLoai = '${req.body.uptype}', TenSanPham = N'${req.body.upten}', DonGia = ${req.body.upgia}, SoLuongCon = ${req.body.upsl}, 
    AnhSP = '${req.body.upanh}', MoTa = N'${req.body.upmota}',Ishot = ${req.body.uphot} where MaSanPham = ${req.body.upmasp}`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/searchmaloaisp', function (req, res) {
    // config for your database
    sql.executeSQL(`select * from SanPham where MaLoai = '${req.body.mlsearch}'`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/searchmasp', function (req, res) {
    // config for your database
    sql.executeSQL(`select * from ChiTietHoaDon where MaSanPham = ${req.body.mspsearch}`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/showloaisp', function (req, res) {
    // config for your database
    sql.executeSQL(`select * from LoaiSanPham;`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/showallsp', function (req, res) {
    // config for your database
    sql.executeSQL(`select * from SanPham where MaLoai = '${req.body.maloai}';`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/sortproducts', function (req, res) {
    // config for your database
    sql.executeSQL(`select * from SanPham where MaLoai = '${req.body.maloaisort}' order by DonGia ${req.body.slsortproducts};`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/hotproducts', function (req, res) {
    // config for your database
    sql.executeSQL(`select * from SanPham where MaLoai = '${req.body.maloaihot}' order by IsHot;`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/searchandhot', function (req, res) {
    // config for your database
    sql.executeSQL(`select * from SanPham, LoaiSanPham where SanPham.MaLoai = LoaiSanPham.MaLoai and SanPham.TenSanPham like '%${req.body.searchandhot}%' or SanPham.DonGia like '%${req.body.searchandhot}%' order by IsHot;`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/addkh', function (req, res) {
    // config for your database
    sql.executeSQL(`INSERT INTO KhachHang(TenKhachHang,SoDienThoai,MatKhau,DiaChi,Admin) 
    VALUES (N'${req.body.iptkh}','${req.body.ipsdt}','${req.body.ipmk}',N'${req.body.ipdiachi}',${req.body.ipam});`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/updatekh', function (req, res) {
    // config for your database
    sql.executeSQL(`update KhachHang set TenKhachHang = N'${req.body.uptkh}', DiaChi = N'${req.body.updc}',MatKhau ='${req.body.upmk}', Admin = ${req.body.upam} where SoDienThoai = '${req.body.upsdt}'`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/searchsdthd', function (req, res) {
    // config for your database
    sql.executeSQL(`select * from HoaDon where SoDienThoaiKH = '${req.body.dlsdtsearch}';`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/deletekh', function (req, res) {
    // config for your database
    sql.executeSQL(`DELETE FROM KhachHang WHERE SoDienThoai = '${req.body.dlsdt}';`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/showhd', function (req, res) {
    // config for your database
    sql.executeSQL(`select * from HoaDon;`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/showcthd', function (req, res) {
    // config for your database
    sql.executeSQL(`SELECT c.MaHD, s.TenSanPham, c.SoLuong, c.GiaBan FROM ChiTietHoaDon c 
    JOIN SanPham s ON c.MaSanPham = s.MaSanPham;`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/searchsdthd1', function (req, res) {
    // config for your database
    sql.executeSQL(`SELECT * FROM HoaDon WHERE SoDienThoaiKH LIKE '%${req.body.sdtsearchhd}%';`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/searchnbhd', function (req, res) {
    // config for your database
    sql.executeSQL(`SELECT * FROM HoaDon WHERE CONVERT(varchar, NgayBan, 120) LIKE '%${req.body.nbsearchhd}%';`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/searchmahd', function (req, res) {
    // config for your database
    sql.executeSQL(`SELECT c.MaHD, s.TenSanPham, c.SoLuong, c.GiaBan FROM ChiTietHoaDon c 
    JOIN SanPham s ON c.MaSanPham = s.MaSanPham WHERE MaHD = ${req.body.masearchhd};`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/searchtenso', function (req, res) {
    // config for your database
    sql.executeSQL(`select * from KhachHang where TenKhachHang like N'%${req.body.tensosearchkh}%' or SoDienThoai like'%${req.body.tensosearchkh}%';`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/searchsdtkh', function (req, res) {
    // config for your database
    sql.executeSQL(`select * from KhachHang where SoDienThoai ='${req.body.searchsdtkh}';`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/searchtenloai', function (req, res) {
    // config for your database
    sql.executeSQL(`select * from SanPham where TenSanPham like N'%${req.body.searchtenloai}%' or MaLoai like '%${req.body.searchtenloai}%';`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/searchtenloai', function (req, res) {
    // config for your database
    sql.executeSQL(`select * from SanPham where TenSanPham like N'%${req.body.searchtenloai}%' or MaLoai like '%${req.body.searchtenloai}%';`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/searchca2hd', function (req, res) {
    // config for your database
    sql.executeSQL(`select * from HoaDon where SoDienThoaiKH like '%${req.body.ca2sdt}%' and CONVERT(varchar, NgayBan, 120) LIKE '%${req.body.ca2nb}%'`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/searchforcmt', function (req, res) {
    // config for your database
    sql.executeSQL(`SELECT CT.MaSanPham, HD.SoDienThoaiKH FROM ChiTietHoaDon CT
    JOIN HoaDon HD ON CT.MaHD = HD.MaHD where CT.MaSanPham = ${req.body.mahdcmt} and HD.SoDienThoaiKH = '${req.body.sdtcmt}'`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/showcmt', function (req, res) {
    // config for your database
    sql.executeSQL(`SELECT KH.TenKhachHang, CM.Textcm FROM Comment CM join KhachHang KH on CM.SoDienThoai = KH.SoDienThoai where CM.MaSanPham = ${req.body.showmahdcmt}`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/incmt', function (req, res) {
    // config for your database
    sql.executeSQL(`insert into Comment(MaSanPham,SoDienThoai,Textcm) values(${req.body.cmtmahd},'${req.body.cmtsdt}',N'${req.body.cmtnd}') `, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/amountcmt', function (req, res) {
    // config for your database
    sql.executeSQL(`select * from Comment where MaSanPham = ${req.body.amountma} and SoDienThoai = '${req.body.amountsdt}'`, (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});












app.get('/trangchu', function (req, res) {
    res.sendFile(__dirname + "/TrangHome.html");
});
app.get('/camhung', function (req, res) {
    res.sendFile(__dirname + "/Trangcamhung.html");
});
app.get('/caphe', function (req, res) {
    res.sendFile(__dirname + "/Trangcaphe.html");
});
app.get('/tra', function (req, res) {
    res.sendFile(__dirname + "/Trangtra.html");
});
app.get('/tratraicay', function (req, res) {
    res.sendFile(__dirname + "/Trangtratraicay.html");
});
app.get('/collections/all', function (req, res) {
    res.sendFile(__dirname + "/Trangmenu.html");
});
// app.get('/test', function (req, res) { 
//     res.sendFile(path.resolve('/test.html'))
// })
app.get('/test', function (req, res) {
    res.sendFile(__dirname + "/test.html");
});
// app.get('/collections/all', function (req, res) {
//     res.sendFile(__dirname + "/Trangtestmenu.html");
// });
app.get('/testdetail/:id', function (req, res) {
    res.sendFile(__dirname + "/testdetail.html");
});
app.get('/inputkh', function (req, res) {
    res.sendFile(__dirname + "/testinputkh.html");
});
app.get('/login', function (req, res) {
    res.sendFile(__dirname + "/Tranglogin.html");
});
app.get('/admin', function (req, res) {
    res.sendFile(__dirname + "/Trangadmin.html");
});
app.get('/hoadon', function (req, res) {
    res.sendFile(__dirname + "/inputhoadon.html");
});
app.get('/shoppingcart', function (req, res) {
    res.sendFile(__dirname + "/Trangshoppingcart.html");
});
app.get('/doitt', function (req, res) {
    res.sendFile(__dirname + "/Trangdoithongtin.html");
});
app.get('/testad', function (req, res) {
    res.sendFile(__dirname + "/testadmin.html");
});
app.get('/travel', function (req, res) {
    res.sendFile(__dirname + "/Travel.js");
});
app.listen(3001)    