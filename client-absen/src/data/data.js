const data = {
    "Bekasi-Denpasar": ["Bandung Pusat", "Bandung Barat", "Bandung Timur", "Surabaya", "Semarang", "Yogyakarta",
                        "Denpasar", "Harapan Indah", "Graha Harapan", "Karawang", "Cikarang", "Tambun", "Bekasi", 
                        "Bumi Anggrek", "Sitelusada"],

    "Jakarta-Kalimantan": ["Cibubur", "Cileungsi", "Klender", "Pondok Gede", "Cisalak", "Bogor", "Bogor-Barat",
                           "Studio Alam", "Depok", "Cililitan", "Cibinong", "Cijantung", "Palangkaraya", "Pontianak",
                           "Jampind", "Samarinda", "Balikpapan", "Banjarmasin"],

    "Jakarta-Banten": ["Tiga Raksa", "Rawamangun", "Karawaci", "Ciledug", "Pamulang", "Pasar Minggu", "Serang - Cilegon",
                       "Tanjung Priok", "Tugu", "Tangerang", "Jakarta Pusat", "Kebayoran Lama", "Cengkareng",
                       "Gading Serpong", "Pengumben"],

    "Sumbagsel": ["Bandar Lampung", "Palembang", "Jambi", "Bengkulu", "Km.46 Jambi", "Suban",
                  "Bandar Baru Bandar Jaya", "Sungai Bahar", "Muara Bungo Jambi"],

    "Riau-Sumbar": ["Pekanbaru", "Bukit Raya", "Minas Timur", "Sei Buatan", "Dumai", "Logas Tanah Darat", "Km. 15 Perawang",
                    "Ujung Batu", "Balam", "Pangkalan Kerinci", "Kandis", "Lubuk Dalam", "Sei Medang", "Duri", "Munas",
                    "Bagan Batu", "Rokan Hulu", "Air Molek", "Libo Jaya", "Padang", "Suram", "Tegar"],

    "Kepulauan Riau": ["Batam Center", "Batam Kota", "Batu Aji Batam", "Bida Ayu", "Tanjung Balai Karimun", "Tanjung Pinang",
                       "Teluk Sasah/Bintan", "Tiban-Batam"],

    "Lubuk Pakam": ["Bandar Gugung", "Bangun Mulia", "Bangun Purba", "Bangun Setia", "Durin Tinggung", "Galang", "Gunung Meriah",
                    "Gunung Sinembah", "Jl STM Lubuk Pakam", "Km 95 Gunung Meriah", "Limau Mungkur", "Lubuk Pakam", "Pantai Cermin",
                    "Paya Itik", "Penara", "Perbaungan", "Rumah Lengo", "Rumah Sumbul", "Salam Tani", "Tanjung Morawa Baru", 
                    "Tanjung Morawa Kanan", "Tanjung Morawa Kiri", "Tanjung Raja", "Tiga Juhar", "Ujung Serdang", "Undian", "Tembung"],

    "Medan-Kuta Jurung": ["Talun Kenas", "Medan Putri", "Mandala", "Simemei Batu", "Beranti Siguci", "Pulo Brayan", "Pasar VI Selayang II",
                          "Gunung Rintih", "Kampung Susuk", "GBKP KM.8", "GBKP Pasar 2", "Jalan Pintu Air 4", "Kutajurung", "Bestamat",
                          "Limau Mungkur Sinembah", "Patumbak", "Pasar VII"],

    "Medan-Kp.Lalang": ["Bangun Mulia", "Batang Serangan", "Belawan", "Bena Meriah", "Berdikari", "Budi Luhur", "Cinta Damai", "Darussalam",
                        "DISKI", "Gunung Tinggi", "Helvetia", "Kampung Lalang", "Kesatria", "Kuta Mbelin", "Lau Bekeri", "Marelan", 
                        "Namo Buah Silebo-Lebo", "Pantai Barat", "PORTA", "Rampah Dua", "Rimbun Baru", "Sada Kata", "Sei Beras Sekata", 
                        "Sei Mencirim", "Sei Padang", "Setia Budi", "Sempat Arih", "Sidodadi", "Simpang Glugur", "Sri Gunting", "Suka Maju", 
                        "Sukma Indah", "Sunggal Asam Kumbang", "Tanjung Gusta", "Tanjung Sari", "Tanjung Selamat", "Telaga Dingin", "Bandar Meriah",
                        "Simpang Tanjung Anom", "Bajem Suka Aman", "Perm. Semangat Baru", "Perm. JalanSerasi", "Paya Bakung"],

    "Pembangunan Medan Delitua" : ["JL. Pembangunan USU", "Pasar IV PB. Selayang II", "Medan Timur", "Teladan",
                 "Indra Kasih", "Mabar", "Pasar VI Delitua", "Pasar VII Namo Suro", "Patumbak Kampung",
                 "Talapeta", "Lau Gambir", "Percut", "Namo Serit", "Nogio Delitua", "Griya Martubung", "Kuta Baru"],

    "Medan Delitua" : ["Bahagia", "Bambu Raya", "Betala Bandar Bayu", "Biru Biru", "Bunga Rampe", "Deleng Buntu",
                       "Delitua", "Delitua Timur", "KM 4", "KM 7", "KM 9", "Kuta Tualah", "Lau Rakit", "Marindal Mekatani",
                       "Namo Mbelin", "Pamah Kuala Simei Mei", "Penen", "Peria Ria", "Persadanta", "Pertumbuken", "Perumnas Simalingkar",
                       "Pintu Besi", "Polonia", "PRB", "Sarilaba", "Simalingkar B", "Simpang Marindal", "Simpang Namo Pinang",
                       "Sp Proyek", "Tanjung Berampu", "Timba Lau", "Namo Mbaru Salang Tungir", "Delitua Kuta"],

    "Medan Namorambe": ["Batu Penjemuren", "Bekala", "Gedung Johor", "Griya Rumah Tengah", "Rampah", "Bungalau",
                        "Kayu Embun Simalem", "Kemenangan Tani", "Kuta Lepar", "Kuta Lepar", "Kuta Tengah", "Laucih",
                        "Namo Bintang", "Namo Rambe", "Pokok Mangga", "Rumah Mbacang", "Simalingkar A", "Simpang Selayang", 
                        "Tebing Ganjang", "Nabrita", "Namo Pinang", "Tangkahan", "Lubang Ido", "Bekukul", "Jaba"],
    
    "Pancur Batu": ["Basita", "Bintang Meriah", "Durin Pitu", "Durin Simbelang", "Jl. Namo Salak", "Kampung Merdeka",
                    "Kelahun Pinang", "KSD Tuntungan", "Kwala Lau Bicik", "Lau Gelunggung", "Lau Kelumat", "Namo Riam",
                    "Namokeling", "Namorih", "Namosimpur - Lau Cekala", "Pancurbatu", "Pancurbatu Kota", "Pancurtelu",
                    "Pasar VI", "Pasar IV", "Pasar X", "Salam Tani Kuta Tualah", "Simpang Tuntungan", "Suka Dame", 
                    "Sukarende", "Taruna Rumah Bacang", "Tinala", "Penungkiren"],

    "Binjai Langkat" : ["Pasar Pinter", "Tanah Merah", "Pasar II Namuterasi", "Pangkalan Berandan", "Sawit Seberang", 
                        "Pujidadi", "Simpang Awas", "Teuku Umar", "Tanjung Gunung", "Cingkes", "Serbajadi", "Aman Dame",
                        "Stabat", "Petani Jaya", "Tanjung Pura Gebang", "Tiga Sabah", "Bencirem", "Securai", 
                        "Pasar VII Kuala Mencirim", "Bandar Kasih", "Titi Mangga", "Tangkahan", "Pasar IV Namuterasi",
                        "Pasar VII Namuterasi", "Pangkalan Susu", "Batang Serangen", "Sampan Getek", "Beguldah", 
                        "Kwala Unggas", "Namo Tating"],

    "Kuala Langkat": ["Bahorok", "Gotong Royong", "Kuala", "Namo Ukur", "Padang Cermin", "Tanjung Keriahen", "Telagah", "Marike",
                      "Batu Minjah", "Tanjung Langkat", "Bangun Mulia", "Nangka Lima", "Tanjung Bale Beruam", "Rumah Galuh",
                      "Simpang Kuta Buluh", "Mejuah-juah", "Selayang", "Lau Mulgap", "Kuta Parik", "Simpang Pulo Rambung",
                      "Proyek Simpang Burah", "Batu Mandi", "Buah Raja", "Cangkulen", "Kuala Murak", "Kendit", "Pamah Tambunen",
                      "Namo Cengkeh", "Parid Bindu", "Pamah Semelir", "Sampe Cita Garunggang", "Gunung Ambat Lau Gunung", "Buah Apam",
                      "Durin Melo Besadi", "Tanjung Nguda", "Geratt Nambetong", "Sogong Bungara"],

    "Sibolangit": ["Bandar Baru", "Basukum", "Batu Layang", "Batu Sanggehen", "Betimus", "Bingkawan", "Bukum", "Buluhawar",
                   "Kuala", "Perteguhen", "Rakuti", "Ritana", "Rumah Pilpil", "Sayum", "Sembahe", "Sibolangit", "Sikeben - Martelu",
                   "Sukamakmur", "Tambunen"],
                   
    "Barus Sibayak" : ["Bukit", "Tanjung Barus", "Sampun", "Barus Jahe", "Ujung Bandar/Rumah Rih", "Paribun", "Ujung Sampun",
                       "Sukajulu", "Dolat Rayat", "Kubu Colia", "Basam", "Tigajumpa", "Kabung", "Juma Padang/Tangkidik",
                       "Serdang", "Penampen", "Melas", "Sugihen", "Doulu Pasar", "Doulu Kota", "Tongkoh", "Bertah Kuta Julu",
                       "Semangat Gunung", "Siberteng", "Gurisen"],

    "Berastagi": ["Ajibuhara", "Ajijahe", "Ajijulu", "Ajimbelang", "Berastagi Kota", "Bulan Barus", "Cintarayat", "Desa Merdeka",
                  "Gajah", "Guru Singa", "Jaranguda", "Jl. Udara Berastagi", "Korpri", "Peceren", "Raya", "Rumah Berastagi",
                  "Sada Perarih", "Simpang Ujung Aji", "Ujung Teran Deram"],

    "Kabanjahe": ["Tiga Baru", "Komplek Stadion", "Kabanjahe Kota", "Rumah Kabanjahe", "Nang Belawan", "Lingga", "Lingga Julu",
                  "Ndokum Siroga", "Surbakti", "Beganding", "Tiga Pancur", "Jeraya", "Perteguhen", "Sukandebi", "Sukatepu", 
                  "Naman", "Ndeskati", "Kutambelin", "Sukanalu", "Singgarang-garang", "Kuta Rayat", "Kebayaken", "Kuta Tonggal", "Kaban"],

    "Kabanjahe T.Panah": ["Manuk Mulia", "Talimbaru", "Simpang Enam", "Bulanjahe", "Sukanalu", "Jalan Katepul", "Salit", "Bawang",
                          "Tigapanah", "Regaji", "Pertumbuken", "Mulawari", "Rumamis", "Seberaya Baru", "Tambak Bawang", "Lau Riman",
                          "Bunuraya", "Seberaya", "Dokan", "Sinaman", "Suka Sipeduaken", "Lambar", "Kuta Kepar", "Panribuan",
                          "Asrama Kodim", "Seribunjadi", "Cingkes", "Ujung Bawang", "Bulanjulu", "Suka", "Semangat", "Tanjung Purba",
                          "Sukadame", "Muliarayat"],

    "K.Jahe Sukarame" : ["Sirumbia", "Barung Kersap", "Singa", "Kandibata", "Sukarame", "Jalan Kotacane", "Berhala", "Gurubenua",
                         "Kutambelin", "Bandar Meriah", "Kineppen", "Samura", "Ketaren", "Sumbul", "Kacinambun", "Kubu", "Kacaribu",
                         "Negeri Kutasuah", "Kutagerat", "Lausimomo", "Bekerah Simacem/Siosar"],

    "P.Siantar": ["Sei Sigiling", "Tebing Tinggi", "Sei Rampah", "Dolok Masihol", "Indrapura", "Kisaran", "Aek Kanopan", "Cikampak",
                  "Rantau Prapat", "Tanjungbalai", "Tarutung", "Padang Sidempuan", "Balige", "G. Sitoli", "Sibolga", "Jl. Nias",
                  "Batu Lima", "Jl. S.M. Raja", "R. Merah", "Perdagangan", "Serbelawan"],

    "Tiga Binanga": ["Baluran Tupang Telu", "Batu Mamak Nageri", "Bungabaru - Benjire", "Gunung", "1 Juhar", "2 Juhar", "Kendit Kenderan",
                     "Kidupen", "Kuala/Kutabuara", "Kuta Bangun", "Kuta Galoh Kutaraya", "Gugung", "Mbelin", "Kuta Gerat", "Kem-kem",
                     "Lau Kapor", "Liang Melas Datas", "Limang", "Mbetong", "Nageri Jahe - Gunung Meriah", "Perbesi", "Pergendangen",
                     "Pertumbuken", "Keriahen", "Sukma", "Tigabinanga"],

    "Munte": ["Biak Nampe", "Kuta Mbaru", "Kaban Tua", "Pasar Baru Munte", "Pernantin", "Sarimunte", "Sarinembah", "Selakkar",
              "Semangat Maju", "Singgamanik", "Sugihen", "Sukababo", "Tanjung Beringin", "Buah Manteman Munte", "Petumbungen - Parimbalang",
              "Buluh Naman"],

    "Sinabun": ["Batukarang", "Berastepu", "Bintang Meriah", "Gurukinayan", "Gurukinayan SS", "Jandimeriah", "Jinabun", "Kutabuluh Gungung",
                "Kutabuluh", "Kutagaluh", "Kutambaru", "Kuta Male", "Lau Buluh", "Mardinding", "Nari Gunung II", "Pancur Siwah",
                "Payung", "Penampen", "Perbaji", "Rimo Kayu", "Selandi", "Siabang-Abang", "Suka Meriah", "Sukatendel", "Susuk",
                "Tanjong", "Tanjung Merawa", "Tapak Kuda", "Tiganderket", "Tiga Serangkai", "Ujung Deleng", "Tanjung Merahe", "Kuta Tengah"],

    "Dairi": ["Baturedan", "Bertugenjulu", "Bukit Karo", "Gunung Sayang", "Gunung Stember", "Kede Berek", "Kutambaru", "Lau Gunung",
              "Lau Perimbon", "Lau Sungsang", "Lau Tawar", "Lau Meciho", "Lau Petundal", "Pamah Simalem", "Rantebesi", "Sarintonu",
              "Sidikalang", "Tanah Pinem", "Tenggiring", "Tiga Lingga", "Ujung Teran"],

    "Lau Baleng": ["Arih Ersada", "Butar", "Imanuel", "Kinangkong", "Kuta Gamber Liren", "Kuta Buluh Berteng", "Kotacane", "Laudeski",
                   "Lau Garut Sp3", "Lau Njuhar1", "Lau Pakam", "Lau Pradep Parimbalang", "Lau Peranggunen", "Lau Renun", "Lau Baleng",
                   "Limas", "Mangan Molih", "Mardingding", "Marlias", "Mbal Mbal Nodi", "Pasir Tengah", "Payambelang", "Perbulan", 
                   "Lau Mulgap", "Rambah Tambah", "Bukit Makmur"],

    "bidang" : ["Umum", "Pembinaan", "Konsolidasi", "Partisipasi", "Keuangan"],
    "utusan" : ["Utusan Runggun", "Utusan Klasis"]
                
}

export default data;