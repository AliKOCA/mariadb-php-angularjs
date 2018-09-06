/*-------------Kullanıcıyı Oluştur -----------------*/
use mysql;

CREATE USER 'u_fihrist' IDENTIFIED BY 'u_fihrist';

grant all on *.* to u_fihrist@'%';
flush privileges;
-- u_fihrist kullanıcısıyla login olduktan sonra...
/*-------------Veritabanı Oluştur -----------------*/
Create Database db_fihrist
  Default Character SET utf8
  Default Collate   utf8_general_ci;

Use db_fihrist;

/*-------------Tabloları Oluşturma -----------------*/
Create Table Gruplar(
 OKytNo 		Int(11) Not Null Auto_Increment,
 		Constraint PK___Gruplar___OKytNo	Primary Key(OKytNo), 
 GrupIsmi		VarChar(100) Not Null,
 		Constraint UK___Gruplar___GrupIsmi	Unique (GrupIsmi)
); 		
Insert Into Gruplar(GrupIsmi) Values
	('Tercih Edilmemiş'),
	('Akraba'),
	('İş');
	
Select * From Gruplar order By Okytno DESC;

Create Table Fihrist (
 OKytNo 		Int(11) Not Null Auto_Increment,
 		Constraint PK___Fihrist___OKytNo	Primary Key(OKytNo),  
 Isim 			VarChar(100) Not Null,
 Soyisim 		VarChar(100) Not Null,
 Izahat 		VarChar(150) Not Null,
 		Constraint UK___Fihrist___Isim__Soyisim__Izahat	Unique (Isim, Soyisim, Izahat),
 RbtGruplar		Int(11) Not Null,
         Constraint FK___Fihrist___RbtGruplar Foreign Key (RbtGruplar) 
  			References Gruplar (OKytNo),
 Faal 			BOOLEAN		 Not Null Default 0
);

Create Table Null_Tecrube (
 OKytNo 		Int(11) Not Null Auto_Increment,
 		Constraint PK___Fihrist___OKytNo	Primary Key(OKytNo),  
 Isim 			VarChar(100) Null,
 Soyisim 		VarChar(100) Null,
 Izahat 		VarChar(150) Null,
 		Constraint UK___Fihrist___Isim__Soyisim__Izahat	Unique (Isim, Soyisim, Izahat)
);

Insert Into Null_Tecrube(Isim, Soyisim, Izahat) Values
	(NULL, NULL, NULL);

--Select * from Null_Tecrube Where LENGTH(Isim) < 1 or Isim is NULL;


--Delete From Fihrist;

Insert Into Fihrist(Isim, Soyisim, Izahat, RbtGruplar, Faal) Values
	('Bekir', 'SIDDIK', '', 2, true),
	('Ömer', 'ADİL', '', 2, true),
    ('Osman', 'NUR', '', 1, true),
    ('Ali', 'ALİM', '', 1, true),	
	('Adnan', 'KAHVECİ', '', 2, true),
	('Hasan Celal', 'GÜZEL', '', 2, true)	
;	

--Select * from Fihrist Where LENGTH(Isim) < 1;


Create Table TelefonGruplari(
 OKytNo 		Int(11) Not Null Auto_Increment,
 		Constraint PK___TelefonGruplari___OKytNo	Primary Key(OKytNo), 
 GrupIsmi		VarChar(100) Not Null,
 		Constraint UK___TelefonGruplari___GrupIsmi	Unique (GrupIsmi)
); 		

Insert Into TelefonGruplari(GrupIsmi) Values
	('Cep'),
	('Ev'),
	('İş'),
	('Memleket')
	;

Create Table Telefonlar(
 OKytNo 		Int(11) Not Null Auto_Increment,
 		Constraint PK___Telefonlar___OKytNo	Primary Key(OKytNo), 
 RbtFihrist		Int(11) Not Null,
         Constraint FK___Telefonlar___RbtFihrist Foreign Key (RbtFihrist) 
  			References Fihrist (OKytNo),
 RbtTelefonGruplari		Int(11) Not Null,
         Constraint FK___Telefonlar___RbtTelefonGruplari Foreign Key (RbtTelefonGruplari) 
  			References TelefonGruplari (OKytNo),
 TelefonNo		VarChar(20) Not Null, 
 		Constraint UK___Telefonlar___RbtFihrist__TelefonNo	Unique (RbtFihrist, TelefonNo)
); 	
	

Insert Into Telefonlar(RbtFihrist, RbtTelefonGruplari, TelefonNo) Values
	(1, 1, '0.507 360 60 00'),
	(1, 2, '0.312 360 60 00'),
	(2, 1, '0.508 360 88 00'),
	(2, 3, '0.212 360 88 00')
	;

--Select * from 	Telefonlar Where RbtFihrist = 1;
	