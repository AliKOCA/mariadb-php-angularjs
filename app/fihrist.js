uyg.controller("fihristController", function ($scope, $http) {
    $scope.FihristKayitlar = [];
    $scope.FihristAraVerisi = [];
    $scope.Gruplar = [];
    $scope.RbtGruplar = 1;

    $scope.TelefonKayitlari = [];

    function GruplarOKytNoDanIsimBul(pDizi, pAranacak) {
        netice = '';
        for (var i = 0; i < pDizi.length; i++) {
            if (pDizi[i].OKytNo === pAranacak) {
                return pDizi[i];
            }
        }
        return netice;
    }

    $scope.GruplarOKytNoDanIsim = function (pOKytNo) {
        var satir = GruplarOKytNoDanIsimBul($scope.Gruplar, pOKytNo);
        var netice = '';
        if (satir.GrupIsmi != undefined) {
            netice = satir.GrupIsmi;
        }
        return netice;// $scope.Gruplar.find($scope.Gruplar.OKytNo === pOKytNo);
    }

    // function to get records from the database
    $scope.boolDenSifirBir = function (pBool) {
        if (pBool) {
            return '1';
        } else {
            return '0';
        }
    }

    $scope.sifirBirDenBool = function (pSifirBir) {
        if (pSifirBir = '1') {
            return true;
        } else {
            return false;
        }
    }

    $scope.gruplariGetir = function () {
        $http({
            method: 'post',
            url: 'api/kayit-isl.php',
            data: {
                'IslemNevi': 'KayitListesi',
                'Tablo': 'Gruplar'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }).then(function (response) {
            if (response.data.Durum == 'Tamam') {
                $scope.Gruplar = response.data['Kayitlar'];
            }
        }, function (error) {
            $scope.messageError(error.status + ' ' + error.statusText);
            console.log(error, ' Hata oluştu.');
        });
    };

    $scope.fihristKayitlariniGetir = function () {
        $scope.gruplariGetir();
        $http({
            method: 'post',
            url: 'api/kayit-isl.php',
            data: {
                'IslemNevi': 'KayitListesi',
                'Tablo': 'Fihrist'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }).then(function (response) {
            if (response.data.Durum == 'Tamam') {
                $scope.FihristKayitlar = response.data['Kayitlar'];
            }
        }, function (error) {
            $scope.messageError(error.status + ' ' + error.statusText);
            console.log(error, ' Hata oluştu.');
        });
    };

    $scope.fihristAraVerisiSifirla = function () {
        $scope.FihristAraVerisi = { 'Faal': true, 'RbtGruplar': 1 };
        //alert($scope.FihristAraVerisi.RbtGruplar);
        // $scope.FihristAraVerisi.Faal = true;
        // $scope.FihristAraVerisi.RbtGruplar = 1;
    }

    $scope.vazgec = function () {
        $scope.fihristAraVerisiSifirla();
        $('.formData').slideToggle();
    }

    $scope.yeniKayitIcinHazirla = function () {
        $scope.fihristAraVerisiSifirla();
        //$('.formData').slideUp();
        $('.formData').slideDown();
    }

    // 
    $scope.fihristiKaydet = function (pIslemNevi) {
        var AraVeri = $scope.FihristAraVerisi;
        AraVeri['Faal'] = $scope.boolDenSifirBir($scope.FihristAraVerisi.Faal);
        //console.log(AraVeri);
        $http({
            method: "post",
            url: "api/kayit-isl.php",
            data: {
                IslemNevi: pIslemNevi,
                Tablo: 'Fihrist',
                EklenecekFihrist: AraVeri
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }).then(
            function (response) {
                if (response.data.Durum == 'Tamam') {
                    if (pIslemNevi == 'Duzelt') {
                        $scope.FihristKayitlar[$scope.index].OKytNo = response.data.Kayitlar.OKytNo;
                        $scope.FihristKayitlar[$scope.index].Isim = response.data.Kayitlar.Isim;
                        $scope.FihristKayitlar[$scope.index].Soyisim = response.data.Kayitlar.Soyisim;
                        $scope.FihristKayitlar[$scope.index].Izahat = response.data.Kayitlar.Izahat;
                        $scope.FihristKayitlar[$scope.index].RbtGruplar = response.data.Kayitlar.RbtGruplar;
                        $scope.FihristKayitlar[$scope.index].Faal = response.data.Kayitlar.Faal;
                        //alert('Düzelttim');
                    } else {
                        $scope.FihristKayitlar.push({
                            OKytNo: response.data.Kayitlar.OKytNo,
                            Isim: response.data.Kayitlar.Isim,
                            Soyisim: response.data.Kayitlar.Soyisim,
                            Izahat: response.data.Kayitlar.Izahat,
                            RbtGruplar: response.data.Kayitlar.RbtGruplar,
                            Faal: response.data.Kayitlar.Faal
                        });
                    }
                    $scope.fihristForm.$setPristine();
                    $scope.FihristAraVerisi = { Faal: true, RbtGruplar: 1 };
                    $('.formData').slideUp();
                    $scope.messageSuccess(response.data.Mesaj);
                } else {
                    $scope.messageError(response.data.Mesaj);
                }
            },
            function (error) {
                $scope.messageError(error.status + ' ' + error.statusText);
                console.log(error, ' Hata oluştu.');
            });
    }
    // function to add fihrist data
    $scope.fihristEkle = function () {
        $scope.fihristiKaydet('Ekle');
    };

    // function to update fihrist data
    $scope.fihristGuncelle = function () {
        $scope.fihristiKaydet('Duzelt');
    };


    // function to edit fihrist data
    $scope.fihristiDuzenlemeyeHazirla = function (pFihrist) {
        $scope.FihristAraVerisi = {
            OKytNo: pFihrist.OKytNo,
            Isim: pFihrist.Isim,
            Soyisim: pFihrist.Soyisim,
            Izahat: pFihrist.Izahat,
            RbtGruplar: pFihrist.RbtGruplar
        };
        //$scope.FihristAraVerisi.RbtGruplar = pFihrist.RbtGruplar;
        if (pFihrist.Faal == 1) {
            $scope.FihristAraVerisi['Faal'] = true;
        } else {
            $scope.FihristAraVerisi['Faal'] = false;
        }
        //alert($scope.FihristAraVerisi['RbtGruplar']);
        $scope.index = $scope.FihristKayitlar.indexOf(pFihrist);
        $('.formData').slideDown();
    };

    //---Telefonlar ------------------------------
    $scope.fihristDetayGoster = function (pRbtFihrist, pPanelSinifi) {
        $('.' + pPanelSinifi).slideToggle();
        $scope.telefonKayitlariniGetir(pRbtFihrist);
    }

    $scope.telefonKayitlariniGetir = function (pOKytNo) {
        $http({
            method: 'post',
            url: 'api/kayit-isl.php',
            data: {
                'IslemNevi': 'KayitListesi',
                'Tablo': 'Telefonlar',
                'RbtFihrist': pOKytNo
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }).then(function (response) {
            if (response.data.Durum == 'Tamam') {
                $scope.TelefonKayitlari = response.data['Kayitlar'];
            }
        }, function (error) {
            $scope.messageError(error.status + ' ' + error.statusText);
            console.log(error, ' Hata oluştu.');
        });
    };




    $scope.sualEt = function (pSual, pCalisacakFonksiyon, pKayit) {
        var netice = false;
        bootbox.confirm({
            message: "<h4>" + pSual + "</h4>",
            buttons: {
                confirm: {
                    label: '<span class="glyphicon glyphicon-ok"></span> Evet',
                    className: 'btn-danger'
                },
                cancel: {
                    label: '<span class="glyphicon glyphicon-remove"></span> Hayır',
                    className: 'btn-primary'
                }
            },
            callback: function (result) {
                if (result === true) {
                    pCalisacakFonksiyon(pKayit);
                }
            }
        });
        return netice;
    }

    $scope.fihristiSilmeyeHazirla = function (pFihrist) {
        $scope.index = $scope.FihristKayitlar.indexOf(pFihrist);
        $scope.sualEt('Bu kaydı silmek istediğinizden emin misiniz?', $scope.fihristiSil, pFihrist);
    }

    $scope.fihristiSil = function (pFihrist) {
        $http({
            method: "post",
            url: "api/kayit-isl.php",
            data: {
                IslemNevi: 'Sil',
                Tablo: 'Fihrist',
                'OKytNo': pFihrist.OKytNo,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }).then(
            function (response) {
                if (response.data.Durum == 'Tamam') {
                    $scope.fihristForm.$setPristine();
                    $('.formData').slideUp();
                    $scope.messageSuccess(response.data.Mesaj);
                    if (response.data.Durum == 'Tamam') {
                        $scope.FihristKayitlar.splice($scope.index, 1);
                    }
                } else {
                    $scope.messageError(response.data.Mesaj);
                }
            },
            function (error) {
                $scope.messageError(error.status + ' ' + error.statusText);
                console.log(error, ' Hata oluştu.');
            });
    }

    // function to display success message
    $scope.messageSuccess = function (Mesaj) {
        $('.alert-success > p').html(Mesaj);
        $('.alert-success').show();
        $('.alert-success').delay(5000).slideUp(function () {
            $('.alert-success > p').html('');
        });
    };

    // function to display error message
    $scope.messageError = function (Mesaj) {
        $('.alert-danger > p').html(Mesaj);
        $('.alert-danger').show();
        $('.alert-danger').delay(5000).slideUp(function () {
            $('.alert-danger > p').html('');
        });
    };
});